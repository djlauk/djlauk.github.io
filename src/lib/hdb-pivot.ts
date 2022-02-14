export type HdbSpec = {
	hdbClass: string
	hdbAttributes: string[]
	joinOn?: string // not set for the base class
}

export type ColumnSpec = {
	hdbSpec: HdbSpec
	attribute: string
	columnNumber: number
	columnName: string
	reference: string
}

function makeColumnSpec(hdbSpec: HdbSpec, attribute: string, columnNumber: number): ColumnSpec {
	if (hdbSpec.hdbAttributes.indexOf(attribute) < 0) throw new Error(`attribute not in HDB spec`)
	return {
		hdbSpec,
		attribute,
		columnNumber,
		columnName: 'v' + columnNumber,
		reference: hdbSpec.hdbClass + '.' + attribute,
	}
}

export function generatePivotTableSql(hdbSpecs: HdbSpec[], useSubqueries: boolean) {
	let nextColumn = 1
	const columns: ColumnSpec[] = []
	const columnByReference: Record<string, ColumnSpec> = {}
	const joiningColumnsByClass: Record<string, ColumnSpec> = {}

	function makeJoinClause(colSpec: ColumnSpec) {
		// base class has no join
		if (colSpec.hdbSpec.joinOn === undefined) {
			return '[tblObject].[id] = [' + colSpec.columnName + '].[object_id]'
		}
		const cols = colSpec.hdbSpec.joinOn.split('=').map((val) => {
			const result = columnByReference[val.trim().toLowerCase()]
			if (result === undefined)
				throw new Error(`Unknown column reference in class "${colSpec.hdbSpec.hdbClass}": ${val}`)
			return result
		})

		// the joining column needs to join on the values
		if (
			cols[0].reference.toLowerCase() === colSpec.reference.toLowerCase() ||
			cols[1].reference.toLowerCase() === colSpec.reference.toLowerCase()
		) {
			joiningColumnsByClass[colSpec.hdbSpec.hdbClass] = colSpec
			return '[' + cols[1].columnName + '].[value] = [' + cols[0].columnName + '].[value]'
		}
		// column of the base of the join
		const joinCol = joiningColumnsByClass[colSpec.hdbSpec.hdbClass]
		if (joinCol === undefined)
			throw new Error(
				`Unknown column reference in class "${colSpec.hdbSpec.hdbClass}": ${colSpec.reference} (joining attribute for class "${colSpec.hdbSpec.hdbClass}" must be first attribute in list)`
			)
		return '[' + joinCol.columnName + '].[object_id] = [' + colSpec.columnName + '].[object_id]'
	}

	for (const hdbSpec of hdbSpecs) {
		for (const attr of hdbSpec.hdbAttributes) {
			const cs = makeColumnSpec(hdbSpec, attr, nextColumn++)
			columns.push(cs)
			columnByReference[cs.reference.toLowerCase()] = cs
		}
	}

	let result = 'SELECT\n  [tblObject].[id],\n  [tblObject].[CName],\n  '
	result += columns
		.map((col) => `[${col.columnName}].[value] AS [${col.hdbSpec.hdbClass}_${col.attribute}]`)
		.join(',\n  ')

	result += '\nFROM [tblObject]\n  '

	result +=
		'-- PLEASE CHECK the HDB attributes!!!\n  -- tblObjectData could also be: tblObjectReference, tblObjectMulti or tblObjectText\n  '

	result += columns
		.map((currentValue) => {
			const joinOn = makeJoinClause(currentValue)
			return `LEFT JOIN [tblObjectData] [${currentValue.columnName}] ON ${joinOn} AND [${currentValue.columnName}].[attribute_id] = dbo.fn_GetHDBAttributeId('${currentValue.hdbSpec.hdbClass}', '${currentValue.attribute}')`
		})
		.join('\n  ')

	result += `\nWHERE\n  [tblObject].[class_id] = dbo.fn_GetClassId('${hdbSpecs[0].hdbClass}')`

	if (useSubqueries) {
		result = 'SELECT * FROM (\n  ' + result.split('\n').join('\n  ') + '\n) s1'
	}

	return result
}

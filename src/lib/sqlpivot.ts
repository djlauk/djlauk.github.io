export type PivotTableSpec = {
	table: string
	columns: string[]
	joinOn: { column: string; refTable: string; refColumn: string }
}

export type SqlDialect = 'mysql' | 'oracle' | 'tsql'

const _quoteFn: Record<string, (x: string) => string> = {
	mysql: (x: string) => '`' + x + '`',
	oracle: (x: string) => '"' + x + '"',
	tsql: (x: string) => '[' + x + ']',
}

export function generatePivotTableSql(specs: PivotTableSpec[], sqlDialect: SqlDialect) {
	const q = _quoteFn[sqlDialect]
	// quoted qualified name
	const qqn = (table: string, column: string) => q(table) + '.' + q(column)
	const selectCols = specs
		.filter((s) => s.columns.length > 0)
		.flatMap((s) => s.columns.map((c) => `${qqn(s.table, c)} AS ${q(`${s.table}_${c}`)}`))
	const joins = specs
		.slice(1)
		.map(
			(s) =>
				`JOIN ${q(s.table)} ON ${qqn(s.table, s.joinOn.column)} = ${qqn(
					s.joinOn.refTable,
					s.joinOn.refColumn
				)}`
		)
	const sql = `
SELECT
  ${selectCols.join(',\n  ')}
FROM
  ${q(specs[0].table)}
  ${joins.join('\n  ')}
`
	return sql
}

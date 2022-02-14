export function formatVbCode(sourceCode: string, indentSeq = '  ') {
	const lines = sourceCode.split(/\n/)
	// VB is line oriented
	// The good thing is: keywords will be at the start of the line (not considering continuation lines)
	//
	// Some keywords will increase the indent, because they begin a block.
	// Some keywords will decrease the indent, because they end a block.
	// NB: ``Else`` is a special little beast, because it does both: It ends
	// the If block and starts the Else block. So we have it in both RegExps ;-)
	const RE_INCREASE = /^\s*(?:If|Else|Private|Protected|Public|Sub|Function|For|While|Do)\b/i
	const RE_DECREASE = /^\s*(?:Else|End|Next|Loop|Wend)\b/i

	let indentLevel = 0
	let result = ''
	for (let i = 0; i < lines.length; ++i) {
		const line = lines[i].trimStart()
		if (RE_DECREASE.test(line)) {
			indentLevel = indentLevel > 0 ? indentLevel - 1 : 0
		}
		result += indentSeq.repeat(indentLevel) + line + '\n'
		if (RE_INCREASE.test(line)) {
			indentLevel++
		}
	}
	return result
}

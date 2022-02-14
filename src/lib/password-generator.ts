const CHAR_UC = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const CHAR_LC = 'abcdefghijklmnopqrstuvwxyz'
const CHAR_NUM = '0123456789'

export function generatePassword(options: {
	length: number
	specialCharacters?: string
	useUpper?: boolean
	useLower?: boolean
	useNumbers?: boolean
	useSpecial?: boolean
	preventRepeatingCharacers?: boolean
}) {
	const {
		length,
		specialCharacters,
		useUpper,
		useLower,
		useNumbers,
		useSpecial,
		preventRepeatingCharacers,
	} = options
	if (length === 0) return ''

	let allowedCharacters = ''
	if (useUpper) {
		allowedCharacters += CHAR_UC
	}
	if (useLower) {
		allowedCharacters += CHAR_LC
	}
	if (useNumbers) {
		allowedCharacters += CHAR_NUM
	}
	if (useSpecial && specialCharacters) {
		allowedCharacters += specialCharacters
	}

	if (allowedCharacters.length === 0) {
		throw new Error('You must allow at least some characters')
	}
	if (allowedCharacters.length === 1) {
		throw new Error('You must allow more than 1 character')
	}
	if (allowedCharacters.length < 3 && !preventRepeatingCharacers) {
		throw new Error('You must allow more than 3 characters when preventing repeating characters')
	}

	const max = allowedCharacters.length
	function nextChar() {
		const i = Math.floor(Math.random() * max)
		return allowedCharacters.charAt(i)
	}

	const pw = Array(length)
	let lastChar = ''
	for (let i = 0; i < length; ++i) {
		let c: string
		do {
			c = nextChar()
		} while (c == lastChar)
		pw[i] = lastChar = c
	}

	return pw.join('')
}

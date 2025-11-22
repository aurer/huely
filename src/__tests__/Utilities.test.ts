import * as util from '../lib/Utilities'

it('returns name with empty suffix', () => {
	const name = util.nameWithSuffix('primary', '')
	expect(name).toBe('color-primary')
})

it('returns name with no suffix arg', () => {
	const name = util.nameWithSuffix('primary')
	expect(name).toBe('color-primary')
})

it('returns name with null suffix arg', () => {
	const name = util.nameWithSuffix('primary', null)
	expect(name).toBe('color-primary')
})

it('returns valid name with suffix', () => {
	const name = util.nameWithSuffix('primary', 'light')
	expect(name).toBe('color-primary-light')
})

it('generates 36 character ID', () => {
	const name = util.uuid()
	expect(name.length).toBe(36)
})

it('can clean hex codes', () => {
	expect(util.cleanHex('a')).toBe('AAAAAA')
	expect(util.cleanHex('ab')).toBe('ABABAB')
	expect(util.cleanHex('abc')).toBe('AABBCC')
	expect(util.cleanHex('abcd')).toBe('ABCDDD')
	expect(util.cleanHex('abcde')).toBe('ABCDEE')
	expect(util.cleanHex('abcdef')).toBe('ABCDEF')
	expect(util.cleanHex('abcdeff')).toBe('ABCDEF')
	expect(util.cleanHex('123456')).toBe('123456')
	expect(util.cleanHex('789abc')).toBe('789ABC')
	expect(util.cleanHex('1GGG')).toBe('111111')
	expect(util.cleanHex('1\\GGG')).toBe('111111')
	expect(util.cleanHex('!@£$%^')).toBe('000000')
})

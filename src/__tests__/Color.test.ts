import Color from '~/lib/color'

const tests = [
	{ hexIn: '#aaa', hexOut: 'AAAAAA', rgb: [170, 170, 170], hsl: [0, 0, 67] },
	{ hexIn: '#000', hexOut: '000000', rgb: [0, 0, 0], hsl: [0, 0, 0] },
	{ hexIn: '#f6f6f6', hexOut: 'F6F6F6', rgb: [246, 246, 246], hsl: [0, 0, 96] },
	{ hexIn: '#f00', hexOut: 'FF0000', rgb: [255, 0, 0], hsl: [0, 100, 50] },
	{ hexIn: '#81BFE8', hexOut: '81BFE8', rgb: [129, 191, 232], hsl: [204, 69, 71] },
	{ hexIn: '#1a4c5a', hexOut: '1A4C5A', rgb: [26, 76, 90], hsl: [193, 55, 23] },
	{ hexIn: '#186276', hexOut: '186276', rgb: [24, 98, 118], hsl: [193, 66, 28] },
]

it('can convert HEX to HEX', () => {
	tests.forEach((c) => {
		expect(Color.fromHex(c.hexIn).toHex()).toBe(c.hexOut)
	})
})

it('can convert RGB to HEX', () => {
	tests.forEach((c) => {
		const [r, g, b] = c.rgb
		expect(Color.fromRGB(r, g, b).toHex()).toBe(c.hexOut)
	})
})

it('can convert HEX to an RGB array', () => {
	tests.forEach((c) => {
		expect(Color.fromHex(c.hexIn).toRGB()).toEqual(c.rgb)
	})
})

it('can convert HEX to an RGB string', () => {
	tests.forEach((c) => {
		expect(Color.fromHex(c.hexIn).toRGBString()).toEqual(c.rgb.join(', '))
	})
})

it('can convert HEX to an HSL array', () => {
	tests.forEach((c) => {
		expect(Color.fromHex(c.hexIn).toHSL()).toEqual(c.hsl)
	})
})

it('can convert HEX to an HSL string', () => {
	tests.forEach((c) => {
		expect(Color.fromHex(c.hexIn).toHSLString()).toEqual(
			`${c.hsl[0]}, ${c.hsl[1]}%, ${c.hsl[2]}%`
		)
	})
})

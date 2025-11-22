import { colorsBetween, gradientFrom, lighten, darken } from '../lib/colorBlend'

it('can blend two colors with one step as hex', () => {
	const colors = colorsBetween('#0380D2', '#FFFFFF', 1).asHex()
	expect(colors).toEqual(['0380D2', '81BFE8', 'FFFFFF'])
})

it('can blend two colors with three steps as hex', () => {
	const colors = colorsBetween('#0380D2', '#FFFFFF', 3).asHex()
	expect(colors).toEqual(['0380D2', '429FDD', '81BFE8', 'C0DFF3', 'FFFFFF'])
})

it('can blend two colors with six steps as hex', () => {
	const colors = colorsBetween('#07e3f2', '#155994', 6).asHex()
	expect(colors).toEqual([
		'07E3F2',
		'09CFE4',
		'0BBBD7',
		'0DA7C9',
		'0F94BC',
		'1180AE',
		'136CA1',
		'155994',
	])
})

it('can blend one color with three steps as hex', () => {
	const colors = colorsBetween('#FFF', '#FFF', 3).asHex()
	expect(colors).toEqual(['FFFFFF', 'FFFFFF', 'FFFFFF', 'FFFFFF', 'FFFFFF'])
})

it('can blend black to white as hex', () => {
	const colors = colorsBetween('#000', '#FFF', 1).asHex()
	expect(colors).toEqual(['000000', '7F7F7F', 'FFFFFF'])
})

it('can blend two colors with one step as RGB', () => {
	const colors = colorsBetween('#0380D2', '#FFFFFF', 1).asRGB()
	expect(colors).toEqual([
		[3, 128, 210],
		[129, 191, 232],
		[255, 255, 255],
	])
})

it('can blend black to white as RGB', () => {
	const colors = colorsBetween('#000', '#FFF', 1).asRGB()
	expect(colors).toEqual([
		[0, 0, 0],
		[127, 127, 127],
		[255, 255, 255],
	])
})

it('can blend two colors with one step as HSL', () => {
	const colors = colorsBetween('#0380D2', '#FFFFFF', 1).asHSL()
	expect(colors).toEqual([
		[204, 97, 42],
		[204, 69, 71],
		[0, 0, 100],
	])
})

it('can blend black to white as HSL', () => {
	const colors = colorsBetween('#000', '#FFF', 1).asHSL()
	expect(colors).toEqual([
		[0, 0, 0],
		[0, 0, 50],
		[0, 0, 100],
	])
})

it('can generate lights and darks from a base color with 1 steps', () => {
	const colors = gradientFrom('#0380D2', 1).asHex()
	expect(colors).toEqual(['81BFE8', '0380D2', '014069'])
})

it('can generate lights and darks from a base color with 2 steps', () => {
	const colors = gradientFrom('#0380D2', 2).asHex()
	expect(colors).toEqual(['ABD4F0', '57AAE1', '0380D2', '02558C', '012A46'])
})

it('can generate lights and darks from a base color with 4 steps', () => {
	const colors = gradientFrom('#0380D2', 4).asHex()
	expect(colors).toEqual([
		'CCE5F6',
		'9ACCED',
		'67B2E4',
		'3599DB',
		'0380D2',
		'0266A8',
		'014C7E',
		'013354',
		'00192A',
	])
})

it('can generate lights and darks from a base color with 6 steps', () => {
	const colors = gradientFrom('#0380D2', 6).asHex()
	expect(colors).toEqual([
		'DBECF8',
		'B7DAF2',
		'93C8EB',
		'6FB6E5',
		'4BA4DE',
		'2792D8',
		'0380D2',
		'026DB4',
		'025B96',
		'014978',
		'01365A',
		'00243C',
		'00121E',
	])
})

it('can generate lights and darks from a base color with 4 steps, returning 5', () => {
	expect(gradientFrom('#0380D2', 4, 5).asHex()).toEqual([
		// 'CCE5F6',
		// '9ACCED',
		'67B2E4',
		'3599DB',
		'0380D2',
		'0266A8',
		'014C7E',
		// '013354',
		// '00192A',
	])
})

it('can generate lights and darks from a base color with 4 steps, limited to 4', () => {
	// must always return an odd number i.e. the original color with equal steps either side
	// so a limit of 4 actually returns 5
	expect(gradientFrom('#0380D2', 4, 4).asHex()).toEqual([
		// 'CCE5F6',
		// '9ACCED',
		'67B2E4',
		'3599DB',
		'0380D2',
		'0266A8',
		'014C7E',
		// '013354',
		// '00192A',
	])
})

it('can generate lights and darks from a base color with 4 steps, returning 3', () => {
	expect(gradientFrom('#0380D2', 4, 3).asHex()).toEqual([
		// 'CCE5F6',
		// '9ACCED',
		// '67B2E4',
		'3599DB',
		'0380D2',
		'0266A8',
		// '014C7E',
		// '013354',
		// '00192A',
	])
})

it('generateGradient has a minimum limit of 3', () => {
	expect(gradientFrom('#0380D2', 4, -3).asHex()).toEqual([
		// 'CCE5F6',
		// '9ACCED',
		// '67B2E4',
		'3599DB',
		'0380D2',
		'0266A8',
		// '014C7E',
		// '013354',
		// '00192A',
	])
})

it('generateGradient limit cant be greater than the total', () => {
	expect(gradientFrom('#0380D2', 2, 7).asHex()).toEqual([
		'ABD4F0',
		'57AAE1',
		'0380D2',
		'02558C',
		'012A46',
	])
})

it('can lighten a color with 1 step', () => {
	const color = lighten('57ABE1', 1).toHex()
	expect(color).toBe('ABD5F0')
})

it('can lighten a color with 2 steps', () => {
	const color = lighten('0380D2', 2).toHex()
	expect(color).toBe('57AAE1')
})

it('can lighten a color with 4 steps', () => {
	const color = lighten('0380D2', 4).toHex()
	expect(color).toBe('3599DB')
})

it('can lighten a color with 7 steps', () => {
	const color = lighten('0380D2', 7).toHex()
	expect(color).toBe('228FD7')
})

it('can darken a color with 1 step', () => {
	const color = darken('02558C', 1).toHex()
	expect(color).toBe('012A46')
})

it('can darken a color with 2 steps', () => {
	const color = darken('0380D2', 2).toHex()
	expect(color).toBe('02558C')
})

it('can darken a color with 4 steps', () => {
	const color = darken('0380D2', 4).toHex()
	expect(color).toBe('0266A8')
})

it('can darken a color with 7 steps', () => {
	const color = darken('0380D2', 7).toHex()
	expect(color).toBe('0270B7')
})

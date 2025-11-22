import NumberFill from './NumberFill'
import color from './color'

export interface ColorBlendInterface {
	asHex(): Array<string>
	asRGB(): Array<number[]>
	asHSL(): Array<number[]>
}

export const colorsBetween = (
	fromColor: string,
	toColor: string,
	steps: number
): ColorBlendInterface => {
	const colors = rawColorsBetween(fromColor, toColor, steps)

	return {
		asHex: () => colors.map((c) => c.toHex()),
		asRGB: () => colors.map((c) => c.toRGB()),
		asHSL: () => colors.map((c) => c.toHSL()),
	}
}

export const gradientFrom = (
	baseColor: string,
	steps: number,
	limit?: number
): ColorBlendInterface => {
	const lights = rawColorsBetween(baseColor, 'fff', steps).reverse().slice(1, -1)
	const darks = rawColorsBetween(baseColor, '000', steps).slice(0, -1)
	let colors = lights.concat(darks)

	if (limit) {
		limit = Math.max(limit, 3)
		limit = Math.min(colors.length, limit)
		const trimLength = Math.floor((colors.length - limit) / 2)
		colors = colors.slice(trimLength, colors.length - trimLength)
	}

	return {
		asHex: () => colors.map((c) => c.toHex()),
		asRGB: () => colors.map((c) => c.toRGB()),
		asHSL: () => colors.map((c) => c.toHSL()),
	}
}

export const lighten = (baseColor: string, steps: number): color => {
	const colors = rawColorsBetween(baseColor, 'fff', steps)
	return colors[1]
}

export const darken = (baseColor: string, steps: number): color => {
	const colors = rawColorsBetween(baseColor, '000', steps)
	return colors[1]
}

export const rawColorsBetween = (fromColor: string, toColor: string, steps: number): color[] => {
	const fromRGB: number[] = color.fromHex(fromColor).toRGB()
	const toRGB: number[] = color.fromHex(toColor).toRGB()

	const reds: number[] = NumberFill.numbersBetweenInclusive(fromRGB[0], toRGB[0], steps).map((c) =>
		Math.floor(c)
	)

	const greens: number[] = NumberFill.numbersBetweenInclusive(fromRGB[1], toRGB[1], steps).map((c) =>
		Math.floor(c)
	)

	const blues: number[] = NumberFill.numbersBetweenInclusive(fromRGB[2], toRGB[2], steps).map((c) =>
		Math.floor(c)
	)

	const colors: Array<color> = []
	for (let i = 0; i < steps + 2; i++) {
		const colorInstance: color = color.fromRGB(reds[i], greens[i], blues[i])
		colors.push(colorInstance)
	}

	return colors
}

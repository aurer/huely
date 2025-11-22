import { cleanHex } from './Utilities'

export default class color {
	red: number
	green: number
	blue: number

	static fromHex(hex: string): color {
		const rgb: Array<number> = this._hexToRgb(hex)
		return new color(rgb[0], rgb[1], rgb[2])
	}

	static fromRGB(r: number, g: number, b: number): color {
		return new color(r, g, b)
	}

	constructor(r: number, g: number, b: number) {
		this.red = r
		this.green = g
		this.blue = b
		return this
	}

	toHex(): string {
		return color._rgbToHex(this.red, this.green, this.blue)
	}

	toRGB(): Array<number> {
		return [this.red, this.green, this.blue]
	}

	toRGBString(): string {
		const [r, g, b] = [this.red, this.green, this.blue]
		return `${r}, ${g}, ${b}`
	}

	toHSL(): Array<number> {
		return color._rgbToHSL(this.red, this.green, this.blue)
	}

	toHSLString(): string {
		const [h, s, l] = color._rgbToHSL(this.red, this.green, this.blue)
		return `${h}, ${s}%, ${l}%`
	}

	static _calculateSaturation(luminance: number, min: number, max: number): number {
		let saturation: number = 0

		if (max === min) {
			return saturation
		}

		if (luminance < 0.5) {
			saturation = (max - min) / (max + min)
		} else {
			saturation = (max - min) / (2.0 - max - min)
		}

		return Math.round(saturation * 100)
	}

	static _calculateHue(r: number, g: number, b: number): number {
		const min: number = Math.min(r, g, b)
		const max: number = Math.max(r, g, b)

		if (min === max) {
			return 0
		}

		let hue: number = 0
		if (r === max) {
			hue = (g - b) / (max - min)
		} else if (g === max) {
			hue = 2.0 + (b - r) / (max - min)
		} else if (b === max) {
			hue = 4.0 + (r - g) / (max - min)
		}

		hue *= 60
		if (hue < 0) {
			hue += 360
		}

		return Math.round(hue)
	}

	static _hexToRgb(hex: string): number[] {
		hex = cleanHex(hex.replace('#', ''))
		const r = parseInt(hex.substring(0, 2), 16)
		const g = parseInt(hex.substring(2, 4), 16)
		const b = parseInt(hex.substring(4, 6), 16)
		return [r, g, b]
	}

	static _rgbToHex(r: number, g: number, b: number): string {
		const red = r.toString(16).toUpperCase()
		const green = g.toString(16).toUpperCase()
		const blue = b.toString(16).toUpperCase()
		return red.padStart(2, '0') + green.padStart(2, '0') + blue.padStart(2, '0')
	}

	static _rgbToHSL(r: number, g: number, b: number): Array<number> {
		r /= 255
		g /= 255
		b /= 255
		const min: number = Math.min(r, g, b)
		const max: number = Math.max(r, g, b)
		const luminance: number = (max + min) / 2
		const saturation: number = color._calculateSaturation(luminance, min, max)
		const hue: number = color._calculateHue(r, g, b)
		return [hue, saturation, Math.round(luminance * 100)]
	}
}

export interface ColorDefinition {
	suffix: string
	value: string
	auto: boolean
}
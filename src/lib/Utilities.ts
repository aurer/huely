export const uuid = function (): string {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		const r = (Math.random() * 16) | 0,
			v = c === 'x' ? r : (r & 0x3) | 0x8
		return v.toString(16)
	})
}

export const nameWithSuffix = function (name: string, suffix?: string | null): string {
	let result = `color-${name}`
	if (suffix && suffix.length > 0) {
		result += `-${suffix}`
	}
	return result
}

export const cleanHex = function (hex: string): string {
	hex = hex.replace(/[^0-9a-fA-F]/g, '')

	switch (hex.length) {
		case 0:
			hex = '000000'
			break
		case 1:
			hex = hex.repeat(6)
			break
		case 2:
			hex = hex.repeat(3)
			break
		case 3:
			hex = [...hex].map((h) => h.repeat(2)).join('')
			break
		case 4:
			hex = hex + hex.substring(3).repeat(2)
			break
		case 5:
			hex = hex + hex.substring(4)
			break
		default:
			hex = hex.substring(0, 6)
			break
	}

	return hex.toUpperCase()
}

export const sanitiseHexColor = (color: string) => {
	return color.replace('#', '').slice(0, 6)
}
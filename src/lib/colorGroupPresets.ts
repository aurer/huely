export const presetGroupNames = [
	'neutral',
	'primary',
	'secondary',
	'tertiary',
	'quaternary',
	'quinary',
]

export const getGroupName = (count: number): string => {
	return presetGroupNames[count] || `Group ${count}`
}
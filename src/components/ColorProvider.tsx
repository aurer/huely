import { type PropsWithChildren, useState } from 'react'
import colorSet from '../lib/colorSet'
import { getGroupName } from '../lib/colorGroupPresets'
import { ColorContext, type ColorContextInterface } from './ColorContext'

export function ColorProvider({ children }: PropsWithChildren) {
	const [groups, setGroups] = useState<colorSet[]>([
		new colorSet(getGroupName(0), '344449'),
		new colorSet(getGroupName(1), '0380D2'),
		new colorSet(getGroupName(2), 'F44C04'),
	])

	const addGroup = () => {
		let groupName = getGroupName(groups.length)
		const existingNames = groups.filter((group) => group.name === groupName)
		if (existingNames.length) {
			groupName = getGroupName(groups.length + 1)
		}

		const newGroups: colorSet[] = groups
		const newGroup = new colorSet(groupName)
		newGroups.push(newGroup)

		setGroups([...newGroups])
	}

	const removeGroup = (id: string) => {
		setGroups(groups.filter((group) => group.id !== id))
	}

	const removeLast = () => {
		const newGroups = [...groups]
		newGroups.pop()
		setGroups(newGroups)
	}

	const renameGroup = (groupId: string, newName: string) => {
		const newGroups = groups.map((group) => {
			if (group.id === groupId) {
				group.name = newName.trim().toLowerCase().replace(' ', '-').replace(/\W/, '')
			}
			return group
		})
		setGroups(newGroups)
	}

	const updateColor = (groupId: string, colorSuffix: string, newValue: string) => {
		const newGroups = [...groups]

		newGroups.forEach((group) => {
			if (group.id === groupId) {
				group.updateColor(colorSuffix, newValue, false)
				group.updateColors()
			}
		})

		setGroups(newGroups)
	}

	const updateMode = (groupId: string, colorSuffix: string, checked: boolean) => {
		const newGroups = [...groups]

		newGroups.forEach((group) => {
			if (group.id === groupId) {
				group.colors.forEach((color) => {
					if (color.suffix === colorSuffix) {
						color.auto = checked
					}
				})
				group.updateColors()
			}
		})

		setGroups(newGroups)
	}

	const updateRange = (groupId: string, contrastValue: number) => {
		const newGroups = groups.map((group) => {
			if (group.id === groupId) {
				group.contrastValue = contrastValue
				group.updateColors()
			}
			return group
		})

		setGroups(newGroups)
	}

	const providerValue: ColorContextInterface = {
		groups,
		addGroup,
		removeGroup,
		removeLast,
		renameGroup,
		updateColor,
		updateMode,
		updateRange,
	}

	return <ColorContext.Provider value={providerValue}>{children}</ColorContext.Provider>
}

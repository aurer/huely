import { createContext, useContext } from 'react'
import colorSet from '../lib/colorSet'

export interface ColorContextInterface {
	groups: colorSet[]
	addGroup(): void
	removeGroup(id: string): void
	removeLast(): void
	renameGroup(name: string, newName: string): void
	updateColor(groupId: string, colorSuffix: string, newValue: string): void
	updateMode(groupId: string, colorSuffix: string, checked: boolean): void
	updateRange(groupId: string, contrastValue: number): void
}

export const ColorContext = createContext<ColorContextInterface>({} as ColorContextInterface)

export function useColorContext() {
	return useContext(ColorContext)
}
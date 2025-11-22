import React, { useState } from 'react'
import Color from './Color'
import Editable from './Editable'
import { Remove } from './Icons'
import { type ColorContextInterface } from './ColorContext'
import type { ColorDefinition } from '~/lib/color'
import '~/css/ColorGroup.css'


export interface ColorGroupProps {
	name: string
	id: string
	colors: Array<ColorDefinition>
	context: ColorContextInterface
}

const ColorGroup = ({ name, id, colors, context }: ColorGroupProps) => {
	const [rangeColors, setRangeColors] = useState({ dark: '#222', light: '#666' })

	const handleRename = (newValue: string) => context.renameGroup(id, newValue)

	function handleColorChange(name: string, newColor: string) {
		context.updateColor(id, name, newColor)
	}

	function handleColorChangeMode(name: string, checked: boolean) {
		context.updateMode(id, name, checked)
	}

	function handleUpdateRange(e: React.ChangeEvent<HTMLInputElement>) {
		context.updateRange(id, parseInt(e.target.value))
		updateRangeColors(e.target.value)
	}

	function updateRangeColors(rangeValue: string) {
		const colorsOne = ['111', '121212', '202020', '222', '262626', '282828', '333']
		const colorsTwo = ['bbb', '999', '888', '777', '666', '555', '444']
		const index = parseInt(rangeValue)
		setRangeColors({
			dark: `#${colorsOne[index]}`,
			light: `#${colorsTwo[index]}`,
		})
	}

	type CSSCustomProperties = {
		'--colorOne': string
		'--colorTwo': string
		backgroundColor: string
	}

	const rangeStyle: CSSCustomProperties = {
		backgroundColor: rangeColors.dark,
		'--colorOne': rangeColors.dark,
		'--colorTwo': rangeColors.light,
	}

	return (
		<div className="ColorGroup">
			<h2 className="ColorGroup-title">
				<Editable onChange={handleRename} initialValue={name} />
			</h2>
			<div className="ColorGroup-colors">
				{colors.map((color: ColorDefinition, i: number) => (
					<Color
						key={color.suffix + i}
						group={name}
						color={color}
						pos={i}
						onChange={handleColorChange}
						onChangeMode={handleColorChangeMode}
					>
						{i === 2 && (
							<div className="Color-range">
								<input
									style={rangeStyle}
									type="range"
									min="0"
									max="6"
									defaultValue="3"
									title="Contrast adjustment"
									onChange={handleUpdateRange}
								/>
							</div>
						)}
					</Color>
				))}
			</div>
			<button
				className="ColorGroup-remove"
				title="Remove Hue"
				onClick={() => context.removeGroup(id)}
			>
				<Remove />
			</button>
		</div>
	)
}

export default ColorGroup

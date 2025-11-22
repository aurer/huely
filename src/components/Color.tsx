import { type ChangeEvent, type CSSProperties, type ClipboardEvent, useMemo, type PropsWithChildren } from 'react'
import { nameWithSuffix, cleanHex, sanitiseHexColor } from '~/lib/Utilities'
import { type ColorDefinition } from '~/lib/color'
import { Undo } from './Icons'
import '~/css/Color.css'

export interface ColorProps extends PropsWithChildren {
	color: ColorDefinition
	group: string
	pos: number
	onChange(name: string, newColor: string): void
	onChangeMode(name: string, checked: boolean): void
}

const Color = ({ color, group, pos, onChange, onChangeMode, children }: ColorProps) => {
	const handleColorInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = sanitiseHexColor(e.target.value)
		onChange(color.suffix, value)
	}

	const handleColorInputPaste = (e: ClipboardEvent) => {
		const data = e.clipboardData.getData('text')
		if (data.length) {
			e.stopPropagation()
			e.preventDefault()
			const value = cleanHex(data)
			onChange(color.suffix, value)
		}
	}

	const handleUnlock = (): void => {
		onChangeMode(color.suffix, !color.auto)
	}

	const name: string = nameWithSuffix(group, color.suffix)
	const hexColor: string = '#' + cleanHex(sanitiseHexColor(color.value))
	const style: CSSProperties = { backgroundColor: hexColor }
	const auto: boolean = color.auto
	const master: boolean = pos === 2
	const className = useMemo(() => {
		const classes = ['Color']
		if (pos === 2) {
			classes.push('Color--master')
		}

		if (color.auto) {
			classes.push('Color--auto')
		}

		return classes.join(' ');
	}, [pos, color.auto]);

	return (
		<div className={className}>
			<div className="Color-swatch">
				<input type="color" name={name} id={name} value={hexColor} onChange={handleColorInputChange} />
				<label htmlFor={name} style={style}>
					<span>{name}</span>
				</label>
			</div>
			<div className="Color-settings">
				<div className="Color-format">#</div>
				<input
					aria-label='Color value'
					type="text"
					value={color.value}
					onChange={handleColorInputChange}
					onPaste={handleColorInputPaste}
				/>
				{!master && !auto && (
					<button className="Color-reset" title="Reset color" onClick={handleUnlock}>
						<Undo />
					</button>
				)}
				{children}
			</div>
		</div>
	)
}

export default Color
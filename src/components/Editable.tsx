import { useState, useRef, type RefObject } from 'react'
import { Edit } from './Icons'
import { type KeyboardEvent } from 'react'
import '~/css/Editable.css'

export interface EditableProps {
	initialValue: string
	onChange(newValue: string): void
}

const Editable = ({ initialValue, onChange }: EditableProps) => {
	const [previousValue, setPreviousValue] = useState(initialValue)
	const editableInput: RefObject<HTMLElement | null> = useRef(null)

	const enableEditing = () => {
		const input = editableInput.current
		if (input) {
			input.setAttribute('contenteditable', '')
			input.focus()
			setPreviousValue(input.innerText)
			setContent(input.innerText)

			// Select the element
			const selection = window.getSelection()
			selection?.removeAllRanges()
			const range = document.createRange()
			range.selectNodeContents(input)
			selection?.addRange(range)
		}
	}

	const disableEditing = () => {
		const input = editableInput.current
		if (input) {
			input.removeAttribute('contenteditable')
		}
	}

	const setContent = (value: string) => {
		if (editableInput.current) {
			editableInput.current.innerText = value
		}
	}

	const handleBlur = () => {
		disableEditing()
	}

	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			disableEditing()
			setContent(previousValue)
		}

		if (e.key === 'Enter') {
			if (editableInput.current) {
				setPreviousValue(editableInput.current.innerText)
				setContent(editableInput.current.innerText)
				onChange(editableInput.current.innerText)
				disableEditing()
			}
		}
	}

	return (
		<div className="Editable">
			<span
				ref={editableInput}
				className="Editable-content"
				onBlur={handleBlur}
				onDoubleClick={enableEditing}
				onKeyDown={handleKeyDown}
			>
				{initialValue}
			</span>
			<button className="Editable-button" onClick={enableEditing} title={`Edit this color`}>
				<Edit />
			</button>
		</div>
	)
}

export default Editable

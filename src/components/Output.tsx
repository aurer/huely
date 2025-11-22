import React, { useState } from 'react'
import { ColorContext, type ColorContextInterface } from './ColorContext'
import colorSet from '~/lib/colorSet'
import { type ColorDefinition } from '~/lib/color'
import { nameWithSuffix } from '~/lib/Utilities'
import '~/css/Output.css'

const OutputTypes = {
	SASS: 'SASS',
	LESS: 'LESS',
	CSS: 'CSS',
	JSON: 'JSON',
}

type OutputType = typeof OutputTypes[keyof typeof OutputTypes]

function Output() {
	const [outputType, setOutputType] = useState<OutputType>(OutputTypes.SASS)

	const renderJson = (groups: colorSet[]) => {
		const colorGroups = groups.map((group) => {
			return {
				name: group.name,
				contrastValue: group.contrastValue,
				colors: group.colors,
			}
		})

		return <pre>{JSON.stringify(colorGroups, null, '  ')}</pre>
	}

	const renderVars = (group: colorSet, outputType: OutputType) => {
		let name = `// ${group.name} colors`

		if (outputType === OutputTypes.CSS) {
			name = `/* ${group.name} colors */`
		}

		return (
			<React.Fragment key={group.id}>
				<pre>
					<span className="comment">{name}</span>
					{group.colors.map((color) => renderVar(group.name, color, outputType))}
					<span className="spacer"></span>
				</pre>
				<br />
			</React.Fragment>
		)
	}

	const renderVar = (groupName: string, color: ColorDefinition, outputType: OutputType) => {
		let string
		const name = nameWithSuffix(groupName, color.suffix)

		switch (outputType) {
			case OutputTypes.SASS:
				string = '$' + name + ': #' + color.value + ';'
				break

			case OutputTypes.LESS:
				string = '@' + name + ': #' + color.value + ';'
				break

			case OutputTypes.CSS:
			default:
				string = '--' + name + ': #' + color.value + ';'
				break
		}

		return <div key={name}>{string}</div>
	}

	return (
		<ColorContext.Consumer>
			{(context: ColorContextInterface) => (
				<div className="Output">
					<div className="Output-options">
						{Object.values(OutputTypes).map((lang: OutputType) => (
							<button
								key={lang}
								className={lang === outputType ? 'is-active' : ''}
								onClick={setOutputType.bind(null, lang)}
							>
								{lang}
							</button>
						))}
					</div>
					<div className="Output-code">
						{outputType !== OutputTypes.JSON &&
							context.groups.map((group) => renderVars(group, outputType))}
						{outputType === OutputTypes.JSON && renderJson(context.groups)}
					</div>
				</div>
			)}
		</ColorContext.Consumer>
	)
}

export default Output

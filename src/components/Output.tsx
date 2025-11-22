import React, { useState } from 'react'
import '~/css/Output.css'
import { type ColorDefinition } from '~/lib/color'
import colorSet from '~/lib/colorSet'
import { nameWithSuffix } from '~/lib/Utilities'
import { useColorContext } from './ColorContext'

const OutputTypes = {
	CSS: 'CSS',
	SASS: 'SASS',
	JSON: 'JSON',
}

type OutputType = (typeof OutputTypes)[keyof typeof OutputTypes]

function Output() {
	const [outputType, setOutputType] = useState<OutputType>(OutputTypes.CSS)
	const { groups } = useColorContext()

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
		const name = nameWithSuffix(groupName, color.suffix)
		const prefix = outputType === OutputTypes.SASS ? '$' : '--'

		return (
			<div key={name}>
				<span className="prefix">
					{prefix}
					{name}:
				</span>{' '}
				<span className="value">#{color.value};</span>
			</div>
		)
	}

	return (
		<div className="Output">
			<h2 className="Output-title">Export</h2>
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
				{outputType !== OutputTypes.JSON && groups.map((group) => renderVars(group, outputType))}
				{outputType === OutputTypes.JSON && renderJson(groups)}
			</div>
		</div>
	)
}

export default Output

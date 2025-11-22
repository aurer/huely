import React from 'react'
import { ColorContext, type ColorContextInterface } from './ColorContext'
import colorSet from '../lib/colorSet'
import ColorGroup from './ColorGroup'
import { Add } from './Icons'

const ColorGroups = () => {
	return (
		<ColorContext.Consumer>
			{(context: ColorContextInterface) => (
				<React.Fragment>
					{context.groups.map((group: colorSet) => (
						<ColorGroup
							name={group.name}
							id={group.id}
							key={group.id}
							colors={group.colors}
							context={context}
						/>
					))}
					<div className="ColorGroup-footer">
						<button className="ColorGroup-add" title="Add hue" onClick={context.addGroup}>
							<Add />
						</button>
					</div>
				</React.Fragment>
			)}
		</ColorContext.Consumer>
	)
}

export default ColorGroups

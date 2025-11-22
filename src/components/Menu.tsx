import { ColorContext } from './ColorContext'
import Output from './Output'
import '~/css/Menu.css'

const Menu = () => {
	return (
		<ColorContext.Consumer>
			{() => (
				<div className="Menu Menu--level1">
					<div className="Menu-item Menu-item--export">
						<div className="Menu-title">
							<b>Export</b>
						</div>
						<Output />
					</div>
				</div>
			)}
		</ColorContext.Consumer>
	)
}

export default Menu

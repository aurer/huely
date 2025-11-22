import { ErrorBoundary } from '@sentry/react'
import ColorGroups from './ColorGroups'
import { ColorProvider } from './ColorContext'
import Menu from './Menu'
import '../styles/App.scss'

const App = () => {
	return (
		<ErrorBoundary>
			<ColorProvider>
				<div className="App">
					<div className="App-main">
						<ColorGroups />
					</div>
					<div className="App-menu">
						<Menu />
					</div>
				</div>
			</ColorProvider>
		</ErrorBoundary>
	)
}

export default App

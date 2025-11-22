import { ErrorBoundary } from '@sentry/react'
import ColorGroups from './components/ColorGroups'
import { ColorProvider } from './components/ColorProvider'
import Menu from './components/Menu'
import '~/css/App.css'

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

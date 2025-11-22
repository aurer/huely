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
					<main className="App-main">
						<div>
							<ColorGroups />
						</div>
						<aside className="App-menu">
							<Menu />
						</aside>
					</main>
					<footer className="App-footer">
						<p>© Phil Maurer 2025</p>
						<a href="https://github.com/aurer/huely" title="View on GitHub" target="_blank" rel="noreferrer">
							<img src="/github-mark-white.svg" alt="Github Logo" width={22} height={22} />
						</a>
					</footer>
				</div>
			</ColorProvider>
		</ErrorBoundary>
	)
}

export default App

import React from 'react'
import { GlobalStyle } from './style'
import { renderRoutes } from 'react-router-config'
import { IconStyle } from './assets/iconfont/iconfont'
import routes from './routes'
import { HashRouter } from 'react-router-dom'

function App() {
	return (
		<HashRouter>
			<GlobalStyle></GlobalStyle>
			<IconStyle></IconStyle>
			{renderRoutes(routes)}
		</HashRouter>
	)
}

export default App

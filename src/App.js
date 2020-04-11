import React from 'react'
import { GlobalStyle } from './style'
import { renderRoutes } from 'react-router-config'
import { IconStyle } from './assets/iconfont/iconfont'
import routes from './routes'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import { Data } from './application/Singers/data'

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <GlobalStyle />
        <IconStyle />
        <Data>{renderRoutes(routes)}</Data>
      </HashRouter>
    </Provider>
  )
}

export default App

import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { useREM } from './utils/flexible'
import './assets/css/index.less'
import './libs/icons/index'
import Rootstore from './store'
import App from './App'

useREM()
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  // <React.StrictMode>
  <Provider store={Rootstore.store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
  //</React.StrictMode>
)

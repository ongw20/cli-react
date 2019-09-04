import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './assets/styles/global.scss'

ReactDOM.render(
  <App />,
  document.getElementById('app')
)

// accept hmr
if (module.hot) {
  module.hot.accept()
}

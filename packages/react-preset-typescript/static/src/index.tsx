import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './assets/styles/global.scss'

ReactDOM.render(
  <App />,
  document.getElementById('app')
)

if ((module as any).hot) {
  (module as any).hot.accept()
}

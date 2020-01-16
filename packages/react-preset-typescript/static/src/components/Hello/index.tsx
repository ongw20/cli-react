import React from 'react'
import { echo } from '../../utils'
import './index.less'

export default class Hello extends React.PureComponent {
  render(): React.ReactElement {
    return <h1 className="hello">{echo('Hello')}</h1>
  }
}

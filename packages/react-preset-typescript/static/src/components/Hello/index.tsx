import React from 'react'
import styles from './index.scss'
import { echo } from '../../utils'

export default class Hello extends React.PureComponent {
  render() {
    return <h1 className={styles.hello}>{echo('Hello')}</h1>
  }
}

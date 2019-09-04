import React from 'react'
import styles from './index.scss'

export default class Hello extends React.PureComponent {
  render() {
    return <h1 className={styles.hello}>Hello</h1>
  }
}

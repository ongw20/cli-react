import React from 'react'
import { echo } from '@/utils'
import './index.less'

const Hello = () => <h1 className="hello">{echo('Hello')}</h1>

export default Hello

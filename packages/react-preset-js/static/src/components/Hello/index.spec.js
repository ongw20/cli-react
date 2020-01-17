import React from 'react'
import { shallow } from 'enzyme'
import Hello from './index'

describe('Hello', () => {
  it('should render hello', () => {
    const wrapper = shallow(<Hello />)
    expect(wrapper.contains('Hello')).toBe(true)
  })
})

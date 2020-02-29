import React from 'react'
import { shallow } from 'enzyme'
import toJSON from 'enzyme-to-json'
import Hello from '.'

describe('Hello', () => {
  const wrapper = shallow(<Hello />)

  it('should render hello', () => {
    expect(wrapper.contains('Hello')).toBe(true)
  })

  it('should match snapshot', () => {
    expect(toJSON(wrapper)).toMatchSnapshot()
  })
})

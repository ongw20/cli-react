import React from 'react'
import { shallow } from 'enzyme'
import toJSON from 'enzyme-to-json'
import Hello from '.'

describe('Hello', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<Hello />)

    expect(toJSON(wrapper)).toMatchSnapshot()
  })
})

import { echo } from './index'

describe('echo', () => {
  it('echo inputs', () => {
    expect(echo('hello')).toBe('hello')
  })
})

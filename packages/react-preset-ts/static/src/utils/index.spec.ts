import { echo } from '.'

describe('echo', () => {
  it('should echo inputs', () => {
    expect(echo('hello')).toBe('hello')
  })
})

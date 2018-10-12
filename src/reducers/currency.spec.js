import currency from './currency'

describe('reducers', () => {
  describe('currency', () => {
    const initialState = {
        details: "Test Redux"
    }

    it('should provide the initial state', () => {
      expect(currency(undefined, {})).toEqual(initialState)
    })
  })
})

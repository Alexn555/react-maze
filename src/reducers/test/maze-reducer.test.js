import reducer from '../maze-reducer';

describe('quiz reducer', () => {
  const initState = {
      map: [],
      result: {},
      loading: false,
      errors:{}
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
      {
          map: [],
          result: {},
          loading: false,
          errors:{}
      }
    )
  });

  it('returns the correct state on success', () => {
    const action = { type: 'FETCH_MAP', payload: 1 };
    const expectedRes = initState;

    expect(reducer(undefined, action)).toEqual(expectedRes);
  });

});
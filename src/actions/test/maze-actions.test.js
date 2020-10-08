import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const fetchMap = () => ({
  type: 'FETCH_MAP'
});

describe('quiz async actions', () => {
  afterEach(() => {
    fetchMock.restore()
  });

  it('should send FETCH_MAP action and get correct snapshot', () => {
	const store = mockStore({ map: [], loading: [], errors: [] });
    store.dispatch(fetchMap());
    expect(store.getActions()).toMatchSnapshot();
  });

  it('should send FETCH_MAP action and get right actions', () => {
    fetchMock.getOnce('/maze-map', {
      body: { payload: ['something'] },
      headers: { 'content-type': 'application/json' }
    });

    const expectedActions = [
      { type: 'FETCH_MAP' }
    ];

    const store = mockStore({ quizzes: [], loading: [], errors: [] });
	store.dispatch(fetchMap());
    expect(store.getActions()).toEqual(expectedActions);
  });


});





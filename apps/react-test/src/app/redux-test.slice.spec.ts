import {
  fetchReduxTest,
  reduxTestAdapter,
  reduxTestReducer,
} from './redux-test.slice';

describe('reduxTest reducer', () => {
  it('should handle initial state', () => {
    const expected = reduxTestAdapter.getInitialState({
      loadingStatus: 'not loaded',
      error: null,
    });

    expect(reduxTestReducer(undefined, { type: '' })).toEqual(expected);
  });

  it('should handle fetchReduxTests', () => {
    let state = reduxTestReducer(undefined, fetchReduxTest.pending(null, null));

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loading',
        error: null,
        entities: {},
      })
    );

    state = reduxTestReducer(
      state,
      fetchReduxTest.fulfilled([{ id: 1 }], null, null)
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loaded',
        error: null,
        entities: { 1: { id: 1 } },
      })
    );

    state = reduxTestReducer(
      state,
      fetchReduxTest.rejected(new Error('Uh oh'), null, null)
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'error',
        error: 'Uh oh',
        entities: { 1: { id: 1 } },
      })
    );
  });
});

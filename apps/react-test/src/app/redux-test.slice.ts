import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';

export const REDUX_TEST_FEATURE_KEY = 'reduxTest';

/*
 * Update these interfaces according to your requirements.
 */
export interface ReduxTestEntity {
  id: number;
}

export interface ReduxTestState extends EntityState<ReduxTestEntity> {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  error: string;
}

export const reduxTestAdapter = createEntityAdapter<ReduxTestEntity>();

/**
 * Export an effect using createAsyncThunk from
 * the Redux Toolkit: https://redux-toolkit.js.org/api/createAsyncThunk
 *
 * e.g.
 * ```
 * import React, { useEffect } from 'react';
 * import { useDispatch } from 'react-redux';
 *
 * // ...
 *
 * const dispatch = useDispatch();
 * useEffect(() => {
 *   dispatch(fetchReduxTest())
 * }, [dispatch]);
 * ```
 */
export const fetchReduxTest = createAsyncThunk(
  'reduxTest/fetchStatus',
  async (_, thunkAPI) => {
    /**
     * Replace this with your custom fetch call.
     * For example, `return myApi.getReduxTests()`;
     * Right now we just return an empty array.
     */
    return Promise.resolve([]);
  }
);

export const initialReduxTestState: ReduxTestState =
  reduxTestAdapter.getInitialState({
    loadingStatus: 'not loaded',
    error: 'initialReduxTestState error',
  });

export const reduxTestSlice = createSlice({
  name: REDUX_TEST_FEATURE_KEY,
  initialState: initialReduxTestState,
  reducers: {
    add: reduxTestAdapter.addOne,
    remove: reduxTestAdapter.removeOne,
    // ...
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReduxTest.pending, (state: ReduxTestState) => {
        state.loadingStatus = 'loading';
      })
      .addCase(
        fetchReduxTest.fulfilled,
        (state: ReduxTestState, action: PayloadAction<ReduxTestEntity[]>) => {
          reduxTestAdapter.setAll(state, action.payload);
          state.loadingStatus = 'loaded';
        }
      )
      .addCase(fetchReduxTest.rejected, (state: ReduxTestState, action) => {
        state.loadingStatus = 'error';
        state.error = action.error.message!;
      });
  },
});

/*
 * Export reducer for store configuration.
 */
export const reduxTestReducer = reduxTestSlice.reducer;

/*
 * Export action creators to be dispatched. For use with the `useDispatch` hook.
 *
 * e.g.
 * ```
 * import React, { useEffect } from 'react';
 * import { useDispatch } from 'react-redux';
 *
 * // ...
 *
 * const dispatch = useDispatch();
 * useEffect(() => {
 *   dispatch(reduxTestActions.add({ id: 1 }))
 * }, [dispatch]);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#usedispatch
 */
export const reduxTestActions = reduxTestSlice.actions;

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 *
 * e.g.
 * ```
 * import { useSelector } from 'react-redux';
 *
 * // ...
 *
 * const entities = useSelector(selectAllReduxTest);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#useselector
 */
const { selectAll, selectEntities } = reduxTestAdapter.getSelectors();

export const getReduxTestState = (rootState: any): ReduxTestState =>
  rootState[REDUX_TEST_FEATURE_KEY];

export const selectAllReduxTest = createSelector(getReduxTestState, selectAll);

export const selectReduxTestEntities = createSelector(
  getReduxTestState,
  selectEntities
);

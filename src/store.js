import { configureStore } from '@reduxjs/toolkit';
import reducers from './reducers';

const syncRequest = (store) => (next) => (action = {}) => {
    const { payload } = action;
    if (payload instanceof Promise) {
        const dispatchAction = (data) => {
            return store.dispatch({ ...action, payload: data });
        };
        payload.then(dispatchAction, dispatchAction);
    } else {
        next(action);
    }
};

export default configureStore({
    reducer: reducers,
    middleware: () => [syncRequest],
});

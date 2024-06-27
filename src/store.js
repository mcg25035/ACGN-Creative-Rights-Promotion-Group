import { configureStore } from '@reduxjs/toolkit';
import reducers from './features/reducers';

export default configureStore({
    reducer: reducers,
});

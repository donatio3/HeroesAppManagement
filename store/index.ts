import {  configureStore } from '@reduxjs/toolkit';
import heroes from '../components/heroesList/heroesSlice';
import filters from '../components/heroesFilters/filtersSlice';
import { apiSlice } from '../hooks/apiSlice';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// const stringMiddleware = () => (next) => (action) => {
//     if (typeof action === 'string') {
//         return next({
//             type: action
//         })
//     }
//     return next(action)
// };

const store = configureStore({
    reducer: {
      heroes,
      filters,
      [apiSlice.reducerPath]: apiSlice.reducer, // Для api
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware), // Добавляем middleware для api
    devTools: process.env.NODE_ENV !== 'production',
  });

export default store;
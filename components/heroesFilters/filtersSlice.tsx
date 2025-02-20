import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import {useHttp} from '../../hooks/http.hook';

export interface Filter {
    id: number;
    name: string;
    label: string;
    className: string;
}

export interface FiltersState {
    filtersLoadingStatus: 'loading' | 'idle' | 'error';
    activeFilter: string; // Фильтр, например, 'all', или значение для фильтрации героев
    entities: Record<number, Filter>;
    ids: number[];
  }
  const filtersAdapter = createEntityAdapter<Filter>();

  const initialState = filtersAdapter.getInitialState({
    filtersLoadingStatus: 'loading' as "loading" | "error" | "idle",
    activeFilter: 'all'
});

export const fetchFilters = createAsyncThunk(
    'filters/fetchFilters',
    async () => {
        const {request} = useHttp();
        return await request("/api/filters");
    }
);

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        filtersChanged: (state, action) => {
            state.activeFilter = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFilters.pending, state => {state.filtersLoadingStatus = 'loading'})
            .addCase(fetchFilters.fulfilled, (state, action) => {
                state.filtersLoadingStatus = 'idle';
                filtersAdapter.setAll(state, action.payload);
            })
            .addCase(fetchFilters.rejected, state => {
                state.filtersLoadingStatus = 'error';
            })
            .addDefaultCase(() => {})
    }
});

const {actions, reducer} = filtersSlice;

export default reducer;

export const { selectAll } = filtersAdapter.getSelectors((state: { filters: FiltersState }) => state.filters);

export const { filtersChanged } = actions;


import { Hero } from "@/prisma/seed";
import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { FiltersState } from "../heroesFilters/filtersSlice";

export interface HeroesState {
    heroesLoadingStatus: 'loading' | 'idle' | 'error';
    entities: Record<number, Hero>; // Состояние, которое хранит все герои
    ids: number[]; // Массив id героев
}


const heroesAdapter = createEntityAdapter<Hero>();

const initialState = heroesAdapter.getInitialState({
    heroesLoadingStatus: 'loading'
});

export const fetchHeroes = createAsyncThunk(
    'heroes/fetchHeroes',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch("/api/heroes");
            if (!response.ok) {
                throw new Error("Failed to fetch filters");
            }
            return await response.json();
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

const heroesSlice = createSlice({
    name: 'heroes',
    initialState,
    reducers: {
        createHero: (state, action) => {
            heroesAdapter.addOne(state, action.payload);
        },
        deleteHero: (state, action) => {
            heroesAdapter.removeOne(state, action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHeroes.pending, state => {state.heroesLoadingStatus = 'loading'})
            .addCase(fetchHeroes.fulfilled, (state, action) => {
                state.heroesLoadingStatus = 'idle';
                heroesAdapter.setAll(state, action.payload);
            })
            .addCase(fetchHeroes.rejected, state => {
                state.heroesLoadingStatus = 'error';
            })
            .addDefaultCase(() => {})
    }
});

const {actions, reducer} = heroesSlice;

export default reducer;

export const { selectAll } = heroesAdapter.getSelectors((state: { heroes: HeroesState }) => state.heroes);

export const filteredHeroesSelector = createSelector(
    (state: { filters: FiltersState }) => state.filters.activeFilter,
    selectAll,
    (filter, heroes) => {
        if (filter === 'all') {
            return heroes;
        } else {
            return heroes.filter((item: Hero) => item.element === filter);
        }
    }
);

export const { createHero, deleteHero } = actions;

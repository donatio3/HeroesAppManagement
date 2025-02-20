'use client'
import { useState } from 'react';
import {  useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import store, { RootState } from '../../store';

import { FiltersState, selectAll } from '../heroesFilters/filtersSlice';
import { useCreateHeroMutation } from '../../hooks/apiSlice';
import { Filter } from '@/prisma/seed';


const HeroesAddForm = () => {
    const [heroName, setHeroName] = useState('');
    const [heroDescr, setHeroDescr] = useState('');
    const [heroElement, setHeroElement] = useState('');
    const [createHero] = useCreateHeroMutation();

    const {filtersLoadingStatus} = useSelector((state : RootState) => state.filters);
    const filters = selectAll(store.getState())

    
    const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newHero = {
            id: uuidv4(),
            name: heroName,
            description: heroDescr,
            element: heroElement
        }

        // (1) RTK QUERY
        createHero(newHero).unwrap();

        // (2) TOOLKIT
        // request("/api/heroes/create", "POST", JSON.stringify(newHero))
        //     .then(dispatch(createHero(newHero)) as any)
        //     .catch(err => console.log(err));

        setHeroName('');
        setHeroDescr('');
        setHeroElement('');
    }

    const renderFilters = (filters: Filter[], status: FiltersState['filtersLoadingStatus']) => {
        if (status === "loading") {
            return <option>Загрузка элементов</option>
        } else if (status === "error") {
            return <option>Ошибка загрузки</option>
        }
        
        if (filters && filters.length > 0 ) {
            return filters.map(({name, label}) => {
                // eslint-disable-next-line
                if (name === 'all')  return;

                return <option key={name} value={name}>{label}</option>
            })
        }
    }

    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={onSubmitHandler}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="Как меня зовут?"
                    value={heroName}
                    onChange={(e) => setHeroName(e.target.value)}/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="text" 
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}
                    value={heroDescr}
                    onChange={(e) => setHeroDescr(e.target.value)}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    required
                    className="form-select" 
                    id="element" 
                    name="element"
                    value={heroElement}
                    onChange={(e) => setHeroElement(e.target.value)}>
                    <option value="">Я владею элементом...</option>
                    {renderFilters(filters, filtersLoadingStatus)}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;
'use client'
import { useHttp} from '../../hooks/http.hook';
import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {  fetchHeroes } from './heroesSlice';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';
import './heroesList.scss';
import { useDeleteHeroMutation, useGetHeroesQuery } from '../../hooks/apiSlice';  // Импортируем хук для удаления
import { Hero } from '@/prisma/seed';
import { AppDispatch } from '@/store';

const HeroesList = () => {
    // 1 cпособ не использовать 
    // const someState = useSelector(state => ({ //будет делать re-render так как это обьект,обьекты никогда не равны 
    //     activeFilter: state.filters.activeFilter,
    //     heroes: state.heroes.heroes
    // })) не использовать !!!!

    
    
    // const filteredHeroes = useSelector(state => {   // добовляем heroes/filters 
    //     if (state.filters.filteredHeroes === 'all') {
    //         return state.heroes.heroes;
    //     } else {
    //         return state.heroes.heroes.filter(elem => elem.element === state.filters.filterChooseActive) 
    //     }
        
    // })

    const activeFilter = useSelector((state: any) => state.filters.activeFilter);
    const heroesLoadingStatus = useSelector((state: any) => state.heroes.heroesLoadingStatus);
    const {
        data: heroes = [],
        isLoading,
        isError,
    } = useGetHeroesQuery('heroesList', {
        
    });


    const filteredHeroes = useMemo(() => {
        const filteredHeroes = heroes.slice();

        if (activeFilter === 'all') {
            return filteredHeroes;
        } else {
            return filteredHeroes.filter((item: Hero) => item.element === activeFilter);
        }
    }, [heroes, activeFilter]);


    const [deleteHero] = useDeleteHeroMutation();
    const dispatch = useDispatch<AppDispatch>();
    const {request} = useHttp();
    // const {deleteHeroFromDatabase} = useDatabase()

    useEffect(() => {
        dispatch(fetchHeroes());
    }, []);
    

    const removeHero = useCallback((id: number) => {
        deleteHero(id);
        // eslint-disable-next-line  
    }, []);

    if (isLoading) {
        return <Spinner/>;  
    } else if (isError) {
        return <h5 className="text-center mt-5">Ошибка загрузки! </h5>
    }
    
    const renderHeroesList = (arr: Hero[]) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }


        return arr.map(({id, ...props}) => {
            
            return (
                <HeroesListItem name={props.name} description={props.description} element={props.element} removeHero={() => removeHero(id)} key={id}/>
            )
        })
    }

    const elements = renderHeroesList(filteredHeroes);
    return (
        <ul style={{paddingRight: '30px'}}>
            {elements}
        </ul>
    )
}

export default HeroesList;


















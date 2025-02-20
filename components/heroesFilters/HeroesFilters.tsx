'use client'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import store, { AppDispatch, RootState } from '../../store';

import { filtersChanged, fetchFilters, selectAll, Filter } from './filtersSlice';
import Spinner from '../spinner/Spinner';


const HeroesFilters = () => {
    const { filtersLoadingStatus, activeFilter } = useSelector((state: RootState) => state.filters);
    const filters = selectAll(store.getState()); // Получаем фильтры из состояния
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchFilters()); // Запускаем загрузку фильтров
    }, []);

    if (filtersLoadingStatus === "loading") {
        return <div style={{display: 'flex', justifyContent: 'center'}}><Spinner /></div>; // Показываем индикатор загрузки, пока фильтры загружаются
    }

    if (filtersLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>; // Показываем ошибку, если загрузка не удалась
    }

    // Если фильтры пусты после загрузки, показываем сообщение
    if (filters.length === 0) {
        return <h5 className="text-center mt-5">Фильтры не найдены</h5>;
    }

    // Рендерим фильтры, если они есть
    const renderFilters = (arr: Filter[]) => {
        return arr.map(({ name, className, label }: Filter) => {
            const btnClass = classNames('btn', className, {
                'active': name === activeFilter
            });

            return <button 
                        key={name} 
                        id={name} 
                        className={btnClass}
                        onClick={() => dispatch(filtersChanged(name))}>
                        {label}
                    </button>
        });
    };

    const elements = renderFilters(filters);

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {elements}
                </div>
            </div>
        </div>
    );
};



export default HeroesFilters;
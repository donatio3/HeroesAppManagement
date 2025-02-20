import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
// создаем функц-ть которая будет общаться с сервером и автоматом проводить операции then(dispatch(fetchHeroes)) 
// ЧТОБЫ RTK QUERY РАБОТАЛ НУЖНО ПОДКЛЮЧАТЬ ЕЩЕ ОДИН middleWare
// createApi - создает и reducer 
export const apiSlice = createApi({
    reducerPath: 'api', // Название - имя среза 
    baseQuery: fetchBaseQuery({baseUrl: '/api'}),      // вместо fetch 
    tagTypes: ['Heroes'], // теги - метки
    endpoints: builder => ({ // операции которые проводим по баз. адресу (отправка получение данных)
        getHeroes: builder.query({  // метод query - просто получить данные
            query: () => '/heroes', // получаем героеев - эта строка приесоед. к baseQuery 
            providesTags: ['Heroes'] 
        }),
        createHero: builder.mutation({ // метод mutation исп. когда change, добавляем или удаляем из state            
            query: hero => ({
                url: "/heroes/create",
                method: 'POST',
                body: hero  // автоматом переходит в json формат    
            }),
            invalidatesTags: ['Heroes']
        }),
        deleteHero: builder.mutation({
            query: (id: number) => {
                console.log('SLICE API ID ', id)
                return {
                    url: `/heroes/${id}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: ['Heroes']

        })
    })                    
})

export const {useGetHeroesQuery, useCreateHeroMutation, useDeleteHeroMutation} = apiSlice;














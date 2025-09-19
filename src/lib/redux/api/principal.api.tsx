import { apiSlice } from '../api';
import { createPrincipalType, updatePrincipalType } from '@/features/data-management/principal/types';

export const {
    useCreatePrincipalMutation,
    useUpdatePrincipalMutation,
    useLazyGetPrincipalQuery,
    useGetPrincipalQuery
} = apiSlice.injectEndpoints({
    endpoints: builder => ({
        createPrincipal: builder.mutation<void, createPrincipalType>({
            query: (args) => ({
                url: '/principal',
                method: 'POST',
                body: args
            }),
            invalidatesTags: ['Table']
        }),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        getPrincipal: builder.query<updatePrincipalType, string>({
            query: (id) => ({
                url: '/principal/details/' + id,
                method: 'GET',
            }),
            transformResponse: (result: updatePrincipalType) => result,
            providesTags: ['Principal']
        }),
        updatePrincipal: builder.mutation<void, updatePrincipalType & { id: string }>({
            query: (args) => ({
                url: '/principal/details/' + args.id,
                method: 'PUT',
                body: args
            }),
            invalidatesTags: ['Principal']
        })
    })
})


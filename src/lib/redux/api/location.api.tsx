import {apiSlice} from '../api';
import {updateLocationType} from '@/features/data-management/location/types';

type locationDetails = {
    id: string;
    loc_code: string;
    loc_name: string;
    is_active: boolean;
}

export const {
    useCreateLocationMutation, 
    useUpdateLocationMutation,
    useLazyGetLocationQuery,
    useGetLocationQuery
} = apiSlice.injectEndpoints({
    endpoints: builder => ({
        createLocation: builder.mutation<void, {
            loc_name: string;
            loc_code: string;
            is_active: boolean;
        }>({
            query: (args) => ({
                url: '/location',
                method: 'POST',
                body: args
            }),
            invalidatesTags:['Table']
        }),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        getLocation: builder.query<locationDetails, string>({
            query: (id) => ({
                url: '/location/details/'+id,
                method: 'GET',
            }),
            transformResponse: (result: locationDetails) => result,
            providesTags: ['Location']
        }),
        updateLocation: builder.mutation<void, updateLocationType & {id: string}>({
            query: (args) => ({
                url:'/location/details/'+args.id,
                method: 'PUT',
                body: args
            }),
            invalidatesTags: ['Location']
        })
    })
})


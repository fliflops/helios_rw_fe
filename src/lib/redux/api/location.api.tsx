import {apiSlice} from '../api';
import {updateLocationType} from '@/features/data-management/location/types';

type locationDetails = {
    location_id: string;
    location_name: string;
    location_status: string;
    users: []
}

export const {
    useCreateLocationMutation, 
    useUpdateLocationMutation,
    useGetLocationQuery
} = apiSlice.injectEndpoints({
    endpoints: builder => ({
        createLocation: builder.mutation<void, {
            location_name: string;
            location_status: string;
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
            query: (location_id) => ({
                url: '/location/details/'+location_id,
                method: 'GET',
            }),
            transformResponse: (result: locationDetails) => result,
            providesTags: ['Location']
        }),
        updateLocation: builder.mutation<void, updateLocationType & {location_id: string}>({
            query: (args) => ({
                url:'/location/details/'+args.location_id,
                method: 'PUT',
                body: args
            }),
            invalidatesTags: ['Location']
        })
    })
})


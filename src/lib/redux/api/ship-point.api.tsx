import { apiSlice } from '../api';
import { updateShipPointType } from '@/features/data-management/ship-point/types';

type shipPointDetails = {
    ship_point_desc: string;
    ship_point_code: string;
    ship_point_address?: string;
    city?: string;
    state?: string;
    country?: string;
    ship_pt_zone?: string;
    postal_code?: string;
    is_active: boolean;
}

export const {
    useCreateShipPointMutation,
    useUpdateShipPointMutation,
    useLazyGetShipPointQuery,
    useGetShipPointQuery
} = apiSlice.injectEndpoints({
    endpoints: builder => ({
        createShipPoint: builder.mutation<void, {
            ship_point_desc: string;
            ship_point_code: string;
            ship_point_address?: string;
            city?: string;
            state?: string;
            country?: string;
            ship_pt_zone?: string;
            postal_code?: string;
            is_active: boolean;
        }>({
            query: (args) => ({
                url: '/ship-point',
                method: 'POST',
                body: args
            }),
            invalidatesTags: ['Table']
        }),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        getShipPoint: builder.query<shipPointDetails, string>({
            query: (id) => ({
                url: '/ship-point/details/' + id,
                method: 'GET',
            }),
            transformResponse: (result: shipPointDetails) => result,
            providesTags: ['ShipPoint']
        }),
        updateShipPoint: builder.mutation<void, updateShipPointType & { id: string }>({
            query: (args) => ({
                url: '/ship-point/details/' + args.id,
                method: 'PUT',
                body: args
            }),
            invalidatesTags: ['ShipPoint']
        })
    })
})


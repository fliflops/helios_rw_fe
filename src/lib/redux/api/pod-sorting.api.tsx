/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiSlice } from '../api';

export const {useCreateBarcodeMutation} = apiSlice.injectEndpoints({
    endpoints: builder => ({
        createBarcode: builder.mutation<any, {
            count: number;
            location: string;
        }>({
            query: (args) => ({
                url: '/pod-sorting/barcode',
                method: 'POST',
                body: {
                    ...args
                }
            }),
            invalidatesTags: ['Table']
        })
    })
})
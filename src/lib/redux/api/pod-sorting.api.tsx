/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiSlice } from '../api';

export const {useCreateBarcodeMutation, useLazyGetSortedInvoiceCountQuery} = apiSlice.injectEndpoints({
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
        }),
        getSortedInvoiceCount: builder.query<{invoice_count: number}, {
            service_type:      string; 
            principal:         string; 
            ship_to_code:      string; 
            location_code:     string; 
            delivery_date_from:string; 
            delivery_date_to:  string; 
        }>({
            query: (args) => ({
                url: '/pod-sorting',
                method:"GET",
                params: {
                    ...args
                }
            })
        })
    })
})
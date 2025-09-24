/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiSlice } from '../api';

export const {
    useCreateBarcodeMutation, 
    useLazyGetSortedInvoiceCountQuery, 
    useGetSortingSessionQuery,
    useGetAllInvoiceQuery,
    useCreateSortingSessionMutation,
    useCancelSortingSessionMutation,
    useAssignBarcodeMutation,
    useGetInvoiceMutation,
    useConfirmSortMutation
} = apiSlice.injectEndpoints({
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
        }),
        getSortingSession: builder.query<{
            service_type:      string; 
            principal:         string; 
            ship_to_code:      string; 
            location_code:     string; 
            delivery_date_from:string; 
            delivery_date_to:  string; 
        },void>({
           query: () => ({
                url: '/pod-sorting/session',
                method: 'GET'
           }),
           providesTags: ['SortingSession'] 
        }),
        confirmSort: builder.mutation<void,void>({
            query: () => ({
                url: '/pod-sorting/session',
                method: 'POST',
            }),
            invalidatesTags:['SortingSession']
        }),
        createSortingSession: builder.mutation<any,{service_type:      string; 
            principal:         string; 
            ship_to_code:      string; 
            location_code:     string; 
            delivery_date_from:string; 
            delivery_date_to:  string;
        }>({
            query: (args) => ({
                url: '/pod-sorting',
                method: 'POST',
                body:{
                    ...args
                }
            }),
            invalidatesTags:['SortingSession']
        }),
        cancelSortingSession: builder.mutation<void,void>({
            query: () => ({
                url: '/pod-sorting/session',
                method: 'PUT',
            }),
            invalidatesTags:['SortingSession']
        }), 
        assignBarcode: builder.mutation<void, {key:string; barcode: string}>({
            query: (args) => ({
                url: '/pod-sorting/pod',
                method:'PUT',
                body:{
                    ...args
                }
            }),
            invalidatesTags:['SortingScan']
        }),
        getInvoice: builder.mutation<{key:string; data: {br_no:string;dr_no:string;invoice_no:string}}[],{invoice_no?:string; dr_no?:string}>({
            query:(args) => ({
                url: '/pod-sorting/pod',
                method:'POST',
                body:{
                    ...args
                }
            }),
        }),
        getAllInvoice: builder.query<{invoice_no: string;
            br_no: string;
            service_type:string;
            dr_no: string;
            shipment_manifest: string;
            ship_to: string;
            delivery_date: string
        }[],{is_assigned: boolean}>({
            query: (args)=> ({
                url: '/pod-sorting/pod',
                method:'GET',
                params: {
                    ...args
                }
            }),
            providesTags: ['SortingScan']
        }),
        
    })
})
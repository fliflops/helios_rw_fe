import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {isRejectedWithValue} from '@reduxjs/toolkit';
import type { Middleware } from '@reduxjs/toolkit';
import {toast} from 'react-toastify';
import { RootState } from './store';

const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders:(headers,{ getState }) => {
        const token = (getState() as RootState).auth.token;
        if(token) {
            headers.set('x-access-token', `${token}`)
        }
        return headers   
    }
})

export const apiSlice = createApi({
    reducerPath: 'apiSlice',
    baseQuery: baseQuery,
    tagTypes: ['Table','Session','Location','ShipPoint', 'Principal'],
    endpoints: () => ({})
})



export const errorHandler: Middleware = 
    () => (next) => (action) => {
    if(isRejectedWithValue(action)){
        console.warn(action.payload)
        
        const payload:({
            data:{
                message: string;
            }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }) = action.payload as any;
        let msg = "Unable to connect to server";
        if (payload.data && payload.data.message) {
            msg = payload.data.message
        }
        toast.error(msg)
    }
    return next(action)
} 
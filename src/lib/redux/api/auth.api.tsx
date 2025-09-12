/* eslint-disable @typescript-eslint/no-explicit-any */
import {apiSlice} from '../api';

type userSession = {
    id:string;
    email:string;
    password_expiry: string;
    is_lock: string;
    is_new: string;
    is_reset: string;
}

export type updatePasswordType = {
    status: 'new' | 'reset' | 'lock';
    old_password: string;
    new_password: string
}


export const {
    useLoginMutation,
    useSessionQuery,
    useAuthPasswordUpdateMutation
} = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation<any, {email:string; password: string;}> ({
            query:(args) => ({
                url:'/auth/login',
                body: args,
                method:'POST'
            }),
            invalidatesTags:['Session']
        }),
        authPasswordUpdate: builder.mutation<void, updatePasswordType> ({
            query: ({status,...args}) => ({
                url: '/auth/password/'+status,
                body: args,
                method: 'PUT'
            }),
            invalidatesTags:['Session'] 
        }),
        session: builder.query<userSession, void>({
            query: () => ({
                url: '/auth/session',
                method: 'GET'
            }),
            providesTags: ['Session']
        })
    })
})
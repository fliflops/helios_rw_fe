import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from '../store'

type authSliceType = {
    token: string   | null;
    id: string      | null;
    email: string   | null;
    role: {
        role_id:    string;
        role_name:  string;
        is_admin:   boolean;
        is_active:  boolean;
    } | null
    access: []
}

const initialState:authSliceType = {
    token:  null,
    id:     null,
    email:  null,
    role:   null,
    access: [],
}

export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers: {
         setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload
        },
        setLogin: (state, action:  PayloadAction<authSliceType>) => {
            const data = action.payload;
            state = {
                ...data,
                ...state 
            }
        },
        setLogOut:() => initialState,
    }
})

export const getAccessToken = (state: RootState) => state.auth.token;
export const getSession = (state: RootState) => state.auth;
export const {setLogin,setLogOut,setToken} = authSlice.actions;
export default authSlice.reducer;



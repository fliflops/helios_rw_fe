import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { RootState } from '../store';

type sortingValues = {
    selected: {
        label: string;
        value: string;
    } | null;
    is_dr: boolean;
}

const initialState: sortingValues = {
    selected: null,
    is_dr: false
}

export const podSortingSlice = createSlice({
    name:'pod_sort',
    initialState,
    reducers:{
        setSelected: (state, action: PayloadAction<sortingValues['selected']>) => {
            state.selected = action.payload
        },
        setIsDr: (state, action: PayloadAction<boolean>) => {
            state.is_dr = action.payload
        }
    }
})

export const getPodSortingState = (state: RootState) =>  state.podSortSlice;

export const {setSelected, setIsDr} = podSortingSlice.actions;
export default podSortingSlice.reducer;
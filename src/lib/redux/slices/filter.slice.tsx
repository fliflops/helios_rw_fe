import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from '../store'
import { filterFormValues } from '@/features/pod-view/validations'
import moment from 'moment'
import { barcodeFilterType } from '@/features/utility/barcode/validations'


type filterSliceType= {
    view_pod: Omit<filterFormValues , 'delivery_date'> & {
        delivery_date?: {
            from: string;
            to: string
        } 
    },
    view_barcode: barcodeFilterType
}

const initialState: filterSliceType = {
    view_pod: {
        search:'',
        trip_number:'',
        location:   null,
        ship_point: null,
        principal:  null,
        delivery_status: null,
        rud_status: null,
        pod_status: null,
        delivery_date: {
            from: moment().format('YYYY-MM-DD'),
            to: moment().format('YYYY-MM-DD')
        }
    },
    view_barcode: {
        search:'',
        location: null,
        is_assigned: null
    }
}

export const filterSlice = createSlice({
    name:'filter',
    initialState,
    reducers:{
        setViewPODFilter: (state, action: PayloadAction<filterSliceType['view_pod']>) => {
            state.view_pod = action.payload
        },
        setViewBarcodeFilter: (state, action: PayloadAction<filterSliceType['view_barcode']>) => {
            state.view_barcode = action.payload
        }
    }
})

export const getViewPODFilters = (state: RootState) => state.filterSlice.view_pod
export const getViewBarcodeFilters = (state: RootState) => state.filterSlice.view_barcode

export const {setViewPODFilter, setViewBarcodeFilter} = filterSlice.actions;
export default filterSlice.reducer
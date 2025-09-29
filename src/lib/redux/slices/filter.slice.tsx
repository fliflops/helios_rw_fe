import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from '../store'
import { filterFormValues } from '@/features/pod-transactions/pod-view/validations'
import moment from 'moment'
import { barcodeFilterType } from '@/features/utility/barcode/validations'


type filterSliceType= {
    view_pod: Omit<filterFormValues , 'delivery_date'> & {
        delivery_date?: {
            from: string;
            to: string
        } 
    },
    view_barcode: barcodeFilterType,
    default: {
        search: string;
    } 
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
    },
    default: {
        search:''
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
        },
        setViewSearchFilter: (state, action: PayloadAction<filterSliceType['default']>) => {
            state.default = action.payload
        }
    }
})

export const getViewPODFilters = (state: RootState) => state.filterSlice.view_pod
export const getViewBarcodeFilters = (state: RootState) => state.filterSlice.view_barcode
export const getViewSearch = (state: RootState) => state.filterSlice.default

export const {setViewPODFilter, setViewBarcodeFilter, setViewSearchFilter} = filterSlice.actions;
export default filterSlice.reducer
import React from 'react'
import {barcode} from '../../validations'
import { ColumnDef } from '@tanstack/react-table';
import APITable from '@/components/table/APITable';
import { useAppDispatch, useAppSelector } from '@/hooks/redux.hooks';
import { getViewBarcodeFilters, setViewBarcodeFilter } from '@/lib/redux/slices/filter.slice';
import moment from 'moment';

interface BarcodeTableProps {

}



const BarcodeTable: React.FC<BarcodeTableProps> = () => {
    const barcodeFilters = useAppSelector(getViewBarcodeFilters);
    const dispatch = useAppDispatch();
    
    const columns: ColumnDef<barcode>[] = [
        {
            header:'Barcode',
            accessorKey:'barcode'
        },
        {
            header:'Assigned?',
            accessorKey: 'is_assigned',
            cell: props => props.getValue() ? 'Yes' : 'No'
        },
        {
            header: 'Location',
            accessorKey: 'location'
        },
        {
            header: 'Created Date',
            accessorKey:'created_at',
            cell: props => moment(props.getValue() as string).format('YYYY-MM-DD HH:mm:ss')
        }
    ]

    const handleSearch = (search:string) => {
        dispatch(setViewBarcodeFilter({
            ...barcodeFilters,
            search
        }))
    }
    
    return <>
      <APITable
        columns={columns}
        route='/pod-sorting/barcode'
        onSearch={handleSearch}
        filters={{
            search: barcodeFilters.search,
            location: barcodeFilters.location?.value,
            is_assigned: barcodeFilters.is_assigned?.value
        }}
      />
    </>;
}

export default BarcodeTable
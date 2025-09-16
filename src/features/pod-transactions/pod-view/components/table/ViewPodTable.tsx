import APITable from '@/components/table/APITable';
import { useAppDispatch, useAppSelector } from '@/hooks/redux.hooks';
import { getViewPODFilters, setViewPODFilter } from '@/lib/redux/slices/filter.slice';
import { ColumnDef } from '@tanstack/react-table';
import React from 'react'
import moment from 'moment';

interface ViewPodTableProps {

}

type viewPodTable = {
    id:string;
    br_no: string;
    service_type:string;
    dr_no:string;
    shipment_manifest:string;
    principal:string;
    ship_to_code:string;
    invoice_no:string;
    delivery_date:string;
    location_code:string;
    ship_from:string;
}

const ViewPodTable: React.FC<ViewPodTableProps> = () => {
    const podFilters = useAppSelector(getViewPODFilters);
    const dispatch = useAppDispatch();
    const columns: ColumnDef<viewPodTable>[] = [
        {
            header: 'Booking Request No.',
            accessorKey:'br_no'
        },
        {
            header:'DR #',
            accessorKey:'dr_no'
        },
        {
            header:'Sales Invoice',
            accessorKey: 'invoice_no'
        },
        {
            header:'Status'
        },
        {
            header: 'RUD Status',

        },
        {
            header:'Delivery Status'
        },
        {
            header:'Delivery Date',
            accessorKey:'delivery_date'
        },
        {
            header:'Trip #'
        },
        {
            header: 'Principal',
            accessorKey:'principal'
        },
        {
            header:'Ship Point',
            accessorKey:'ship_to_code'
        },
        {
            header:'Service Type',
            accessorKey:'service_type'
        },
        {
            header: 'Location',
            accessorKey:'location_code'
        }
    ]

    const handleSearch = (search:string) => {
        dispatch(setViewPODFilter({
            ...podFilters,
            search
        }))
    }

    return <div className='h-60'>
        <APITable
            columns={columns}
            route='/pod-view'
            onSearch={handleSearch}
            filters={{
                search: podFilters.search,
                location_code: podFilters.location?.value,
                ship_to_code: podFilters.ship_point?.value,
                principal: podFilters.principal?.value,
                delivery_status: podFilters.delivery_status?.value,
                rud_status: podFilters.rud_status?.value,
                pod_status: podFilters.pod_status?.value,
                delivery_date_from: moment(podFilters.delivery_date?.from).format('YYYY-MM-DD'),
                delivery_date_to: moment(podFilters.delivery_date?.to).format('YYYY-MM-DD')
            }}
        />
    </div>;
}

export default ViewPodTable
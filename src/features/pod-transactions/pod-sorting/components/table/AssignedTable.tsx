import DataTable from '@/components/table/Datatable';
import { useGetAllInvoiceQuery } from '@/lib/redux/api/pod-sorting.api';
import { ColumnDef, PaginationState } from '@tanstack/react-table';
import React from 'react'

interface AssignedTableProps {

}

type column = {
    invoice_no: string;
    br_no: string;
    service_type:string;
    dr_no: string;
    shipment_manifest: string;
    ship_to: string;
    delivery_date: string
}

const AssignedTable: React.FC<AssignedTableProps> = () => {
    const {data=[], isLoading, refetch} = useGetAllInvoiceQuery({is_assigned: false});
    const [{pageIndex,pageSize},setPagination] = React.useState<PaginationState>({
            pageIndex: 0,
            pageSize: 10
    })

    const columns: ColumnDef<column>[] = [
        {
            header: 'Invoice No',
            accessorKey: 'invoice_no'
        },
        {
            header: 'Booking Request No',
            accessorKey: 'br_no'
        },
        {
            header: 'Service Type',
            accessorKey: 'service_type'
        },
        {
            header: 'DR No',
            accessorKey: 'dr_no'
        },
        {
            header: 'Shipment Manifest',
            accessorKey: 'shipment_manifest'
        },
        {
            header: 'Delivery Date',
            accessorKey: 'delivery_date'
        },
    ]
    
    return <>
        <DataTable
            refetch={refetch}
            isLoading={isLoading}
            columns={columns}
            data={data}
            state={{
                pagination: {
                    pageIndex,
                    pageSize
                }
            }}
            setPagination={setPagination}
        />
    </>;
}

export default AssignedTable
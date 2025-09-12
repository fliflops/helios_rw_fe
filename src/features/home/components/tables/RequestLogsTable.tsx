import APITable from '@/components/table/APITable';
import { ColumnDef } from '@tanstack/react-table';
import React from 'react'

interface RequestLogsTableProps {
    route: string;
}

type requestLogsTypes = {
    route: string;
    job_status: string;
    createdAt: string;
    updatedAt: string;
}

const RequestLogsTable: React.FC<Partial<RequestLogsTableProps>> = (props) => {
    const columns:ColumnDef<requestLogsTypes>[] = [
        {
            header: 'Route',
            accessorKey:'route'
        },
        {
            header:'Status',
            accessorKey:'job_status'
        },
        {
            header:'Created Date',
            accessorKey:'createdAt'
        },
        {
            header: 'Updated Date',
            accessorKey:'updatedAt'
        }
    ]
    
    return <>
        <APITable
            columns={columns}
            route='/user/logs'
            filters={{
                ...props
            }}
        />
    </>;
}

export default RequestLogsTable
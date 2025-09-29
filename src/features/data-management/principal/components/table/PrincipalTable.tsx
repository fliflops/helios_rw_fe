import React from 'react'
import { ColumnDef } from '@tanstack/react-table';
import APITable from '@/components/table/APITable';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { principalTable } from '../../types';
import { useAppDispatch, useAppSelector } from '@/hooks/redux.hooks';
import { getViewSearch, setViewSearchFilter } from '@/lib/redux/slices/filter.slice';

interface PrincipalTableProps {

}

const PrincipalTable: React.FC<PrincipalTableProps> = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const filters = useAppSelector(getViewSearch);

    const columns: ColumnDef<principalTable>[] = [
        {
            header: 'ID',
            accessorKey: 'customer_code'
        },
        {
            header: 'Name',
            accessorKey: 'customer_name'
        },
        {
            header: 'Description',
            accessorKey: 'customer_desc'
        },
        {
            header: 'Status',
            accessorKey: 'is_active',
            cell: (props) => {
                return props.row.original.is_active ? 'AC' : "IA";
            }
        },
        {
            header: 'Address',
            accessorKey: 'customer_address'
        },
        {
            header: 'Action',
            cell: (props) => {
                const value = props.row.original.id!
                const handleUpdate = () => {
                    navigate('/principal/' + value)
                }
                return <>
                    <Button onClick={handleUpdate}>Edit</Button>
                </>
            }
        }
    ];

    const handleSearch = (search: string) => {
        dispatch(setViewSearchFilter({
            ...filters,
            search
        }))
    }

    return <>
        <APITable
            columns={columns}
            route='/principal'
            onSearch={handleSearch}
            filters={filters}
        />
    </>;
}

export default PrincipalTable
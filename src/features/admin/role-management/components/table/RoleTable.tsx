import React from 'react'
import { ColumnDef } from '@tanstack/react-table';
import APITable from '@/components/table/APITable';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/redux.hooks';
import { getViewSearch, setViewSearchFilter } from '@/lib/redux/slices/filter.slice';

interface RoleTableProps {

}

type roleTableType = {
    id: string;
    role_name: string;
    is_active: number;
    is_admin: number;
}

const RoleTable: React.FC<RoleTableProps> = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const filters = useAppSelector(getViewSearch);

    const columns: ColumnDef<roleTableType>[] = [
        {
            header: 'Role Name',
            accessorKey: 'role_name'
        },
        {
            header: 'Status',
            accessorKey: 'is_active',
            cell: props => props.getValue() ? 'Active' : 'Inactive'
        },
        {
            header: 'Is Admin',
            accessorKey: 'is_admin',
            cell: props => props.getValue() ? 'Yes' : 'No'
        },
        {
            header: 'Action',
            cell: props => {
                return <Button size={'sm'} onClick={() => navigate(props.row.original.id)}>Edit</Button>
            }
        }
    ]

    const handleSearch = (search: string) => {
        dispatch(setViewSearchFilter({
            ...filters,
            search
        }))
    }

    return <>
        <APITable
            columns={columns}
            route='/role'
            onSearch={handleSearch}
            filters={filters}
        />
    </>;
}

export default RoleTable
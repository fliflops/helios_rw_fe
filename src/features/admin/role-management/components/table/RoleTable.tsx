import React from 'react'
import { ColumnDef } from '@tanstack/react-table';
import APITable from '@/components/table/APITable';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface RoleTableProps {

}

type roleTableType = {
    id:string;
    role_name:string;
    is_active:number;
    is_admin: number;
}

const RoleTable: React.FC<RoleTableProps> = () => {
    const navigate = useNavigate();
    
    const columns: ColumnDef<roleTableType>[] = [
        {
            header:'Role Name',
            accessorKey:'role_name'
        },
        {
            header: 'Status',
            accessorKey:'role_status',
        },
        {
            header: 'Is Admin',
            accessorKey: 'is_admin',
            cell: props => props.getValue() === 1 ? 'Yes' : 'No'
        },
        {
            header: 'Action',
            cell: props => {
                return <Button size={'sm'} onClick={()=>navigate(props.row.original.id)}>Edit</Button>
            }
        }
    ]

    return <>
        <APITable
            columns={columns}
            route='/role'
        />
    </>;
}

export default RoleTable
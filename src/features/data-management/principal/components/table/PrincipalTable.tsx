import React from 'react'
import { ColumnDef } from '@tanstack/react-table';
import APITable from '@/components/table/APITable';
import {Button} from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { principalTable } from '../../types';

interface PrincipalTableProps {

}

const PrincipalTable: React.FC<PrincipalTableProps> = () => {
    const navigate = useNavigate();
    
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
            cell: (props) =>{
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

    return <>
        <APITable
            columns={columns}
            route='/principal'
            onSearch={()=>{}}
        />
    </>;
}

export default PrincipalTable
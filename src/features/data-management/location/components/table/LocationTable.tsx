import React from 'react'
import { ColumnDef } from '@tanstack/react-table';
import APITable from '@/components/table/APITable';
import {Button} from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { locationTable } from '../../types';

interface LocationTableProps {

}

const LocationTable: React.FC<LocationTableProps> = () => {
    const navigate = useNavigate();
    
    const columns: ColumnDef<locationTable>[] = [
        {
            header: 'Location',
            accessorKey: 'loc_name'
        },
        {
            header: 'Code',
            accessorKey: 'loc_code'
        },
        {
            header: 'Status',
            accessorKey: 'is_active',
            cell: (props) => {
                return props.row.original.is_active ? 'AC' : "IA";
            }
        },
        {
            header: 'Action',
            cell: (props) =>{
                const value = props.row.original.id
                const handleUpdate = () => {                    
                    navigate('/location/' + value)
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
            route='/location'
            onSearch={()=>{}}
        />
    </>;
}

export default LocationTable
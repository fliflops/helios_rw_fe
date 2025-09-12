import React from 'react'
import { ColumnDef } from '@tanstack/react-table';
import APITable from '@/components/table/APITable';
import {Button} from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface LocationTableProps {

}

type locationTable = {
    location_id: string;
    location_name: string;
    location_status: string;
}

const LocationTable: React.FC<LocationTableProps> = () => {
    const navigate = useNavigate();
    
    const columns: ColumnDef<locationTable>[] = [
        {
            header: 'Location',
            accessorKey: 'location_name'
        },
        {
            header: 'Status',
            accessorKey: 'location_status'
        },
        {
            header: 'Action',
            cell: (props) =>{
                const location_id = props.row.original.location_id
                const handleUpdate = () => {
                    navigate(location_id)
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
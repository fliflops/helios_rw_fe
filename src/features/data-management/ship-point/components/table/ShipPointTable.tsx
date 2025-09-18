import React from 'react'
import { ColumnDef } from '@tanstack/react-table';
import APITable from '@/components/table/APITable';
import {Button} from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { shipPointTable } from '../../types';

interface ShipPointTableProps {

}

const ShipPointTable: React.FC<ShipPointTableProps> = () => {
    const navigate = useNavigate();
    
    const columns: ColumnDef<shipPointTable>[] = [
        {
            header: 'Ship Point ID',
            accessorKey: 'ship_point_code'
        },
        {
            header: 'Description',
            accessorKey: 'ship_point_desc'
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
                    navigate('/ship-point/' + value)
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
            route='/ship-point'
            onSearch={()=>{}}
        />
    </>;
}

export default ShipPointTable
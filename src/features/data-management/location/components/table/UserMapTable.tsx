import DataTable from '@/components/table/Datatable';
import { ColumnDef } from '@tanstack/react-table';
import {Button} from '@/components/ui/button';
import React from 'react'

type userLocationType = {
    id:string,
    fk_location: string;
    fk_user_id: string;
    location_name: string;
    email: string;
    is_active: boolean
}

interface UserMapTableProps {
    data: userLocationType[];
    onUpdate: (index:number, status: boolean) => void
}

const UserMapTable: React.FC<UserMapTableProps> = ({data,onUpdate}) => {
    const columns: ColumnDef<userLocationType>[] = [
        {
            header:'Location',
            accessorKey:'location_name'
        },
        {
            header:'Email',
            accessorKey: 'email'
        },
        {
            header: 'Is Active',
            accessorKey: 'is_active'
        },
        {
            header:'Action',
            cell:(props) => {
                const data = props.row.original;
                const handleUpdate = (status: boolean) => {
                    onUpdate(props.row.index, status)
                }

                return data.is_active ? 
                    <Button size={'sm'} type='button' variant={'destructive'} onClick={() => handleUpdate(false)}>Deactivate</Button> : 
                    <Button size={'sm'} type='button' onClick={() => handleUpdate(true)}>Activate</Button> 
            }
        }
    ]
    
    return <>
        <DataTable
            columns={columns}
            data={data}
            refetch={()=>{}}
        />
    </>;
}

export default UserMapTable
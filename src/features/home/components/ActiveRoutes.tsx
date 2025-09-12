import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import React from 'react'

import { useAppSelector } from '@/hooks/redux.hooks';
import { getSession } from '@/lib/redux/slices/auth.slice';
import { useGetAssignedRoutesQuery } from '@/lib/redux/api/user.api';
import { Button } from '@/components/ui/button';
import RequestLogsTable from './tables/RequestLogsTable';


interface ActiveRoutesProps {

}

const ActiveRoutes: React.FC<ActiveRoutesProps> = () => {
    const {role_id,role_name} = useAppSelector(getSession);
    const {data} = useGetAssignedRoutesQuery(role_id as string);
    const [selected, setSelected] = React.useState<{
        route: string;
    } | null>(null)
    
    return <div className='border rounded-sm p-3 grid grid-cols-2 gap-3'>
        <div className='flex flex-col gap-1'>
            <p>Active Routes</p>
            <Table className='border'>
                <TableHeader>
                    <TableRow>
                        <TableHead>Route Label</TableHead>
                        <TableHead>Route</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        data?.map(item => (
                            <TableRow key={item.id}>
                                <TableCell>{item.label}</TableCell>
                                <TableCell>{item.route}</TableCell>
                                <TableCell>{item.method}</TableCell>
                                <TableCell>
                                    <Button size={'sm'} variant={'outline'} onClick={() => {
                                        setSelected({
                                            ...selected,
                                            route: item.route
                                        })
                                    }}>Details</Button>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>       
        </div>
        <div className='flex flex-col gap-1'>
            <p>Details</p>
            <div className='border p-3 grid grid-cols-2 gap-2'>
                <p>Role Name: <span className='font-semibold'>{role_name}</span></p>
                <div className='flex-1'>
                    <p>Selected Route: <span className='font-semibold'>{selected?.route}</span></p>
                </div>
                <div className='col-span-2 flex justify-end'>
                    <Button size={'sm'} onClick={()=>setSelected(null)}>Clear</Button>
                </div>
            </div>
            <div>
                <RequestLogsTable {...selected}/>
            </div>
        </div>
    </div>;
}

export default ActiveRoutes
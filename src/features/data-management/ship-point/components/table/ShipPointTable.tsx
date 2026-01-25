import React from 'react'
import { ColumnDef } from '@tanstack/react-table';
import APITable from '@/components/table/APITable';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { shipPointTable } from '../../types';
import { useAppDispatch, useAppSelector } from '@/hooks/redux.hooks';
import { getViewSearch, setViewSearchFilter } from '@/lib/redux/slices/filter.slice';

interface ShipPointTableProps {

}

const ShipPointTable: React.FC<ShipPointTableProps> = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const filters = useAppSelector(getViewSearch);

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
            header: 'Address',
            accessorKey: 'ship_point_address'
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
            cell: (props) => {
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

    const handleSearch = (search: string) => {
        dispatch(setViewSearchFilter({
            ...filters,
            search
        }))
    }

    return <>
        <APITable
            columns={columns}
            route='/ship-point'
            onSearch={handleSearch}
            filters={filters}
        />
    </>;
}

export default ShipPointTable
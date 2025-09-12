import {
    ColumnDef,
    OnChangeFn,
    PaginationState,
    // ColumnFiltersState,
    // SortingState,
    // VisibilityState,
    flexRender,
    getCoreRowModel,
    // getFilteredRowModel,
    getPaginationRowModel,
    // getSortedRowModel,
    useReactTable,
  } from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import DataTablePagination from './Pagination';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { RefreshCw } from 'lucide-react';
import React from "react";

interface DatatableProps<TData, TValue> {
    data: TData[];
    columns: ColumnDef<TData, TValue>[],
    pageCount?: number;
    count?: number;
    manualPagination?: boolean;
    isLoading?: boolean;
    setPagination?: OnChangeFn<PaginationState>,
    refetch: () => void, 
    handleSearch?: (search: string) => void,
    state?:{
        pagination?: PaginationState
    }
}

function DataTable<TData,TValue>({
    columns,
    data,
    ...props
}: DatatableProps<TData,TValue>) {  
   
    const table = useReactTable({
        data,
        columns,    
        pageCount: props.pageCount,
        getCoreRowModel:        getCoreRowModel(),
        getPaginationRowModel:  getPaginationRowModel(),
        manualPagination:       props.manualPagination,
        onPaginationChange:     props.setPagination,
        state: props.state
    });
     const [searchValue, setSearch] = React.useState<string>('')

    const handleSearch = (e:React.ChangeEvent<HTMLInputElement>) => {
       setSearch(e.target.value)
    }

    React.useEffect(() => {
        //set the debounce time to 500ms
        const timerId = setTimeout(() => {
            if(props.handleSearch) props.handleSearch(searchValue);
        }, 500)

        // Cleanup function to clear the timer if the input value changes before the delay is up
        return () => {
            clearTimeout(timerId);
        };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[searchValue])

    return (
        <div>
            <div className='flex justify-between pb-1'>
                <div className='flex gap-1'>
                    <Input className='h-8' placeholder='Search' onChange={handleSearch} value={searchValue}/> 
                    <Button isLoading={props.isLoading} variant={'ghost'} className='h-8' size='icon' onClick={() => props.refetch()} >{props.isLoading ? null : <RefreshCw className='text-gray-600 h-3'/>}</Button>
                </div>
                <label className='font-sans text-sm font-semibold self-end'>Total Rows: {props.manualPagination ? props.count : data.length}</label>
            </div>
            <div className="rounded-md border h-80 overflow-y-auto block">
                <Table>
                    <TableHeader className='sticky top-0 bg-white backdrop-blur-1'>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                            return (
                            <TableHead key={header.id} className='font-sans font-semibold'>
                                {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                    )}
                            </TableHead>
                            )
                        })}
                        </TableRow>
                    ))}
                    </TableHeader>
                    <TableBody className='h-40'>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                        <TableRow
                            key={row.id}
                            data-state={row.getIsSelected() && "selected"}
                        >
                            {row.getVisibleCells().map((cell) => (
                            <TableCell  className={'py-2 text-xs'} key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </TableCell>
                            ))}
                        </TableRow>
                        ))
                    ) : (
                        <TableRow>
                        <TableCell colSpan={columns.length} className="h-24 text-center">
                            No results.
                        </TableCell>
                        </TableRow>
                    )}
                    </TableBody>
                </Table>
            </div>
            <DataTablePagination table={table} isFetching={props.isLoading}/>
        </div>
   )
}

export default DataTable
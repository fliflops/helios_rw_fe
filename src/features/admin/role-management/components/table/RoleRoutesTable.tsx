import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    //TableFooter,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import { roleSubModuleTypes } from '../../types';
import {Checkbox} from '@/components/ui/checkbox';

interface RoleRoutesTableProps {
    data: roleSubModuleTypes;
    handleChange: (event: {id:string, value: boolean, field: string}) => void
}

const RoleRoutesTable: React.FC<RoleRoutesTableProps> = (props) => {
    return <Table className='border'>
        <TableHeader>
            <TableRow>
                <TableHead className='w-96'>Module Label</TableHead>
                <TableHead>View</TableHead>   
                <TableHead>Create</TableHead>   
                <TableHead>Edit</TableHead>   
                <TableHead>Export</TableHead>      
            </TableRow>
        </TableHeader>
        <TableBody>
            {
                props.data.map((item) => (
                    <TableRow key={item.id}>
                        <TableCell>{item.module_name}</TableCell>
                        <TableCell>
                            <Checkbox 
                                name={`modules.${item.id}.view`}
                                checked={item.view}
                                onCheckedChange={value => {
                                    props.handleChange({
                                        id: item.id as string,
                                        value: value as boolean,
                                        field: 'view'
                                    })
                                }}
                            />
                        </TableCell>
                        <TableCell>
                            <Checkbox 
                                name={`modules.${item.id}.create`}
                                checked={item.create}
                                onCheckedChange={value => {
                                    props.handleChange({
                                        id: item.id as string,
                                        value: value as boolean,
                                        field: 'create'
                                    })
                                }}
                            />
                        </TableCell>
                        <TableCell>
                            <Checkbox 
                                name={`modules.${item.id}.edit`}
                                checked={item.edit}
                                onCheckedChange={value => {
                                    props.handleChange({
                                        id: item.id as string,
                                        value: value as boolean,
                                        field: 'edit'
                                    })
                                }}
                            />
                        </TableCell>
                        <TableCell>
                            <Checkbox 
                                name={`modules.${item.id}.export`}
                                checked={item.export}
                                onCheckedChange={value => {
                                    props.handleChange({
                                        id: item.id as string,
                                        value: value as boolean,
                                        field: 'export'
                                    })
                                }}
                            />
                        </TableCell>
                    </TableRow>  
                ))
            }
        </TableBody>
    </Table>;
}

export default RoleRoutesTable
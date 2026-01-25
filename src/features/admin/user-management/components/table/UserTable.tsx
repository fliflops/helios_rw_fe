import APITable from '@/components/table/APITable';
import { ColumnDef } from '@tanstack/react-table';
import React, { useContext } from 'react'
import { userTableType } from '../../types';
import { Button } from '@/components/ui/button';
import useDisclosure from '@/hooks/useDisclosure';
import CreateAppKey from '../modals/CreateAppKey';
import UpdateUserStatus from '../modals/UpdateUserStatus';

import { Pencil } from 'lucide-react'
import UpdateRole from '../modals/UpdateRole';
import { UserContext } from '../context/UserContext';
import ResetUserPassword from '../modals/ResetPassword';
import { useAppDispatch, useAppSelector } from '@/hooks/redux.hooks';
import { getViewSearch, setViewSearchFilter } from '@/lib/redux/slices/filter.slice';

interface UserTableProps {

}

const UserTable: React.FC<UserTableProps> = () => {
    const { state, setState } = useContext(UserContext);
    const resetPassword = useDisclosure();
    const updateAppKey = useDisclosure();
    const updateStatus = useDisclosure();
    const updateRole = useDisclosure();
    const dispatch = useAppDispatch();
    const filters = useAppSelector(getViewSearch);

    const columns: ColumnDef<userTableType>[] = [
        {
            header: 'Email',
            accessorKey: 'email'
        },
        {
            header: 'Role Name',
            accessorKey: 'role_name',
        },
        {
            header: 'Status',
            accessorKey: 'is_active',
            cell: props => props.getValue() ? 'Active' : 'Inactive'
        },
        {
            header: 'Action',
            cell: props => {
                const data = props.row.original;
                const setSelectedData = () => {
                    setState({
                        ...state,
                        id: data.id,
                        is_active: data.is_active,
                        username: data.email,
                        role_name: data.role_name
                    })
                }

                const handleUpdateStatus = () => {
                    updateStatus.onOpen();
                    setSelectedData();
                }

                const handlePasswordReset = () => {
                    resetPassword.onOpen();
                    setSelectedData();
                }

                return (
                    <div className='grid grid-flow-col gap-1 w-60'>
                        <Button size='sm' variant={'outline'} onClick={updateRole.onOpen}><Pencil /></Button>
                        <Button size={'sm'} onClick={handlePasswordReset}>Reset Password</Button>
                        <Button size={'sm'} onClick={handleUpdateStatus} variant={data.is_active ? 'destructive' : 'default'}>{data.is_active ? 'Deactivate' : 'Activate'}</Button>
                    </div>
                )
            }
        },
    ]

    const handleSearch = (search: string) => {        
        dispatch(setViewSearchFilter({
            ...filters,
            search
        }))
    }

    return (<div>
        <APITable
            columns={columns}
            route='/user'
            onSearch={handleSearch}
            filters={filters}
        />
        <CreateAppKey isOpen={updateAppKey.open} onClose={updateAppKey.onClose} />
        <UpdateUserStatus isOpen={updateStatus.open} onClose={updateStatus.onClose} />
        <UpdateRole isOpen={updateRole.open} onClose={updateRole.onClose} />
        <ResetUserPassword isOpen={resetPassword.open} onClose={resetPassword.onClose} />
    </div>);
}

export default UserTable
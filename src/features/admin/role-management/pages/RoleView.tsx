import React from 'react';
import RoleTable from '../components/table/RoleTable';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface RoleViewProps {

}

const RoleView: React.FC<RoleViewProps> = () => {
    const navigate = useNavigate();
    return <div className='grid gap-2'>
        <div className='flex justify-end'>
            <Button variant={'outline'} onClick={() => navigate('create')}>Create Role</Button>
        </div>
        <RoleTable/>
    </div>;
}

export default RoleView;
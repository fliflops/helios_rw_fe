import React from 'react'
import { Outlet } from 'react-router-dom';

interface RoleProps {

}

const Role: React.FC<RoleProps> = () => {
    return <div className='grid gap-2'>
        <Outlet/>
    </div>;
}

export default Role
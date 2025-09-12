import React from 'react'
import {Outlet} from 'react-router-dom';

interface PageIndexProps {

}

const PageIndex: React.FC<PageIndexProps> = () => {
    return <div className='grid gap-2'>
            <Outlet/>
        </div>
}

export default PageIndex
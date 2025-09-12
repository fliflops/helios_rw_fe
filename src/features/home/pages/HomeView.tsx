import React from 'react'
import ActiveSession from '../components/ActiveSession';
import ActiveRoutes from '../components/ActiveRoutes';

interface HomeViewProps {

}

const HomeView: React.FC<HomeViewProps> = () => {
    
    return (
        <div className='grid gap-3'>
            {/* <div>
                <ActiveSession/>
            </div>
            
            <div>
                <ActiveRoutes />
            </div> */}
        </div>
    );
}

export default HomeView
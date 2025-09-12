import React from 'react'
import PODFilterForm from '../components/forms/PODFilterForm';
import ViewPodTable from '../components/table/ViewPodTable';

interface PodViewPageProps {

}

const PodViewPage: React.FC<PodViewPageProps> = () => {
    return <div className='flex flex-col gap-2'>
        <PODFilterForm/>
        <ViewPodTable/>
    </div>;
}

export default PodViewPage
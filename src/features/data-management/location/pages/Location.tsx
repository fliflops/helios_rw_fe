import React from 'react'
import {Button} from '@/components/ui/button'
import LocationTable from '../components/table/LocationTable';
import useDisclosure from '@/hooks/useDisclosure';
import CreateLocation from '../components/modals/CreateLocation';


interface LocationProps {

}

const Location: React.FC<LocationProps> = () => {
    const createLocation = useDisclosure();

    return <div className='grid gap-2'>
        <div className='flex w-full justify-end'>
            <Button variant={'outline'} onClick={createLocation.onOpen}>Create Location</Button>
        </div>
        <div>
            <LocationTable/>
        </div>
        <CreateLocation isOpen={createLocation.open} onClose={createLocation.onClose}/>
      
    </div>;
}

export default Location
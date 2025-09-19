import { Button } from '@/components/ui/button';
import useDisclosure from '@/hooks/useDisclosure';
import React from 'react'
import ShipPointTable from '../components/table/ShipPointTable';
import CreateShipPoint from '../components/modals/CreateShipPoint';

interface ShipPointProps {

}

const ShipPoint: React.FC<ShipPointProps> = () => {
    const createShipPoint = useDisclosure();

    return <div className='grid gap-2'>
        <div className='flex w-full justify-end'>
            <Button variant={'outline'} onClick={createShipPoint.onOpen}>Create Ship Point</Button>
        </div>
        <div>
            <ShipPointTable/>
        </div>
        <CreateShipPoint isOpen={createShipPoint.open} onClose={createShipPoint.onClose}/>
      
    </div>;
}

export default ShipPoint
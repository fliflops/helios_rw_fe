import { Button } from '@/components/ui/button';
import React from 'react'
import PrincipalTable from '../components/table/PrincipalTable';
import CreatePrincipal from '../components/modals/CreatePrincipal';
import useDisclosure from '@/hooks/useDisclosure';

interface PrincipalProps {

}

const Principal: React.FC<PrincipalProps> = () => {
    const createPrincipal = useDisclosure();

    return <div className='grid gap-2'>
        <div className='flex w-full justify-end'>
            <Button variant={'outline'} onClick={createPrincipal.onOpen}>Create Principal</Button>
        </div>
        <div>
            <PrincipalTable/>
        </div>
        <CreatePrincipal isOpen={createPrincipal.open} onClose={createPrincipal.onClose}/>
      
    </div>;
}

export default Principal
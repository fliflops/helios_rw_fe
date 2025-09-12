import React from 'react'
import {Button} from '@/components/ui/button'
import BarcodeTable from '../components/table/BarcodeTable';
import { useNavigate } from 'react-router-dom';
import BarcodeFilterForm from '../components/form/BarcodeFilterForm';

interface BarcodeProps {

}

const Barcode: React.FC<BarcodeProps> = () => {
    const navigate = useNavigate();
    return (
        <div className='grid gap-2'>
            <div className='grid grid-cols-2'>
                 <BarcodeFilterForm/>
                <div className='flex w-full justify-end'>
                    <Button variant={'outline'} onClick={() => navigate('generate')}>Generate Barcode</Button>
                </div>
               
            </div>
            <div>
                <BarcodeTable/>
            </div>
        </div>
    );
}

export default Barcode
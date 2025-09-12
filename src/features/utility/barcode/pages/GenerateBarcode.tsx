import React from 'react';
import BarcodeForm from '../components/form/BarcodeForm';

interface GenerateBarcodeProps {

}



const GenerateBarcode: React.FC<GenerateBarcodeProps> = () => {
    
    return<div className='grid grid-cols-2 gap-2'>
        <BarcodeForm/>
        <div>
            
        </div>
    </div>;
}

export default GenerateBarcode
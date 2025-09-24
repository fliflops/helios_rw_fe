
import { Input } from '@/components/ui/input';
import React from 'react'

interface BarcodeInputProps extends React.ComponentProps<"input">{
    disabled?: boolean
    setBarcode: (value:string) => void;
}

const BarcodeInput = React.forwardRef<HTMLInputElement, BarcodeInputProps> (({disabled, setBarcode,...props},ref) => {
    const [value,setValue] = React.useState<string>('');

    
    React.useEffect(()  => {
        const timer = setTimeout(() => {
            if(value !== '' && value?.length >= 15){ 
                setBarcode(value);
                setValue('')
            }
        }, 1000)

        return () => {
            clearTimeout(timer)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[value])

    return(
        <div className='grid gap-1'>
            <label>Scan Barcode</label>
            <Input 
                ref={ref}
                disabled={disabled}

                {...{
                    ...props,
                    value,
                    onChange: ((e) => setValue(e.target.value)),
                }}
            />
        </div>
    );
});

export default BarcodeInput
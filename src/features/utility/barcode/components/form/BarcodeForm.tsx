import React from 'react'
import {createBarcodeType, createBarcodeSchema} from '../../validations';
import { yupResolver } from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import { Form } from '@/components/ui/form';
import FormInput from '@/components/form/FormInput';
import FormAPISelect from '@/components/form/FormAPISelect';
import { Button } from '@/components/ui/button'
import { useCreateBarcodeMutation } from '@/lib/redux/api/pod-sorting.api';
import { toast } from 'react-toastify';

const defaultValues: createBarcodeType = {
    location: null,
    barcode_count: 0
}

interface BarcodeFormProps {

}

const BarcodeForm: React.FC<BarcodeFormProps> = () => {
    const [onCreateBarcodes, {isLoading}] = useCreateBarcodeMutation();
    const form = useForm<createBarcodeType>({
        resolver: yupResolver(createBarcodeSchema),
        defaultValues
    })

    const handleSubmit = async(values: createBarcodeType) => {
        await onCreateBarcodes({
            location: values.location?.value as string,
            count: values.barcode_count as number,
        })
        .then(() => {
            toast.success('Barcodes Created')
        })
    }

    return (
        <Form {...form}>
            <form className='flex flex-col gap-2' onSubmit={form.handleSubmit(handleSubmit)}>
                <FormAPISelect
                    label='Location'
                    type='user-location'
                    control={form.control}
                    name='location'
                    placeholder='Select Location'
                />
                <FormInput
                    type='number'
                    control={form.control}
                    label='Number of Barcodes'
                    name='barcode_count'
                    placeholder='Number of Barcodes'
                />
              
                <div className='flex justify-end'>
                    <Button isLoading={isLoading} type='submit'>Generate</Button>
                </div>
            </form>
        </Form>
    )
}

export default BarcodeForm
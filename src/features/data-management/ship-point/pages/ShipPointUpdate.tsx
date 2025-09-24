import React from 'react'
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { Form, FormField } from '@/components/ui/form';
import FormCheckbox from '@/components/form/FormCheckbox';
import { useGetShipPointQuery, useUpdateShipPointMutation } from '@/lib/redux/api/ship-point.api';
import { Navigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateShipPointSchema, updateShipPointType } from '../types';
import FormInput from '@/components/form/FormInput';
import { cleanObject } from '@/lib/utils';

interface ShipPointUpdateProps {

}

const defaultValues = {
    ship_point_code: '',
    ship_point_desc: '',
    ship_point_address: '',
    city: '',
    state: '',
    country: '',
    ship_pt_zone: '',
    postal_code: '',
    is_active: true,
}

const ShipPointUpdate: React.FC<ShipPointUpdateProps> = () => {
    const { id } = useParams();
    const { data, refetch, isLoading, isSuccess, isError } = useGetShipPointQuery(id as string)
    const [updateShipPoint, updateShipPointProps] = useUpdateShipPointMutation();
    const form = useForm<typeof defaultValues>({
        resolver: zodResolver(updateShipPointSchema),
        defaultValues: {
            ...defaultValues,
        }
    })

    const handleReset = () => {
        refetch().then(() => {
            const cData = cleanObject(data)
            form.reset({
                ...defaultValues,
                ...cData,
            })
        })

    }

    const handleSubmit = async (values: updateShipPointType) => {
        if (!updateShipPointProps.isLoading) {
            await updateShipPoint({
                ...values,
                id: id as string
            })
            .unwrap()
            .then(() => {
                toast.success('Update Success')
            })
        }
    }

    React.useEffect(() => {
        if (isSuccess) {
            const cData = cleanObject(data);
            form.reset({
                ...defaultValues,
                ...cData,
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess])

    if (isLoading) return <>...Loading</>
    if (!data || isError) return <Navigate to='/ship-point' replace />

    return <>
        <Form {...form}>
            <form className='flex flex-col gap-4' onSubmit={form.handleSubmit(handleSubmit)}>
                <div className='grid grid-cols-2 gap-4'>

                    <FormField
                        control={form.control}
                        name='ship_point_code'
                        render={({ field }) =>
                            <FormInput label='Ship Point ID' name={field.name} placeholder='Ship Point Code' />
                        }
                    />
                    <FormField
                        control={form.control}
                        name='ship_point_desc'
                        render={({ field }) =>
                            <FormInput label='Description' name={field.name} placeholder='Description' />
                        }
                    />
                    <FormField
                        control={form.control}
                        name='ship_point_address'
                        render={({ field }) =>
                            <FormInput label='Address' name={field.name} placeholder='Address' />
                        }
                    />
                    <FormField
                        name='is_active'
                        render={({ field }) => <FormCheckbox label='Is Active' checked={field.value} onCheckedChange={field.onChange} />}
                    />
                    <FormField
                        control={form.control}
                        name='ship_pt_zone'
                        render={({ field }) =>
                            <FormInput label='Ship Point Zone' name={field.name} placeholder='Ship Point Zone' />
                        }
                    />
                    <FormField
                        control={form.control}
                        name='city'
                        render={({ field }) =>
                            <FormInput label='City' name={field.name} placeholder='City' />
                        }
                    />
                    <FormField
                        control={form.control}
                        name='state'
                        render={({ field }) =>
                            <FormInput label='State' name={field.name} placeholder='State' />
                        }
                    />
                    <FormField
                        control={form.control}
                        name='country'
                        render={({ field }) =>
                            <FormInput label='Country' name={field.name} placeholder='Country' />
                        }
                    />
                    <FormField
                        control={form.control}
                        name='postal_code'
                        render={({ field }) =>
                            <FormInput label='Postal Code' name={field.name} placeholder='Postal Code' />
                        }
                    />
                </div>
                <div className='flex justify-between border p-2 rounded-md items-center'>
                    <div className='flex gap-2'>
                        <Button type='submit' size='sm' isLoading={updateShipPointProps.isLoading}>Save</Button>
                        <Button variant='destructive' size={'sm'} type='button' onClick={handleReset} disabled={updateShipPointProps.isLoading}> Reset </Button>
                    </div>
                </div>
            </form>
        </Form>
    </>;
}

export default ShipPointUpdate
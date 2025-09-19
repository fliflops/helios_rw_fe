import React from 'react'
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { Form, FormField } from '@/components/ui/form';
import FormCheckbox from '@/components/form/FormCheckbox';
import { useGetPrincipalQuery, useUpdatePrincipalMutation } from '@/lib/redux/api/principal.api';
import { Navigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { zodResolver } from '@hookform/resolvers/zod';
import { updatePrincipalSchema, updatePrincipalType } from '../types';
import FormInput from '@/components/form/FormInput';
import FormAppLabel from '@/components/form/FormLabel';

interface PrincipalUpdateProps {
}

const defaultValues = {
    customer_code: '',
    customer_name: '',
    customer_desc: '',
    customer_address: '',
    city: '',
    state: '',
    country: '',
    postal_code: '',
    is_active: true,
}


const PrincipalUpdate: React.FC<PrincipalUpdateProps> = () => {
    const { id } = useParams();
    const { data, refetch, isLoading, isSuccess, isError } = useGetPrincipalQuery(id as string)
    const [updatePrincipal, updatePrincipalProps] = useUpdatePrincipalMutation();
    const form = useForm<updatePrincipalType>({
        resolver: zodResolver(updatePrincipalSchema),
        defaultValues: {
            ...defaultValues,
            ...data,
        }
    })

    const handleReset = () => {
        refetch().then(() => {
            form.reset({
                ...defaultValues,
                ...data
            })
        })

    }

    const handleSubmit = async (values: updatePrincipalType) => {
        if (!updatePrincipalProps.isLoading) {
            await updatePrincipal({
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
            form.reset(data)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess])

    if (isLoading) return <>...Loading</>
    if (!data || isError) return <Navigate to='/principal' replace />

    return <>
        <Form {...form}>
            <form className='flex flex-col gap-4' onSubmit={form.handleSubmit(handleSubmit)}>
                <div className='grid grid-cols-2 gap-4'>
                    <FormField
                        control={form.control}
                        name='customer_code'
                        render={({field}) => <FormAppLabel label='ID' value={field.value}/>}
                    />
                    <FormInput
                        control={form.control}
                        label='Name'
                        name='customer_name'
                        placeholder='Principal Name'
                        defaultValue={data.customer_name}
                    />
                    <FormInput
                        control={form.control}
                        label='Description'
                        name='customer_desc'
                        placeholder='Description'
                        defaultValue={data.customer_desc}
                    />
                    <FormField
                        control={form.control}
                        name='is_active'
                        render={({ field }) => <FormCheckbox label='Is Active' checked={field.value} onCheckedChange={field.onChange} />}
                    />
                    <FormInput
                        control={form.control}
                        label='Address'
                        name='customer_address'
                        placeholder='Address'
                        defaultValue={data.customer_address}
                    />
                    <FormInput
                        control={form.control}
                        label='City'
                        name='city'
                        placeholder='City'
                        defaultValue={data.city}
                    />
                    <FormInput
                        control={form.control}
                        label='State'
                        name='state'
                        placeholder='State'
                        defaultValue={data.state}
                    />
                    <FormInput
                        control={form.control}
                        label='Country'
                        name='country'
                        placeholder='Country'
                        defaultValue={data.country}
                    />
                    <FormInput
                        control={form.control}
                        label='Postal Code'
                        name='postal_code'
                        placeholder='Postal Code'
                        defaultValue={data.postal_code}
                    />
                </div>
                <div className='flex justify-between border p-2 rounded-md items-center'>
                    <div className='flex gap-2'>
                        <Button type='submit' size='sm' isLoading={updatePrincipalProps.isLoading}>Save</Button>
                        <Button variant='destructive' size={'sm'} type='button' onClick={handleReset} disabled={updatePrincipalProps.isLoading}> Reset </Button>
                    </div>
                </div>
            </form>
        </Form>
    </>;
}

export default PrincipalUpdate
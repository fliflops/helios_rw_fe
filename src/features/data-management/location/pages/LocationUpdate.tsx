import React from 'react'
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { Form, FormField } from '@/components/ui/form';
import FormCheckbox from '@/components/form/FormCheckbox';
import { useGetLocationQuery, useUpdateLocationMutation } from '@/lib/redux/api/location.api';
import { Navigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import FormInput from '@/components/form/FormInput';
import FormAppLabel from '@/components/form/FormLabel';

interface LocationUpdateProps {

}

const updateLocationSchema = z.object({
    loc_code: z.string(),
    loc_name: z.string(),
    is_active: z.boolean(),
})

type updateLocationType = z.infer<typeof updateLocationSchema>

const defaultValues = {
    loc_code: '',
    loc_name: '',
    is_active: true
}


const LocationUpdate: React.FC<LocationUpdateProps> = () => {
    const { location_id } = useParams();
    const { data, refetch, isLoading, isSuccess, isError } = useGetLocationQuery(location_id as string)
    const [updateLocation, updateLocProps] = useUpdateLocationMutation();
    const form = useForm<updateLocationType>({
        resolver: zodResolver(updateLocationSchema),
        defaultValues: {
            ...defaultValues,
            ...data
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

    const handleSubmit = async (values: updateLocationType) => {
        if (!updateLocProps.isLoading) {
            await updateLocation({
                ...values,
                id: location_id as string
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
    if (!data || isError) return <Navigate to='/location' replace />

    return <>
        <Form {...form}>
            <form className='flex flex-col gap-4' onSubmit={form.handleSubmit(handleSubmit)}>
                <div className='grid grid-cols-2 gap-4'>
                    <FormInput
                        control={form.control}
                        label='Name'
                        type='text'
                        name='loc_name'
                        defaultValue={data.loc_name}
                        placeholder='Location Name'
                    />
                    <FormField
                        control={form.control}
                        name='loc_code'
                        render={({ field }) => <FormAppLabel label='Code' value={field.value} />}
                    />
                    <FormField
                        control={form.control}
                        name='is_active'
                        render={({ field }) => <FormCheckbox label='Is Active' checked={field.value} onCheckedChange={field.onChange} />}
                    />
                </div>
                <div className='flex justify-between border p-2 rounded-md items-center'>
                    <div className='flex gap-2'>
                        <Button type='submit' size='sm' isLoading={updateLocProps.isLoading}>Save</Button>
                        <Button variant='destructive' size={'sm'} type='button' onClick={handleReset} disabled={updateLocProps.isLoading}> Reset </Button>
                    </div>
                </div>
            </form>
        </Form>
    </>;
}

export default LocationUpdate
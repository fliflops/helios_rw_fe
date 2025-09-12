import React from 'react'
import * as yup from 'yup';
import { Button } from '@/components/ui/button';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form, FormField } from '@/components/ui/form';
import FormAppLabel from '@/components/form/FormLabel';
import FormCheckbox from '@/components/form/FormCheckbox';
import UserMapTable from '../components/table/UserMapTable';
import { useGetLocationQuery, useUpdateLocationMutation } from '@/lib/redux/api/location.api';
import { Navigate, useParams } from 'react-router-dom';
import useDisclosure from '@/hooks/useDisclosure';
import AddUserModal from '../components/modals/AddUserModal';
import { toast } from 'react-toastify';


interface LocationUpdateProps {

}

const updateLocationSchema = yup.object({
    location_name: yup.string().required(),
    location_status: yup.boolean().required(),
    users: yup.array().of(yup.object().shape({
        db_id: yup.string().required(),
        fk_location: yup.string().required(),
        fk_user_id: yup.string().required(),
        location_name: yup.string().required(),
        email: yup.string().required(),
        is_active: yup.boolean().required() 
    }))
})

type updateLocationType = yup.InferType<typeof updateLocationSchema>

const defaultValues = {
    location_name:'',
    location_status: true,
    users: []
}

const LocationUpdate: React.FC<LocationUpdateProps> = () => {
    const {location_id} = useParams();
    const createUser = useDisclosure();
    const {data, refetch,isLoading, isSuccess, isError} = useGetLocationQuery(location_id as string)
    const [updateLocation, updateLocProps] = useUpdateLocationMutation();
    const form = useForm<updateLocationType>({
            resolver: yupResolver(updateLocationSchema),
            defaultValues
    })

    const {fields, update, append} = useFieldArray({
        control: form.control,
        name: 'users'
    })

    const handleAdd = (values: {fk_user_id: string;email: string;is_active: boolean;}) => {
        if(fields.find(i => i.email === values.email)) return toast.error('User already exists!')
        append({
            db_id: 'temp',
            location_name: data?.location_name as string,
            fk_location: data?.location_id as string ,
            fk_user_id: values.fk_user_id as string,
            email: values.email as string,
            is_active: values.is_active as boolean
        }) 
       
    }

    const handleUpdate = (index: number, status: boolean) => {
        const temData =fields[index];
        
        update(index, {
            ...temData,
            is_active: status
        })
    }

    const handleReset = () => {
        refetch().then(() => {
            form.reset({
                location_name: data?.location_name as string,
                location_status: data?.location_status === 'ACTIVE',
                users:data?.users
            })
        })
       
    }   

    const handleSubmit = async (values: updateLocationType) => {
        if(form.formState.isDirty) {
            await updateLocation({
                ...values,
                location_id: location_id as string
            })
            .unwrap()
            .then(() => {
                toast.success('Update Success')
            })
        }
        
    }

    React.useEffect(() => {
        if(isSuccess) {
            form.reset({
                location_name: data.location_name,
                location_status: data.location_status === 'ACTIVE',
                users:data.users
            })
        }     
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isSuccess])

    if(isLoading) return <>...Loading</>
    if(!data || isError) return <Navigate to='/location' replace/>
   
    return <>
        <Form {...form}>
            <form className='flex flex-col gap-4' onSubmit={form.handleSubmit(handleSubmit)}>
                <div className='grid grid-cols-2'>
                    <FormField
                        control={form.control}
                        name='location_name'
                        render={({field}) => <FormAppLabel label='Location Name' value={field.value}/>}
                    />
                    <FormField
                        control={form.control}
                        name='location_status'
                        render={({field}) => <FormCheckbox label='Is Active' checked={field.value} onCheckedChange={field.onChange}/>}
                    />
                </div>
                <div className='flex justify-between border p-2 rounded-md items-center'>
                    <p className='text-md font-sans font-semibold'>Assigned Users</p>
                    <div className='flex gap-2'>
                        <Button size={'sm'} type='button' onClick={createUser.onOpen} disabled={updateLocProps.isLoading}>Add User</Button>
                        <Button type='submit' size='sm' isLoading={updateLocProps.isLoading}>Save</Button>
                        <Button variant='destructive' size={'sm'} type='button' onClick={handleReset} disabled={updateLocProps.isLoading}> Reset </Button>
                    </div>
                </div>
                <div>
                    <UserMapTable data={fields} onUpdate={handleUpdate}/>
                </div>
            </form>
            <AddUserModal onClose={createUser.onClose} isOpen={createUser.open} addtoTable={handleAdd}/>
        </Form>
    </>;
}

export default LocationUpdate
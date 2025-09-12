import React from 'react'
import * as yup from 'yup';
import { Dialog, DialogPanel } from '@/components/Dialog';
import { Button } from '@/components/ui/button';
import { CardContent, CardHeader, Card, CardFooter, CardTitle } from '@/components/ui/card';
import { useLazyGetLocationQuery } from '@/lib/redux/api/location.api';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form, FormField } from '@/components/ui/form';
import FormAppLabel from '@/components/form/FormLabel';
import FormCheckbox from '@/components/form/FormCheckbox';
import UserMapTable from '../table/UserMapTable';


interface UpdateLocationProps {
    onClose: () => void;
    isOpen: boolean;
    location_id: string;
}

const updateLocationSchema = yup.object({
    location_name: yup.string().required(),
    location_status: yup.boolean().required()
})

type updateLocationType = yup.InferType<typeof updateLocationSchema>

const defaultValues = {
    location_name:'',
    location_status: true
}


const UpdateLocation: React.FC<UpdateLocationProps> = (props) => {
    const [getLocation, getLocationProps] = useLazyGetLocationQuery();
    const form = useForm<updateLocationType>({
        resolver: yupResolver(updateLocationSchema),
        defaultValues
    })

    const handleSubmit = async() => {

    }
    
    React.useEffect(() => {
        getLocation(props.location_id as string)
        .unwrap()
        .then(result => {
            form.reset({
                location_name: result.location_name,
                location_status: result.location_status === 'ACTIVE'
            })
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[props.location_id])
    
    return <Dialog open={props.isOpen} onClose={props.onClose}>
        <DialogPanel className='max-w-2xl'>
            <Form {...form}>
            <Card>
                <CardHeader>
                    <CardTitle>Update Location</CardTitle>
                </CardHeader>
                <CardContent>
                        {getLocationProps.isLoading ? '...Loading' : 
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
                                <div>
                                    <UserMapTable data={[]}/>
                                </div>
                            </form>
                        }   
                </CardContent>
                <CardFooter className='flex justify-between'>
                    <Button variant={'destructive'} onClick={props.onClose}>Close</Button>
                    <Button type='submit' >Save</Button> 
                </CardFooter>
            </Card>
            </Form>
        </DialogPanel>
    </Dialog>;
}

export default UpdateLocation
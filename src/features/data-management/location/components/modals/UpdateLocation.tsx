import React from 'react'
import { Dialog, DialogPanel } from '@/components/Dialog';
import { Button } from '@/components/ui/button';
import { CardContent, CardHeader, Card, CardFooter, CardTitle } from '@/components/ui/card';
import { useLazyGetLocationQuery } from '@/lib/redux/api/location.api';
import { useForm } from 'react-hook-form';
import { Form, FormField } from '@/components/ui/form';
import FormAppLabel from '@/components/form/FormLabel';
import FormCheckbox from '@/components/form/FormCheckbox';
import { updateLocationSchema, updateLocationType } from '../../types';
import { zodResolver } from '@hookform/resolvers/zod';


interface UpdateLocationProps {
    onClose: () => void;
    isOpen: boolean;
    location_id: string;
}

const defaultValues = {
    loc_name:'',
    loc_code:'',
    is_active: true
}

const UpdateLocation: React.FC<UpdateLocationProps> = (props) => {
    const [getLocation, getLocationProps] = useLazyGetLocationQuery();
    const form = useForm<updateLocationType>({
        resolver: zodResolver(updateLocationSchema),
        defaultValues
    })

    const handleSubmit = async() => {

    }
    
    React.useEffect(() => {
        getLocation(props.location_id as string)
        .unwrap()
        .then(result => {
            form.reset({
                loc_code: result.loc_code,
                loc_name: result.loc_name,
                is_active: result.is_active
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
                                <div className='grid grid-cols-2 gap-4'>
                                    <FormField
                                        control={form.control}
                                        name='loc_name'
                                        render={({field}) => <FormAppLabel label='Location Name' value={field.value!}/>}
                                    />
                                    <FormField
                                        control={form.control}
                                        name='is_active'
                                        render={({field}) => <FormCheckbox label='Is Active' checked={field.value} onCheckedChange={field.onChange}/>}
                                    />
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
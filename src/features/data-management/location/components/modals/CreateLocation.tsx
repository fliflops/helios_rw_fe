import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogPanel } from '@/components/Dialog';
import { Button } from '@/components/ui/button';
import { Form, FormField } from '@/components/ui/form';
import FormInput from '@/components/form/FormInput';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import FormCheckbox from '@/components/form/FormCheckbox';
import { useCreateLocationMutation } from '@/lib/redux/api/location.api';
import { toast } from 'react-toastify';


interface CreateLocationProps {
    onClose: () => void;
    isOpen: boolean;
}

const createLocationSchema = yup.object({
    location_name: yup.string().required(),
    location_status: yup.boolean().required()
})

type createLocationType = yup.InferType<typeof createLocationSchema>

const CreateLocation: React.FC<CreateLocationProps> = (props) => {
    const [onCreate, {isLoading}] = useCreateLocationMutation();
    
    const form = useForm<createLocationType>({
        resolver: yupResolver(createLocationSchema),
        defaultValues: {
            location_name: '',
            location_status: true
        }
    })

    const handleSubmit = async(values:createLocationType) => {
        await onCreate({
            location_name: values.location_name,
            location_status: values.location_status ? 'ACTIVE' : 'INACTIVE'
        })
        .unwrap()
        .then(() => {
            form.reset({
                location_name:'',
                location_status: true
            })

            toast.success('Location Created')
        })
    }
    
    return (
        <Dialog open={props.isOpen} onClose={()=>{}}>
            <DialogPanel>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)}>
                        <Card>
                            <CardHeader>
                                <CardTitle>Create Location</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className='grid grid-cols-1 gap-2'>
                                    <FormField
                                        control={form.control}
                                        name='location_name'
                                        render={({field}) => (
                                            <FormInput {...field} label='Location' placeholder='Location'/>
                                        )}
                                    />

                                    <FormField
                                        control = {form.control}
                                        name='location_status'
                                        render={({field}) => (
                                            <FormCheckbox label='Is Active' checked={field.value} onCheckedChange={field.onChange}/>
                                        )}
                                    />
                                </div>
                            </CardContent>
                            <CardFooter className='flex justify-between'>
                                <Button onClick={props.onClose} variant={'destructive'} type='button' disabled={isLoading}>Close</Button>
                                <Button type='submit' isLoading={isLoading}>Save</Button>
                            </CardFooter>
                        </Card>
                    </form>
                </Form>
            </DialogPanel>
        </Dialog>
    );
}

export default CreateLocation
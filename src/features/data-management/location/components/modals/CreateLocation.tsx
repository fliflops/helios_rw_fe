import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogPanel } from '@/components/Dialog';
import { Button } from '@/components/ui/button';
import { Form, FormField } from '@/components/ui/form';
import FormInput from '@/components/form/FormInput';
import { useForm } from 'react-hook-form';
import FormCheckbox from '@/components/form/FormCheckbox';
import { useCreateLocationMutation } from '@/lib/redux/api/location.api';
import { toast } from 'react-toastify';
import { createLocationSchema, createLocationType } from '../../types';
import { zodResolver } from '@hookform/resolvers/zod';


interface CreateLocationProps {
    onClose: () => void;
    isOpen: boolean;
}

const CreateLocation: React.FC<CreateLocationProps> = (props) => {
    const [onCreate, { isLoading }] = useCreateLocationMutation();

    const form = useForm<createLocationType>({
        resolver: zodResolver(createLocationSchema),
        defaultValues: {
            loc_code: '',
            loc_name: '',
            is_active: true
        }
    })

    const handleSubmit = async (values: createLocationType) => {
        await onCreate({
            loc_name: values.loc_name,
            loc_code: values.loc_code,
            is_active: values.is_active
        })
            .unwrap()
            .then(() => {
                form.reset({
                    loc_code: '',
                    loc_name: '',
                    is_active: true
                })

                toast.success('Location Created')
            })
    }

    return (
        <Dialog open={props.isOpen} onClose={() => { }}>
            <DialogPanel>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)}>
                        <Card>
                            <CardHeader>
                                <CardTitle>Create Location</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className='grid grid-cols-1 gap-4'>
                                    <FormInput
                                        control={form.control}
                                        name='loc_name'
                                        label='Location'
                                        placeholder='Location'
                                    />
                                    <FormInput
                                        control={form.control}
                                        name='loc_code'
                                        label='Code'
                                        placeholder='Code'
                                    />
                                    <FormField
                                        control={form.control}
                                        name='is_active'
                                        render={({ field }) => (
                                            <FormCheckbox label='Is Active' checked={field.value} onCheckedChange={field.onChange} />
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
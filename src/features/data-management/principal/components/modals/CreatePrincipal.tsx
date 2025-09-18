import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogPanel } from '@/components/Dialog';
import { Button } from '@/components/ui/button';
import { Form, FormField } from '@/components/ui/form';
import FormInput from '@/components/form/FormInput';
import { useForm } from 'react-hook-form';
import FormCheckbox from '@/components/form/FormCheckbox';
import { useCreatePrincipalMutation } from '@/lib/redux/api/principal.api';
import { toast } from 'react-toastify';
import { zodResolver } from '@hookform/resolvers/zod';
import { createPrincipalSchema, createPrincipalType } from '../../types';


interface CreatePrincipalProps {
    onClose: () => void;
    isOpen: boolean;
}

const defaultValues = {
    customer_desc: '',
    customer_code: '',
    customer_name: '',
    customer_address: '',
    is_active: true,
    city: '',
    state: '',
    country: '',
    postal_code: '',
};

const CreatePrincipal: React.FC<CreatePrincipalProps> = (props) => {
    const [onCreate, { isLoading }] = useCreatePrincipalMutation();

    const form = useForm<createPrincipalType>({
        resolver: zodResolver(createPrincipalSchema),
        defaultValues,
    })

    const handleSubmit = async (values: createPrincipalType) => {
        if (!isLoading) {
            await onCreate(values)
            .unwrap()
            .then(() => {
                form.reset(defaultValues)

                toast.success('Principal Created')
            })
        }
    }

    return (
        <Dialog open={props.isOpen} onClose={() => { }}>
            <DialogPanel>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)}>
                        <Card>
                            <CardHeader>
                                <CardTitle>Create Principal</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className='grid grid-cols-1 gap-2'>
                                    <FormField
                                        control={form.control}
                                        name='customer_code'
                                        render={({ field }) => (
                                            <FormInput {...field} label='ID' placeholder='ID / Code' />
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name='customer_name'
                                        render={({ field }) => (
                                            <FormInput {...field} label='Name' placeholder='Name' />
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name='customer_desc'
                                        render={({ field }) => (
                                            <FormInput {...field} label='Description' placeholder='Description' />
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name='customer_address'
                                        render={({ field }) => (
                                            <FormInput {...field} label='Address' placeholder='Address' />
                                        )}
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

export default CreatePrincipal
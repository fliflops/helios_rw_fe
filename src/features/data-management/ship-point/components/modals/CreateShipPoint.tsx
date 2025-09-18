import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogPanel } from '@/components/Dialog';
import { Button } from '@/components/ui/button';
import { Form, FormField } from '@/components/ui/form';
import FormInput from '@/components/form/FormInput';
import { useForm } from 'react-hook-form';
import FormCheckbox from '@/components/form/FormCheckbox';
import { useCreateShipPointMutation } from '@/lib/redux/api/ship-point.api';
import { toast } from 'react-toastify';
import { zodResolver } from '@hookform/resolvers/zod';
import { createShipPointSchema, createShipPointType } from '../../types';


interface CreateShipPointProps {
    onClose: () => void;
    isOpen: boolean;
}

const defaultValues = {
    ship_point_desc: '',
    ship_point_code: '',
    ship_point_address: '',
    city: '',
    state: '',
    country: '',
    ship_pt_zone: '',
    postal_code: '',
    is_active: true
};

const CreateShipPoint: React.FC<CreateShipPointProps> = (props) => {
    const [onCreate, { isLoading }] = useCreateShipPointMutation();

    const form = useForm<createShipPointType>({
        resolver: zodResolver(createShipPointSchema),
        defaultValues,
    })

    const handleSubmit = async (values: createShipPointType) => {
        await onCreate({
            ship_point_desc: values.ship_point_desc,
            ship_point_code: values.ship_point_code,
            ship_point_address: values.ship_point_address,
            city: values.city,
            state: values.state,
            country: values.country,
            ship_pt_zone: values.ship_pt_zone,
            postal_code: values.postal_code,
            is_active: values.is_active
        })
            .unwrap()
            .then(() => {
                form.reset(defaultValues)

                toast.success('Ship Point Created')
            })
    }

    return (
        <Dialog open={props.isOpen} onClose={() => { }}>
            <DialogPanel>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)}>
                        <Card>
                            <CardHeader>
                                <CardTitle>Create Ship Point</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className='grid grid-cols-1 gap-2'>
                                    <FormField
                                        control={form.control}
                                        name='ship_point_code'
                                        render={({ field }) => (
                                            <FormInput {...field} label='Ship Point ID' placeholder='Ship Point ID' />
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name='ship_point_desc'
                                        render={({ field }) => (
                                            <FormInput {...field} label='Description' placeholder='Description' />
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name='ship_point_address'
                                        render={({ field }) => (
                                            <FormInput {...field} label='Address' placeholder='Address' />
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name='ship_pt_zone'
                                        render={({ field }) => (
                                            <FormInput {...field} label='Ship Point Zone' placeholder='Ship Point Zone' />
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

export default CreateShipPoint
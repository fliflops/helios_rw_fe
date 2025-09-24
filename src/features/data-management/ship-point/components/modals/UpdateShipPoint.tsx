import React from 'react'
import { Dialog, DialogPanel } from '@/components/Dialog';
import { Button } from '@/components/ui/button';
import { CardContent, CardHeader, Card, CardFooter, CardTitle } from '@/components/ui/card';
import { useLazyGetShipPointQuery } from '@/lib/redux/api/ship-point.api';
import { useForm } from 'react-hook-form';
import { Form, FormField } from '@/components/ui/form';
import FormAppLabel from '@/components/form/FormLabel';
import FormCheckbox from '@/components/form/FormCheckbox';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateShipPointSchema, updateShipPointType } from '../../types';


interface UpdateShipPointProps {
    onClose: () => void;
    isOpen: boolean;
    id: string;
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
}

const UpdateShipPoint: React.FC<UpdateShipPointProps> = (props) => {
    const [getShipPoint, getShipPointProps] = useLazyGetShipPointQuery();
    const form = useForm<updateShipPointType>({
        resolver: zodResolver(updateShipPointSchema),
        defaultValues
    })

    const handleSubmit = async () => {

    }

    React.useEffect(() => {
        getShipPoint(props.id as string)
            .unwrap()
            .then(result => {
                form.reset({
                    ...defaultValues,
                    ...result,
                })
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.id])

    return <Dialog open={props.isOpen} onClose={props.onClose}>
        <DialogPanel className='max-w-2xl'>
            <Form {...form}>
                <Card>
                    <CardHeader>
                        <CardTitle>Update Ship Point</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {getShipPointProps.isLoading ? '...Loading' :
                            <form className='flex flex-col gap-4' onSubmit={form.handleSubmit(handleSubmit)}>
                                <div className='grid grid-cols-2'>
                                    <FormField
                                        control={form.control}
                                        name='ship_point_code'
                                        render={({ field }) => <FormAppLabel label='Ship Point ID' value={field.value} />}
                                    />
                                    <FormField
                                        control={form.control}
                                        name='ship_point_desc'
                                        render={({ field }) => <FormAppLabel label='Description' value={field.value} />}
                                    />
                                    <FormField
                                        control={form.control}
                                        name='is_active'
                                        render={({ field }) => <FormCheckbox label='Is Active' checked={field.value} onCheckedChange={field.onChange} />}
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

export default UpdateShipPoint
import React from 'react'
import { Dialog, DialogPanel } from '@/components/Dialog';
import { Button } from '@/components/ui/button';
import { CardContent, CardHeader, Card, CardFooter, CardTitle } from '@/components/ui/card';
import { useLazyGetPrincipalQuery } from '@/lib/redux/api/principal.api';
import { useForm } from 'react-hook-form';
import { Form, FormField } from '@/components/ui/form';
import FormAppLabel from '@/components/form/FormLabel';
import FormCheckbox from '@/components/form/FormCheckbox';
import { zodResolver } from '@hookform/resolvers/zod';
import { updatePrincipalSchema, updatePrincipalType } from '../../types';


interface UpdatePrincipalProps {
    onClose: () => void;
    isOpen: boolean;
    id: string;
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
    postal_code: ''
}

const UpdatePrincipal: React.FC<UpdatePrincipalProps> = (props) => {
    const [getPrincipal, getPrincipalProps] = useLazyGetPrincipalQuery();
    const form = useForm<updatePrincipalType>({
        resolver: zodResolver(updatePrincipalSchema),
        defaultValues
    })

    const handleSubmit = async() => {

    }
    
    React.useEffect(() => {
        getPrincipal(props.id as string)
        .unwrap()
        .then(result => {
            form.reset({
                ...defaultValues,
                ...result
            })
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[props.id])
    
    return <Dialog open={props.isOpen} onClose={props.onClose}>
        <DialogPanel className='max-w-2xl'>
            <Form {...form}>
            <Card>
                <CardHeader>
                    <CardTitle>Update Principal</CardTitle>
                </CardHeader>
                <CardContent>
                        {getPrincipalProps.isLoading ? '...Loading' : 
                            <form className='flex flex-col gap-4' onSubmit={form.handleSubmit(handleSubmit)}>
                                <div className='grid grid-cols-2'>
                                    <FormField
                                        control={form.control}
                                        name='customer_code'
                                        render={({field}) => <FormAppLabel label='ID' value={field.value}/>}
                                    />
                                    <FormField
                                        control={form.control}
                                        name='customer_name'
                                        render={({field}) => <FormAppLabel label='Name' value={field.value}/>}
                                    />
                                    <FormField
                                        control={form.control}
                                        name='customer_desc'
                                        render={({field}) => <FormAppLabel label='Description' value={field.value ?? ''}/>}
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

export default UpdatePrincipal
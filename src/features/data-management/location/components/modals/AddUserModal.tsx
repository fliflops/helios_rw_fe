import React from 'react'
import { Button } from '@/components/ui/button';
import { CardContent, CardHeader, Card, CardFooter, CardTitle } from '@/components/ui/card';
import { Dialog, DialogPanel } from '@/components/Dialog';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form, FormField } from '@/components/ui/form';

import * as yup from 'yup';
import FormAPISelect from '@/components/form/FormAPISelect';
import FormCheckbox from '@/components/form/FormCheckbox';

interface AddUserModalProps {
    onClose: () => void;
    isOpen: boolean;
    addtoTable: (data: {
        fk_user_id: string;
        email: string;
        is_active: boolean;
    }) => void;
}

const addUserSchema = yup.object({
    email: yup.object({
        label: yup.string(),
        value: yup.string()
    }).required().nullable(),
    is_active: yup.boolean()
})

type addUserType = yup.InferType<typeof addUserSchema>

const AddUserModal: React.FC<AddUserModalProps> = (props) => {
    const form = useForm<addUserType>({
       resolver: yupResolver(addUserSchema),
       defaultValues: {
        email: null,
        is_active: true
       } 
    });

    const handleAdd = (values: addUserType) => {
        props.addtoTable({
            fk_user_id: values.email?.value as string,
            email: values.email?.label as string,
            is_active: values.is_active as boolean
        })

        form.reset({
            email:null,
            is_active:true
        })
    }

    return(
        <Dialog open={props.isOpen} onClose={props.onClose}>
            <DialogPanel>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleAdd)}> 
                        <Card>
                            <CardHeader>
                                <CardTitle>Add User</CardTitle>
                            </CardHeader>
                            <CardContent className='flex flex-col gap-2'>
                                <FormAPISelect control={form.control} name='email' type='user' label='Email' placeholder='Select Email'/>
                                <FormField
                                    control={form.control}
                                    name='is_active'
                                    render={({field}) => (<FormCheckbox label='Is Active' checked={field.value} onCheckedChange={field.onChange}/>)}
                                />
                            </CardContent>
                            <CardFooter className='flex justify-between'>
                                <Button type='button' variant={'destructive'} onClick={props.onClose}>Close</Button>
                                <Button type='submit'>Save</Button>
                            </CardFooter>
                        </Card>   
                    </form>
                </Form>
                
            </DialogPanel>
        </Dialog>
    )
}

export default AddUserModal
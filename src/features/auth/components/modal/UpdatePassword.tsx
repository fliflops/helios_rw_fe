import { Dialog,DialogPanel } from '@/components/Dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormField } from '@/components/ui/form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormInput from '@/components/form/FormInput';

import React from 'react'
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useUpdatePasswordMutation } from '@/lib/redux/api/user.api';
import { useAppSelector } from '@/hooks/redux.hooks';
import { getSession } from '@/lib/redux/slices/auth.slice';
import { toast } from 'react-toastify';

interface UpdatePasswordProps {
    onClose: () => void;
    isOpen: boolean;
}

const updatePasswordSchema = yup.object({
    old_password: yup.string().required('Password is Required'),
    new_password: yup.string().required('Please provide your new password'),
    confirm_password: yup.string()
    .required('Please re-type your password')
    .oneOf([yup.ref('new_password')], 'Password must match')
})

type updatePasswordType = yup.InferType<typeof updatePasswordSchema>

const UpdatePassword: React.FC<UpdatePasswordProps> = (props) => {
    const auth = useAppSelector(getSession);
    const [updatePassword, updatePasswordProps] = useUpdatePasswordMutation();
    const form = useForm<updatePasswordType>({
        resolver: yupResolver(updatePasswordSchema),
        defaultValues:{
            old_password:'',
            new_password:'',
            confirm_password:''
        }
    });

    const handleSubmit = async (values:updatePasswordType) => {
        await updatePassword({
            username: auth.email as string,
            old_password: values.old_password,
            new_password: values.new_password
        })
        .unwrap()
        .then(() => {
            toast.success('Password Updated')
        })
    }
    
    return (
        <Dialog open={props.isOpen} onClose={()=>{}}>
             <DialogPanel>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)}>
               
                    <Card>
                        <CardHeader>
                            <CardTitle>Update Password</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className='grid gap-2'>
                                <FormField
                                    control={form.control}
                                    name='old_password'
                                    render={({field}) => (
                                        <FormInput {...field} label='Old Password' placeholder='Old Password' type='password'/>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name='new_password'
                                    render={({field}) => (
                                        <FormInput {...field} label='New Password' placeholder='New Password' type='password'/>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name='confirm_password'
                                    render={({field}) => (
                                        <FormInput {...field} label='Confirm Password' placeholder='Confirm Password' type='password'/>
                                    )}
                                />
                            </div>
                        </CardContent>
                        <CardFooter className='flex justify-between'>
                            <Button type ='button' variant={'destructive'} onClick={props.onClose}>Close</Button>
                            <Button type='submit' isLoading={updatePasswordProps.isLoading}>Confirm</Button>
                        </CardFooter>
                    </Card>
                </form>
            </Form>
            </DialogPanel>
        </Dialog>
    );
}

export default UpdatePassword
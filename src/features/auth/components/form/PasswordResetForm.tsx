import React from 'react'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {Input} from '@/components/ui/input';

import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/hooks/redux.hooks';
import { setLogOut } from '@/lib/redux/slices/auth.slice';
import { useAuthPasswordUpdateMutation, updatePasswordType } from '@/lib/redux/api/auth.api';
import { toast } from 'react-toastify';


interface PasswordResetFormProps {
    type: updatePasswordType['status'] 
}

const passwordResetSchema = yup.object({
    old_password: yup.string().required('Required'),
    new_password: yup.string().min(8,'Must Contain 8 Characters').required('Required')
    .matches(
        /^(?=.*[a-z])/,
        " Must Contain One Lowercase Character"
    )
    .matches(
        /^(?=.*[A-Z])/,
        "Must Contain One Uppercase Character"
    )
    .matches(
        /^(?=.*[0-9])/,
        "Must Contain One Number Character"
    )
    .matches(
        // eslint-disable-next-line no-useless-escape
        /^(?=.*[!@#\$%\^&\*])/,
        "Must Contain  One Special Case Character"
    ),
    confirm_password: yup.string().oneOf([yup.ref('new_password'),''], 'Password not match!').required('Required')
})

type passwordResetSchemaType = yup.InferType<typeof passwordResetSchema>

 
const PasswordResetForm: React.FC<PasswordResetFormProps> = (props) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [updatePassword, {isLoading}] = useAuthPasswordUpdateMutation();

    const form = useForm<passwordResetSchemaType>({
        resolver: yupResolver(passwordResetSchema),
        defaultValues: {
            old_password:'',
            new_password:'',
            confirm_password:''
        }
    })

    const handleSubmit = async (values: passwordResetSchemaType) => {
        await updatePassword({
            status: props.type,
            old_password: values.old_password,
            new_password: values.new_password
        })
        .unwrap()
        .then(() => {
            toast.success('Success!')
            handleBack();
        })
    }

    const handleBack = () => {
        dispatch(setLogOut())
        navigate('/login', {
            replace:true
        });
    }
    
    return <div className='flex flex-col w-72'>
        <div>
            <Button disabled={isLoading} className='p-0 text-gray-600' variant={'link'} onClick={handleBack}>Back</Button>
        </div>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
            <Form {...form}>
                <div className='flex flex-col gap-2'>
                    <FormField
                        control={form.control}
                        name='old_password'
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Old Password</FormLabel>
                                <FormControl>
                                    <Input className='bg-inherit' placeholder='Password' type='password' {...field}/>
                                </FormControl>
                                <FormMessage className='text-xs'/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name='new_password'
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>New Password</FormLabel>
                                <FormControl>
                                    <Input className='bg-inherit' placeholder='Password' type='password' {...field}/>
                                </FormControl>
                                <FormMessage className='text-xs'/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name='confirm_password'
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input className='bg-inherit' placeholder='Password' type='password' {...field}/>
                                </FormControl>
                                <FormMessage className='text-xs'/>
                            </FormItem>
                        )}
                    />
                </div>
                <div className='flex justify-end mt-3'>
                    <Button type='submit' isLoading={isLoading}>Confirm</Button>
                </div>
            </Form>
        </form>
    </div>;
}

export default PasswordResetForm
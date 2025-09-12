import { Dialog, DialogPanel } from '@/components/Dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormField } from '@/components/ui/form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormInput from '@/components/form/FormInput';
import React from 'react'
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useCreateUserMutation } from '@/lib/redux/api/user.api';
import FormAPISelect from '@/components/form/FormAPISelect';
import { toast } from 'react-toastify';


interface CreateUserProps {
    onClose: () => void;
    isOpen: boolean;
}


const createUserSchema = yup.object({
    email: yup.string().email('Invalid Format').required('Required'),
    first_name: yup.string().required('Required'),
    last_name: yup.string().required('Required'),
    role: yup.object({
        label: yup.string().required(),
        value: yup.string().required()
    }).nullable().notOneOf([null],'Role is required'),
})

type createUserType = yup.InferType<typeof createUserSchema>


const CreateUser: React.FC<CreateUserProps> = (props) => {
    const [createUser, createUserProps] = useCreateUserMutation();
    const form = useForm<createUserType>({
        resolver: yupResolver(createUserSchema),
        defaultValues: {
            email:'',
            first_name:'',
            last_name:'',
            role: null
        }
    })   

    const handleSubmit = async (data:createUserType ) => {
        console.log(data)
        await createUser({
            email: data.email, 
            first_name:data.first_name,
            last_name:data.last_name,
            role_id: data.role?.value as string
        })
        .unwrap()
        .then(() => {
            toast.success('User Created')
        })

        form.reset({
            email:'',
            first_name:'',
            last_name:'',
            role: null
        })
    }


    return (
      <Dialog open={props.isOpen} onClose={()=>{}}>
        <DialogPanel>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Create User</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className='grid grid-cols-1 gap-2'>
                                <FormField
                                    control={form.control}
                                    name='email'
                                    render={({field}) => (
                                        <FormInput {...field} label='Email' placeholder='Email' type='email'/>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name='first_name'
                                    render={({field}) => (
                                        <FormInput {...field} label='First Name' placeholder='First Name'/>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name='last_name'
                                    render={({field}) => (
                                        <FormInput {...field} label='Last Name' placeholder='Last Name'/>
                                    )}
                                />
                                
                                <FormAPISelect
                                    control={form.control}
                                    name='role'
                                    type='role'
                                    label='Role'
                                    placeholder='Role'
                                />
                                
                            </div>
                        </CardContent>
                        <CardFooter className='flex justify-between'>
                            <Button onClick={props.onClose} variant={'destructive'} type='button' disabled={createUserProps.isLoading}>Close</Button>
                            <Button type='submit' isLoading={createUserProps.isLoading}>Save</Button>
                        </CardFooter>
                    </Card>
                </form>
            </Form>
        </DialogPanel>
      </Dialog>
    );
}

export default CreateUser
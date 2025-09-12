import FormCheckbox from '@/components/form/FormCheckbox';
import FormInput from '@/components/form/FormInput';
import { Form, FormField } from '@/components/ui/form';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import RoleRoutesTable from '../components/table/RoleRoutesTable';
import { useCreateRoleMutation} from '@/lib/redux/api/role.api';
import {roleCreateType, roleSubModuleTypes} from '../types'
import {roleCreateSchema} from '../validations'
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';
import modules from '@/lib/router.modules';

interface RoleCreateProps {

}




const RoleCreate: React.FC<RoleCreateProps> = () => {
    // const {data=[],...routeProps} = useGetRoutesQuery();
    const [createRole, createRoleProps] = useCreateRoleMutation();
    
    const form = useForm<roleCreateType>({
        resolver: yupResolver(roleCreateSchema),
        defaultValues:{
            role_name: '',
            is_active: true,
            is_admin: false,
            modules:[]
        }
    })
    
    const {fields,update} = useFieldArray({
        control: form.control,
        name:'modules'
    })

    const handleModuleChange = (event :{id:string, field: string, value: boolean} ) => {
        const index = fields.map(i => i.id).indexOf(event.id); 
        update(index, {
            ...fields[index],
            [event.field]: event.value
        })
    }

    const handleSave = async (values: roleCreateType) => {
        await createRole(values).unwrap().then(() => {
            handleResetModules();
            toast.success('Role Created!')
        })
    }

    const handleResetModules = () => {

        let tempModules:roleSubModuleTypes  = [];
        modules.forEach(header => {
            tempModules = tempModules.concat( header.modules.map(item => ({
                id: '',
                header_key: header.header_id,
                module_key: item.module_key,
                module_name: item.module_name,
                view: false,
                create: false,
                edit: false,
                export: false

            })))

        })
        
        form.reset({
            role_name: '',
            is_active: true,
            is_admin: false,
            modules: tempModules
        })
    }

    React.useEffect(() => {
       handleResetModules();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    
    return <div>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSave)}>   
                <div className='grid grid-cols-5 gap-x-10 gap-y-2'>
                    <div className='flex flex-col gap-3 col-span-1'>
                        <h3>Information</h3>
                        <div className='flex flex-col gap-3'>
                            <FormField
                                control={form.control}
                                name='role_name'
                                render={({field}) => (
                                    <FormInput {...field} label='Role Name' placeholder='Role Name'/>
                                )}
                            />
                            <FormField
                                control = {form.control}
                                name='is_active'
                                render={({field}) => (
                                    <FormCheckbox label='Is Active?' checked={field.value} onCheckedChange={field.onChange}/>
                                )}
                            />

                            <FormField
                                control = {form.control}
                                name='is_admin'
                                render={({field}) => (
                                    <FormCheckbox label='Is Admin?' checked={field.value} onCheckedChange={field.onChange}/>
                                )}
                            />
                        </div>
                    </div>
                    <div className='grid grid-cols-1 col-span-4 gap-5'>
                        {
                            modules.map(header => (
                                <div key={header.header_id} className='flex flex-col gap-3 col-span-4'>
                                    <h3>{header.header_label}</h3>
                                    <RoleRoutesTable
                                        data={fields.filter(item => item.header_key === header.header_id)}
                                        //data={field[].filter(item => item.header_key === header.header_id)}
                                        handleChange={handleModuleChange}
                                    />
                                </div>
                            ))
                        }
                    </div>
                   
                    <div className='flex justify-end col-span-5'>
                        <Button type='submit' isLoading={createRoleProps.isLoading}>Submit</Button>
                    </div>
                </div>
            </form>
        </Form>
    </div>;
}

export default RoleCreate
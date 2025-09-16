import React from 'react';
import { useForm } from 'react-hook-form';
import {filterFormValues, filterFormSchema} from '../../validations'
import {zodResolver} from '@hookform/resolvers/zod'
import {Form} from '@/components/ui/form';
import FormAPISelect from '@/components/form/FormAPISelect';
import FormInput from '@/components/form/FormInput';
import FormStatusSelect from '@/components/form/FormStatusSelect';
import FormDateRangePicker from '@/components/form/FormDateRangePicker';
import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/hooks/redux.hooks';
import { getViewPODFilters, setViewPODFilter } from '@/lib/redux/slices/filter.slice';
import moment from 'moment';

interface PODFilterFormProps {

}

const PODFilterForm: React.FC<PODFilterFormProps> = () => {
    const dispatch = useAppDispatch();
    const podFilters = useAppSelector(getViewPODFilters)
    const form = useForm<filterFormValues>({
        resolver: zodResolver(filterFormSchema),
        defaultValues:{
            search:'',
            trip_number:'',
            location:   null,
            ship_point: null,
            principal:  null,
            delivery_status: null,
            rud_status: null,
            pod_status: null,
            delivery_date: {
                from: new Date(),
                to: new Date()
            }
        }
    })

 
    const onSubmit = (values: filterFormValues) => {
        dispatch(setViewPODFilter({
            ...values,
            delivery_date: {
                from: moment(values.delivery_date?.from).format('YYYY-MM-DD'),
                to: moment(values.delivery_date?.to).format('YYYY-MM-DD')
            }
        }))
    }   

    React.useEffect(() => {
        form.reset({
            ...podFilters,
            delivery_date: podFilters.delivery_date ? {
                from: new Date(podFilters.delivery_date.from),
                to: new Date(podFilters.delivery_date.to)
            } : undefined
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
        <Form {...form}>
            <div className='grid grid-cols-4 grid-rows-3 gap-2'>
                <FormAPISelect
                    name='location'
                    label='Location'
                    placeholder='Location'
                    type='user-location'
                    control={form.control}
                />

                <FormAPISelect
                    name='ship_point'
                    label='Ship Point'
                    placeholder='Ship Point'
                    type='ship-point'
                    control={form.control}
                />

                <FormAPISelect
                    name='principal'
                    label='Principal'
                    placeholder='Principal'
                    type='principal'
                    control={form.control}
                />

                <FormInput
                    control = {form.control}
                    name='trip_number'
                    label='Trip Number' 
                    placeholder='Trip Number'
            
                />

                <FormStatusSelect
                    control={form.control}
                    name='delivery_status'
                    type='delivery_status'
                    placeholder='Delivery Status'
                    label='Delivery Status'
                />

                <FormStatusSelect
                    control={form.control}
                    name='rud_status'
                    type='rud_status'
                    placeholder='RUD Status'
                    label='RUD Status'
                />

                <FormDateRangePicker
                    control={form.control}
                    name='delivery_date'
                    label='Delivery Date'
                />
                <div className='col-span-full'>
                    <Button type='submit'>Filter</Button>
                </div>
            </div>
        </Form>
        
    </form>
    );
}

export default PODFilterForm
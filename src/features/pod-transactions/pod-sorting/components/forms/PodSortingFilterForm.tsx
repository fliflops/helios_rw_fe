import FormDateRangePicker from '@/components/form/FormDateRangePicker';
import { Form } from '@/components/ui/form';
import React from 'react'
import { useForm } from 'react-hook-form'
import { sortingFilterSchema, sortingFilterType } from '../../validations';
import { zodResolver } from '@hookform/resolvers/zod';
import FormAPISelect from '@/components/form/FormAPISelect';
import { Button } from '@/components/ui/button';
import { useLazyGetSortedInvoiceCountQuery } from '@/lib/redux/api/pod-sorting.api';
import moment from 'moment';

const defaultValues: sortingFilterType = {
    delivery_date: null,
    location:null,
    principal: null,
    service_type: null,
    ship_to: null
}

const PodSortingFilterForm = () => {
    const [getCount, getCountProps] = useLazyGetSortedInvoiceCountQuery();
    const form = useForm<sortingFilterType>(
        {
            resolver: zodResolver(sortingFilterSchema),
            defaultValues
        }
    );

    const [result, setResult] = React.useState<number>(0)

    const handleSubmit = async(values: sortingFilterType) => {
        await getCount({
            service_type: values.service_type?.value as string,
            location_code: values.location?.value as string,
            principal: values.principal?.value as string,
            delivery_date_from: moment(values.delivery_date?.from).format('YYYY-MM-DD') as string,
            delivery_date_to: moment(values.delivery_date?.to).format('YYYY-MM-DD') as string,
            ship_to_code: values.ship_to?.value as string 
        })
        .unwrap()
        .then(result => {
            setResult(result.invoice_count)
        })
    }

    return (
        <form onSubmit={form.handleSubmit(handleSubmit)}>
            <Form {...form}>
                <div className='grid grid-cols-2 gap-5 border p-5 rounded-sm'>
                    <div className='col-span-2 flex gap-2'> 
                        <FormDateRangePicker
                        control={form.control}
                        name='delivery_date'
                        label='Delivery Date'
                        />

                        <div className='flex flex-1 justify-end items-center'>
                            <label>Total Invoices: {result}</label>
                        </div>
                    </div>
                    
                    <FormAPISelect
                        type='user-location'
                        control={form.control}
                        name='location'
                        label='Location'
                        placeholder='Location'
                    />

                    <FormAPISelect
                        type='principal'
                        control={form.control}
                        name='principal'
                        label='Principal'
                        placeholder='Principal'
                    />

                    <FormAPISelect
                        type='service-type'
                        control={form.control}
                        name='service_type'
                        label='Service Type'
                        placeholder='Service Type'
                    />
                    <FormAPISelect
                        type='ship-point'
                        control={form.control}
                        name='ship_to'
                        label='Ship To'
                        placeholder='Ship To'
                    />

                    <div className='flex justify-end col-span-2 gap-2'>
                        <Button type='submit' isLoading={getCountProps.isLoading}>Confirm</Button>
                        <Button type='button' variant={'outline'} >Next</Button>
                    </div>
                </div>
            </Form>
        </form>
    )
}

export default PodSortingFilterForm
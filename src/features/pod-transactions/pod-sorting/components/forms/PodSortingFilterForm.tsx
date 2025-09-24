import FormDateRangePicker from '@/components/form/FormDateRangePicker';
import { Form } from '@/components/ui/form';
import React from 'react'
import { useForm } from 'react-hook-form'
import { sortingFilterSchema, sortingFilterType } from '../../validations';
import { zodResolver } from '@hookform/resolvers/zod';
import FormAPISelect from '@/components/form/FormAPISelect';
import { Button } from '@/components/ui/button';
import { useCreateSortingSessionMutation, useLazyGetSortedInvoiceCountQuery } from '@/lib/redux/api/pod-sorting.api';
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
    const [createSortingSession, createSortingSessionProps] = useCreateSortingSessionMutation();
    const form = useForm<sortingFilterType>(
        {
            resolver: zodResolver(sortingFilterSchema),
            defaultValues
        }
    );

    const [isDisabled, setDisable] = React.useState<boolean>(false)

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

    const handleCancel = () => {
        form.reset(defaultValues)
        setResult(0)
    }

    const handleCreate = async() => {
        const values = form.getValues();
        await createSortingSession({
             service_type: values.service_type?.value as string,
            location_code: values.location?.value as string,
            principal: values.principal?.value as string,
            delivery_date_from: moment(values.delivery_date?.from).format('YYYY-MM-DD') as string,
            delivery_date_to: moment(values.delivery_date?.to).format('YYYY-MM-DD') as string,
            ship_to_code: values.ship_to?.value as string 
        })
        // .then(() => {
        //     navigate('/pod-sorting/assign-barcode',{replace:true})
        // })
    }

   


    React.useEffect(() => {
        if(result > 1) setDisable(true);
        else setDisable(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isDisabled,result])

    return (
        <form className='flex flex-col gap-5 border border-spacing-1 rounded-sm p-5' onSubmit={form.handleSubmit(handleSubmit)}>
            <Form {...form}>
                <div className={`grid grid-cols-2 gap-5 ${isDisabled ? 'pointer-events-none opacity-50' : ''}`}>
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
                        disabled
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
                </div>
                <div className='flex justify-between col-span-2 gap-2'>
                        <Button type='button' variant={'destructive'} onClick={handleCancel}>Cancel</Button>
                        <div className='flex gap-2'>
                            <Button type='submit' isLoading={getCountProps.isLoading} disabled={isDisabled}>Confirm</Button>
                            <Button type='button' disabled={!isDisabled} isLoading={createSortingSessionProps.isLoading} onClick={handleCreate}>Next</Button>
                        </div>  
                </div>
            </Form>
        </form>
    )
}

export default PodSortingFilterForm
import { useForm } from "react-hook-form"
import { barcodeFilterSchema, barcodeFilterType } from "../../validations"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from '@/components/ui/form';
import FormAPISelect from "@/components/form/FormAPISelect";
import FormStatusSelect from "@/components/form/FormStatusSelect";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hooks";
import { getViewBarcodeFilters, setViewBarcodeFilter } from "@/lib/redux/slices/filter.slice";
import React from 'react';

const defaultValues: barcodeFilterType = {
    location: null,
    is_assigned: null
}

const BarcodeFilterForm  = () => {
    const dispatch = useAppDispatch();
    const barcodeFilters = useAppSelector(getViewBarcodeFilters);
    const form = useForm<barcodeFilterType>({
        resolver: zodResolver(barcodeFilterSchema),
        defaultValues
    })    

    const handleSubmit = (values:barcodeFilterType) => {
        dispatch(setViewBarcodeFilter(values))
    }

    React.useEffect(() => {
        form.reset(barcodeFilters)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (<Form {...form}>
        <form className="grid grid-cols-4 gap-2" onSubmit={form.handleSubmit(handleSubmit)}> 
            <FormAPISelect
                label='Location'
                type='user-location'
                control={form.control}
                name='location'
                placeholder='Location'
            />

            <FormStatusSelect
                label='Is Assigned'
                type="boolean_status"
                name="is_assigned"
                placeholder="Is Assigned?"
            />
            <div className="flex items-end">
                 <Button type="submit">Filter</Button>
            </div>
        </form>
    </Form>)
}

export default BarcodeFilterForm
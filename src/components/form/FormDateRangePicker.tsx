import DateRangePicker from '@/components/inputs/DateRangePicker';
import { FieldValues, useController, UseControllerProps } from 'react-hook-form';
import { FormControl, FormItem, FormLabel } from '../ui/form';

type FormDateRangePickerProps<T extends FieldValues> = UseControllerProps<T> & {
    label: string;
}

const FormDateRangePicker = <T extends FieldValues>({label,...props}: FormDateRangePickerProps<T>) => {
    const {field, fieldState} = useController<T>({
        ...props
    })
    
    return (
        <FormItem className="flex flex-col gap-0">
            <FormLabel className={`font-semibold font-sans ${fieldState.error ? 'text-red-500' : ''}`}>{label}</FormLabel>
            <FormControl>
                <DateRangePicker
                    dateRange={field.value}
                    onSelect={(selected) => field.onChange(selected)}
                />
            </FormControl>
        </FormItem>
    )
}

export default FormDateRangePicker
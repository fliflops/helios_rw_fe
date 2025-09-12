import StatusSelect from '@/components/select/status/StatusSelect'
import { FieldValues, useController, UseControllerProps } from 'react-hook-form';
import { statusType } from '../select/status/data';
import { FormItem, FormLabel, FormControl } from '../ui/form';


type FormStatusSelectProps<T extends FieldValues> = UseControllerProps<T> & {
    type: keyof statusType
    label:string;
    placeholder: string
}

const FormStatusSelect = <T extends FieldValues>({label,placeholder,type,...props}: FormStatusSelectProps<T>)=> {
    const {field,fieldState} = useController<T>({
        ...props
    })  
        
    return (
        <FormItem className="flex flex-col gap-0">
            <FormLabel className={`font-semibold font-sans ${fieldState.error ? 'text-red-500' : ''}`}>
                {label}
            </FormLabel>
            <FormControl>
                <StatusSelect
                    type={type}
                    value={field.value}
                    placeholder={placeholder}
                    onChange={(e) => field.onChange(e)}
                    isClearable
                />
            </FormControl>            
        </FormItem>
    );
}

export default FormStatusSelect

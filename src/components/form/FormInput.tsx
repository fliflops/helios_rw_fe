import { FormControl,FormItem, FormLabel, FormMessage } from "../ui/form"
import { FieldValues, useController, UseControllerProps } from "react-hook-form"
import { Input } from "../ui/input"


type FormInput<T extends FieldValues> = UseControllerProps<T> &{
    label: string;
    type?: string;
    placeholder?:string;
}


const FormInput = <T extends FieldValues>({label,type,placeholder,...props}: FormInput<T>) => {
    const {field, fieldState} = useController<T>({
        ...props
    })

    return (
        <FormItem className="flex flex-col gap-0">
            <FormLabel className={`font-semibold font-sans ${fieldState.error ? 'text-red-500' : ''}`}>{label}</FormLabel>
            <FormControl>
                <Input
                    name={field.name}
                    onChange={(e) => field.onChange(e.target.value)}
                    placeholder={placeholder}
                    value={field.value}
                    type={type}
                />
            </FormControl>
            <FormMessage className='text-xs'/>
        </FormItem>
         
    )
}



FormInput.displayName = 'FromInput'

export default FormInput
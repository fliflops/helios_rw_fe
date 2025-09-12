
import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import {Checkbox} from '@/components/ui/checkbox';
import { cn } from "@/lib/utils"
import { FormControl, FormItem, FormLabel, FormMessage } from "../ui/form";


interface formCheckbox {
    label: string;
}

const FormCheckbox = React.forwardRef<React.ElementRef<typeof CheckboxPrimitive.Root>,(React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & formCheckbox)>(({label,className,...props}, ref) => (
    <FormItem className="flex flex-col gap-0">
        <FormLabel className="font-semibold font-sans" >{label}</FormLabel>
        <FormControl>
            <Checkbox
                ref={ref}
                className={cn(className)}
                {...props}
            />
        </FormControl>
        <FormMessage className="text-xs"/>
    </FormItem>
)) 


FormCheckbox.displayName = 'FormCheckbox';
export default FormCheckbox;



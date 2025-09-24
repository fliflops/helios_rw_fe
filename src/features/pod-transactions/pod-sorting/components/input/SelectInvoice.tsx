import { useGetInvoiceMutation } from '@/lib/redux/api/pod-sorting.api';

import React from 'react'
import { Button } from '@/components/ui/button';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

interface SelectInvoiceProps {
    isDr?: boolean;
    popOverOpen: boolean;
    isLoading?:boolean;
    onOpen: (open:boolean) => void;
    onSelected: (selected:{
        label: string
        value: string
    }) => void;
    selected: {label: string; value:string} | null;
}

const SelectInvoice: React.FC<SelectInvoiceProps> = (props) => {
    const [onGetInvoice, getInvoiceProps] = useGetInvoiceMutation();
    const [value,setValue] = React.useState<string>('');
    const [results, setResults] = React.useState<{key:string; data: {br_no:string;dr_no:string;invoice_no:string}}[]>([])

    React.useEffect(() => {
        const timerId = setTimeout(async () => {
            if(value !== '' && value.length >= 3)
            await onGetInvoice(props.isDr  ? {
                dr_no: value
            } : {
                
                invoice_no: value
            })
            .unwrap().then(result => {
                setResults(result)
            })

            
        },500)

        return () => {
            setResults([])
            clearTimeout(timerId)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[value])

    const onOpenChange = () => {
        props.onOpen(!props.popOverOpen)
        setResults([])
    }

    return (<div className='flex flex-col gap-1'>
        <Popover open={props.popOverOpen} onOpenChange={onOpenChange}>
            <PopoverTrigger asChild>
                <div className='flex flex-col gap-1 w-full' >
                    <label>Select Invoice</label>
                    <Button isLoading={props.isLoading} onClick={() =>  props.onOpen(!props.popOverOpen)}>{ props.selected ? props.selected.label : 'Select Invoice'}</Button>
                </div>
            </PopoverTrigger>
            <PopoverContent className="p-0">
                <Command shouldFilter={false}>
                    <CommandInput placeholder='Search Invoice' onValueChange={(e) => setValue(e)}/>
                    <CommandList>
                        <CommandEmpty>{getInvoiceProps.isLoading ? 'Loading' : 'No results found.'} </CommandEmpty>
                    </CommandList>
                    <CommandGroup heading='Invoices' className='overflow-scroll'>
                        {
                            results.map(item => (
                                <CommandItem
                                    key={item.key}
                                    value={item.key}
                                    onSelect={(value) => {
                                        props.onOpen(false)
                                        setResults([])
                                        props.onSelected({
                                            label: item.data.invoice_no,
                                            value: value
                                        })
                                    }}
                                >
                                    <div className='grid gap-2'>
                                        <div className='flex flex-col gap-1'>
                                            <label className='font-semibold'>Invoice No:</label>
                                            <label>{item.data.invoice_no}</label>
                                        </div>
                                        <div className='flex flex-col gap-1'>
                                            <label className='font-semibold'>DR No:</label>
                                            <label>{item.data.dr_no}</label>
                                        </div>
                                    </div>
                                </CommandItem>
                            ))
                        }
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
        
    </div>)
}

export default SelectInvoice
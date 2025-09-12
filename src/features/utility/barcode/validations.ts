import {z} from 'zod'
import * as yup from 'yup';

export type barcode = {
    barcode: string;
    assigned: boolean;
    location: string;
    br_no: string;
    created_at: string;
}

export const createBarcodeSchema = yup.object({
    location: yup.object({
        label: yup.string().required(),
        value: yup.string().required() 
    }).nullable().notOneOf([null],'Required'),
    barcode_count: yup.number().min(1,'Mininum barcode to generate is 1') 
})

export type createBarcodeType = yup.InferType<typeof createBarcodeSchema>

export const barcodeFilterSchema = z.object({
    search: z.string().optional(),
    location: z.object({
        label:z.string(),
        value: z.string()
    }).nullable(),
    is_assigned: z.object({
        label: z.string(),
        value: z.string()
    }).nullable()
})

export type barcodeFilterType = z.infer<typeof barcodeFilterSchema>
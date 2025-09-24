import * as z from 'zod';

export const createShipPointSchema = z.object({
    ship_point_desc: z.string(),
    ship_point_code: z.string(),
    ship_point_address: z.string(),
    city: z.string(),
    state: z.string(),
    country: z.string(),
    ship_pt_zone: z.string(),
    postal_code: z.string(),
    is_active: z.boolean()
})

export const updateShipPointSchema = createShipPointSchema

export type createShipPointType = z.infer<typeof createShipPointSchema>
export type updateShipPointType = z.infer<typeof updateShipPointSchema>
export type shipPointTable = {
    id: string;
    ship_point_desc: string;
    ship_point_code: string;
    is_active: boolean;
}
import * as yup from 'yup';

export const updateLocationSchema = yup.object({
    location_name: yup.string().required(),
    location_status: yup.boolean().required(),
    users: yup.array().of(yup.object().shape({
        db_id: yup.string().required(),
        fk_location: yup.string().required(),
        fk_user_id: yup.string().required(),
        location_name: yup.string().required(),
        email: yup.string().required(),
        is_active: yup.boolean().required() 
    }))
})

export type updateLocationType = yup.InferType<typeof updateLocationSchema>
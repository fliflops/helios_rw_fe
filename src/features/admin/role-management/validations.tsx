import * as yup from 'yup';

export const roleCreateSchema = yup.object({
    role_name: yup.string().required(),
    is_active: yup.boolean().required(),
    is_admin: yup.boolean().required(),
    modules: yup.array().of(yup.object().shape({
        id: yup.string(),
        header_key: yup.string().required(),
        module_key: yup.string().required(),
        module_name: yup.string().required(),
        view: yup.bool(),
        create: yup.bool(),
        edit: yup.bool(),
        export: yup.bool()
    })).required()
})


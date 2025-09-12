import {roleCreateSchema} from './validations'
import * as yup from 'yup';

export type roleCreateType = yup.InferType<typeof roleCreateSchema> 
export type roleSubModuleTypes = roleCreateType['modules'];


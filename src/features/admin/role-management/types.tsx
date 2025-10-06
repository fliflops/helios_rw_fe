import {roleCreateSchema} from './validations'
import * as z from 'zod';

export type roleCreateType = z.infer<typeof roleCreateSchema> 
export type roleSubModuleTypes = roleCreateType['modules'];


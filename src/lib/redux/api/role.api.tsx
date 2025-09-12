import {apiSlice} from '../api';
import type {roleCreateType} from '@/features/admin/role-management/types'
import defaultModules from '@/lib/router.modules';

export const {useGetRoutesQuery, useCreateRoleMutation, useGetRoleQuery, useUpdateRoleMutation} = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getRoutes : builder.query<void,void>({
            query: () => ({
                url:'/role/routes',
                method: 'GET'
            })
        }),
        createRole: builder.mutation<void, roleCreateType>({
            query: (args) => ({
                url: '/role',
                method:'POST',
                body: args
            })
        }),
        getRole: builder.query<roleCreateType, string>({
            query: (role_id) => ({
                url:'/role/access/'+role_id,
                method: 'GET'
            }),
            transformResponse: (result:roleCreateType ) => {
                const {modules,...role} =  result;
                let tempModules: roleCreateType['modules']= [];

                defaultModules.forEach(d => {
                    const sub = d.modules;
                    tempModules = tempModules.concat(sub.map(s => {
                        const access = modules.find(m => m.module_key === s.module_key) 
                        return {
                            db_id: access?.id,
                            header_key: access?.header_key as string,
                            module_key: s.module_key,
                            module_name: s.module_name,
                            view: access?.view as boolean,
                            create: access?.create as boolean,
                            edit: access?.edit as boolean,
                            export: access?.export as boolean
                        }
                    }))

                })


                return {
                    ...role,
                    modules: tempModules
                }
            }
            
        }),
        updateRole: builder.mutation<void,{role_id:string} & roleCreateType>({
            query: (args) => ({
                url:'/role/access/'+args.role_id,
                method:'PUT',
                body: args
            }) 
        })
    })
})
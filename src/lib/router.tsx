import {createBrowserRouter} from "react-router-dom";
import App from '@/App';
import { Auth, PasswordReset } from "@/features/auth";
import Link from '@/components/Link';
import { User } from "@/features/admin/user-management";
import {Role, RoleView,RoleCreate, RoleUpdate} from '@/features/admin/role-management';
import { HomeView } from "@/features/home";
import { Location, LocationUpdate } from "@/features/data-management/location";
import PageIndex from "@/components/PageIndex";
import {Barcode, GenerateBarcode} from '@/features/utility/barcode'
import { ShipPoint } from "@/features/data-management/ship-point";
import { Principal } from "@/features/data-management/principal";
import { PODView } from "@/features/pod-view";

const route = createBrowserRouter([
    {
        path:'/',
        element: <App/>,  
        children: [
            {
                index: true,
                element: <HomeView/>,
                handle: {
                    crumb: () => (
                        <Link path='/' label="Home"/>
                    )
                }
            },
           //**POD Management */
            {
                path: '/pod',
                element: <PODView/>,
                handle:{
                    crumb: () => (
                        <Link path='/pod' label="View POD"/>
                    )
                }
            },
            {
                path:'/user',
                element: <User/>,
                handle: {
                    crumb: () => (
                        <Link path='/user' label="User Management"/>
                    )
                }
            },
            {
                path:'/role',
                element: <Role/>,
                handle: {
                    crumb: () => (
                        <Link path='/role' label="Role Management"/>
                    )
                },
                children:[
                    {
                        index:true,
                        element: <RoleView/>
                    },
                    {
                        path: 'create',
                        element: <RoleCreate/>,
                        handle: {
                            crumb: (path:string) => (
                                <Link path={path} label='Create Role'/>
                            )
                        }
                    },
                    {
                        path: ':id',
                        element: <RoleUpdate/>,
                        handle: {
                            crumb: (path:string) => (
                                <Link path={path} label='Update Role'/>
                            )
                        }
                    }
                ]
            },
            {
                path:'/location',
                element: <PageIndex/>,
                handle: {
                    crumb: () => (
                        <Link path='/location' label="Locations"/>
                    )
                },
                children: [
                    {
                        index:true,
                        element: <Location/>
                    },
                    {
                        path:':location_id',
                        element: <LocationUpdate/>,
                        handle: {
                            crumb: (path:string) => (
                                <Link path={path} label='Update Location'/>
                            )
                        }
                    }
                ]
            },
            {
                path:'/barcode',
                element: <PageIndex/>,
                handle: {
                    crumb: () => (
                        <Link path='/barcode' label="View Barcodes"/>
                    )
                },
                children:[
                    {
                        index:true,
                        element:<Barcode/>
                    },
                    {
                        path:'generate',
                        element:<GenerateBarcode/>,
                        handle:{
                            crumb: (path:string) => (
                                <Link path={path} label='Generate Barcode'/>
                            )
                        }
                    }
                ]
            },
            {
                path: '/ship-point',
                element: <PageIndex/>,
                handle: {
                    crumb: () => (
                        <Link path='/ship-point' label="Ship Points"/>
                    )
                },
                children:[
                    {
                        index:true,
                        element: <ShipPoint/>
                    }
                ]
            },
            {
                path:'/principal',
                element: <PageIndex/>,
                handle: {
                    crumb: () => (
                        <Link path='/principal' label="Principals"/>
                    )
                },
                children: [
                    {
                        index:true,
                        element: <Principal/>
                    }
                ]
            }
        ]  
    },
    {
        path:'/login',
        element: <Auth/>
    },
    {
        path:'/new-user',
        element: <PasswordReset title="New Account Registration"/>
    },
    {
        path:'/reset-password',
        element: <PasswordReset title="Password Reset"/>
    }
])

export default route

import React from 'react'
import {
    Sidebar,
    SidebarContent,
    SidebarHeader
} from "@/components/ui/sidebar";
import modules from '@/lib/router.modules';
import SidebarModules from './SidebarModules';
  
//import SidebarHome from './SidebarHome';

interface SidebarProps {

}

const AppSidebar: React.FC<SidebarProps> = () => {
    return (
        <Sidebar>
            <SidebarHeader>
                <div className='grid gap-2 h-14 text-center'>
                    <h3 className='font-sans font-semibold text-lg'>Helios</h3>
                </div>
            </SidebarHeader>
            <SidebarContent>
                {
                    modules.map(item => (
                        <SidebarModules key={item.header_id} {...item}/>
                    ))
                }
            </SidebarContent>
        </Sidebar>

    );
}

export default AppSidebar
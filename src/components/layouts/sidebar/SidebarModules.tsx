import { SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import modules from '@/lib/router.modules';
import React from 'react';
import { NavLink } from 'react-router-dom';

type modulesType = typeof modules[number]

interface SidebarModulesProps extends modulesType {
    
}

const SidebarModules: React.FC<SidebarModulesProps> = (props) => {
    return <>
        <SidebarGroup>
            <SidebarGroupLabel>{props.header_label}</SidebarGroupLabel>  
            <SidebarContent>
                <SidebarMenu>
                    {
                        props.modules.map(item => (
                            <SidebarMenuItem key={item.module_key}>
                                <SidebarMenuButton asChild>
                                    <NavLink className={'font-sans'} to={item.route}>
                                        {item.module_name}
                                    </NavLink>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))
                    }
                </SidebarMenu>
            </SidebarContent>
        </SidebarGroup>
    </>;
}

export default SidebarModules
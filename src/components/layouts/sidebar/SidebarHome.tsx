import React from 'react';
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem,SidebarGroupContent } from '@/components/ui/sidebar';
import { NavLink } from 'react-router-dom';


interface SidebarHomeProps {

}

const SidebarHome: React.FC<SidebarHomeProps> = () => {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>Home</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <NavLink to='/'>
                                Home
                            </NavLink>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}

export default SidebarHome
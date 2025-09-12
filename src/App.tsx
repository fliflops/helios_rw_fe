/* eslint-disable react-hooks/exhaustive-deps */
import { Navigate, Outlet } from "react-router-dom";
import Header from "@/components/layouts/header/Header";
import { useAppDispatch, useAppSelector } from "./hooks/redux.hooks"
import { getAccessToken, setLogOut } from "./lib/redux/slices/auth.slice"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import AppSidebar from "./components/layouts/sidebar/Sidebar";
import { Separator } from "./components/ui/separator";
import AppBreadcrumb from "./components/layouts/breadcrumbs/Breadcrumbs";
import { useSessionQuery } from "./lib/redux/api/auth.api";
import React from 'react'
import AccountComboBox from "./components/layouts/header/AccountComboBox";

function App() {
  const token = useAppSelector(getAccessToken);
  const dispatch = useAppDispatch();
  const {data, isLoading, isSuccess, isError} = useSessionQuery()

  React.useEffect(() => {
    if(isError){
      dispatch(setLogOut())
    }
      
  },[isError])

  if(!token) return <Navigate to='/login' replace/>

  // if(isLoading) return <>...Loading</>
  
  if(isSuccess) {
    if(data.is_new) return <Navigate to='/new-user' replace/> 
  }
  
  return (
    <SidebarProvider>
      <AppSidebar/>
      <SidebarInset>
          <Header>
            <SidebarTrigger className="-ml-1"/>
            <Separator orientation="vertical" className="mr-2 h-6"/>
            <AppBreadcrumb/>
          
          </Header>
          <div className="fixed top-2 right-2 z-10">
              <AccountComboBox/>
            </div>
          <div className="relative flex flex-1 flex-col gap-4 p-4 top-16">     
              <Outlet/>
        </div>
      </SidebarInset>
    </SidebarProvider>
   
  )
}

export default App

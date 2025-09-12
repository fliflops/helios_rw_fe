import React from 'react'
import {ChevronsUpDown} from 'lucide-react';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { Button } from '@/components/ui/button';
import { useAppSelector } from '@/hooks/redux.hooks';
import { getSession } from '@/lib/redux/slices/auth.slice';
import { useAppDispatch } from '@/hooks/redux.hooks';
import { setLogOut } from '@/lib/redux/slices/auth.slice';
import useDisclosure from '@/hooks/useDisclosure';
import UpdatePassword from '@/features/auth/components/modal/UpdatePassword';

interface AccountComboBoxProps {

}

const AccountComboBox: React.FC<AccountComboBoxProps> = () => {
    const {
        email,
        role_name
    } = useAppSelector(getSession);
    
    const dispatch = useAppDispatch();
    const updatePassword = useDisclosure();

    const handleSignOut = () => {
        dispatch(setLogOut())
    }

    return (
        <Popover>
            <PopoverTrigger asChild >
                <Button variant={'outline'}><ChevronsUpDown /></Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
            <div className="grid gap-2 ">
                <div className="space-y-2">
                    <h4 className="font-medium leading-none ">{email}</h4>
                    <p className="text-sm text-muted-foreground">
                        {role_name}
                    </p>
                </div>
                <Button variant={'outline'} onClick={updatePassword.onOpen}>Update Password</Button>
                <Button variant={'outline'} onClick={handleSignOut}>Sign Out</Button>
            </div>    
            </PopoverContent>
            <UpdatePassword isOpen={updatePassword.open} onClose={updatePassword.onClose}/>
            
        </Popover>
    );
}

export default AccountComboBox
import { Dialog, DialogPanel } from '@/components/Dialog';
import { Button } from '@/components/ui/button';
import { CardContent, CardHeader, Card, CardFooter, CardTitle } from '@/components/ui/card';

import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext';
import { useResetPasswordMutation } from '@/lib/redux/api/user.api';
import { toast } from 'react-toastify';

interface ResetUserPasswordProps {
    onClose: () => void;
    isOpen: boolean;
}

const ResetUserPassword: React.FC<ResetUserPasswordProps> = (props) => {
    const context = useContext(UserContext);
    const [updateStatus, updateStatusProps] = useResetPasswordMutation();

    const handleUpdate = async() => {
        await updateStatus({
            id: context.state.id as string,
        })
        .unwrap()
        .then(() => {
            toast.success('User Status Updated!')
            props.onClose();
        })
    }

    return <Dialog open={props.isOpen} onClose={props.onClose}>
        <DialogPanel>
            <Card>
            <   CardHeader>
                    <CardTitle>Reset User Password</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>Reset password for <span className='font-semibold'>{context.state.username}</span>?</p>
                </CardContent>
                <CardFooter className='flex justify-between'>
                    <Button variant={'destructive'} onClick={props.onClose} disabled={updateStatusProps.isLoading}>No</Button>
                    <Button onClick={handleUpdate} isLoading={updateStatusProps.isLoading}>Yes</Button>
                </CardFooter>
            </Card>
        </DialogPanel>
    </Dialog>;
}

export default ResetUserPassword
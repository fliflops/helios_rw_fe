import { Button } from '@/components/ui/button';
import React from 'react'
import { useGetRedisSessionQuery, useKillSessionMutation } from '@/lib/redux/api/user.api';
import { toast } from 'react-toastify';

interface ActiveSessionProps {

}

const ActiveSession: React.FC<ActiveSessionProps> = () => {
    const {data, isLoading} = useGetRedisSessionQuery()
    const [killSession, killSessionProps] = useKillSessionMutation();
    
    const handleKillSession = async() => {
        await killSession()
        .unwrap()
        .then(() => {
            toast.success('Session Killed!')
        });
    }
    
    return (
        <div className='border p-3 rounded-sm gap-1 grid grid-cols-2'>
            <h3 className='text-lg'>API Session Status: {data?.isActiveSession ? 'Active' : 'No Active Session'}</h3>
            <p className='text-lg'>Expiry: <span className='font-semibold'>{data?.expiry}</span></p>
            <div className='flex justify-end col-span-2'>
                <Button isLoading={isLoading || killSessionProps.isLoading} disabled={!data?.isActiveSession} onClick={handleKillSession}>Kill Session</Button>
            </div>
        </div>
    );
}

export default ActiveSession
import React from 'react'
import PasswordResetForm from '../components/form/PasswordResetForm';

interface NewUserProps {
    title: string;
}

const NewUser: React.FC<NewUserProps> = (props) => {
    return <div className='grid grid-cols-2 h-screen'>
        <div className='bg-slate-800 flex flex-col justify-center items-center'>
            <label className='text-white font-sans text-5xl'>{props.title}</label>
        </div>
        <div className='flex flex-col justify-center items-center'>
            <PasswordResetForm type='reset'/>
        </div>
    </div>;
}

export default NewUser
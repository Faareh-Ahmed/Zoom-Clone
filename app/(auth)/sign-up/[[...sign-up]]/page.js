import React from 'react'
import {SignUp} from '@clerk/nextjs'
const SignUpPage = () => {
    return (
        <>
            <div className=' w-full justify-center items-center flex h-screen'>
                <SignUp />
            </div>
        </>)
}

export default SignUpPage
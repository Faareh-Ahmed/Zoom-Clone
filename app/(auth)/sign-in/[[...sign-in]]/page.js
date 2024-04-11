import React from 'react'
import { SignIn } from '@clerk/nextjs'
const SignInPage = () => {
    return (
        <>
        <main className=' w-full justify-center items-center flex h-screen'>
            <SignIn/>
        </main>
        </>)
}

export default SignInPage
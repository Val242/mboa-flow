"use client"
import { useAuth } from '@/context/AuthContext'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useActionState } from 'react'

export default function SignUp() {
      const {signUpUser} = useAuth()
         const router = useRouter();

    const [error, submitAction, isPending] = useActionState(
            async (previousState, formData:FormData)=>{
                //1. Extract form data
                const email = formData.get("email")
                const password = formData.get("password")
                const name = formData.get("name")
                const accountType = formData.get("account-type")
    
                //2. Call our sigup function
    
                try{
                    const {
                        success, 
                        data, 
                        error:signUpError
                    } = await signUpUser(email, password, name, accountType)
    
                    if(signUpError){
                        return new Error(signUpError)
                    }
    
                    if(success && data?.session){
                     router.push('/dashboard');
                        return null
                    }
                    return null
    
                }catch(error){
                    console.error("Sign up error", error.message)
                    return new Error ("An unexpected error occured. Please try again")
                }
            }, null
        )
    
        const {session} = useAuth()
        console.log(session)
  return (
      <div>
        <h1 className='my-2 text-4xl text-center'>Sign up today!</h1>
        <form action={submitAction}>

             <div className='mb-2'>
               Already have an account? 
               <Link href= '/sign-in'>Sign In </Link>
            </div> 
          
             <label htmlFor="name">Name</label> <br />
            <input
            type='name'
            name='name'
            placeholder='name'
            required
            aria-required = 'true'
            aria-invalid = {error? 'true': 'false'}
            aria-describedby={error ? 'signup-error': undefined}
            disabled = {isPending}
            className='mb-2'
            />  <br />
          

            <label htmlFor="email">Email</label> <br />
            <input
            type='email'
            name='email'
            placeholder='email'
            required
            aria-required = 'true'
            aria-invalid = {error? 'true': 'false'}
            aria-describedby={error ? 'signup-error': undefined}
            disabled = {isPending}
            className='mb-2'
            />  <br />

              <label htmlFor="password">Password</label> <br />
              <input
            type='password'
            name='password'
            placeholder='password'
            required
            aria-required = 'true'
            aria-invalid = {error? 'true': 'false'}
            aria-describedby={error ? 'signup-error': undefined}
            disabled = {isPending}
            className='mb-2'
            />
        

        <button
        type='submit'
        aria-busy= {isPending}
        >
            { isPending? 'Signing Up' : 'Sign up'} 
        </button>
         {
            error && (
                <div>
                    {error.message}
                </div>
            )
        }
                <legend>Select your role</legend>
                <div className='flex flex-col'>
                    <label>
                        <input 
                        type="radio" 
                        name='account-type'
                        value='admin'
                        required/>{' '}
                        Admin
                    </label>
                      <label>
                        <input 
                        type="radio" 
                        name='account-type'
                        value='manager'
                        required/>{' '}
                        Sales Rep
                    </label>
                    <label>
                        <input 
                        type="radio" 
                        name='account-type'
                        value='rep'
                        required/>{' '}
                        Sales Rep
                    </label>
                    
                </div>
</form>
    </div>
  )
}

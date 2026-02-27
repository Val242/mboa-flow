"use client"
import { useAuth } from '@/context/AuthContext'
import { redirect } from 'next/dist/server/api-utils';
import React, { useActionState } from 'react'
import { useRouter } from 'next/navigation';




function SignIn() {
   const{session} = useAuth()
   const { signInUser } = useAuth();
   const router = useRouter();

   const[error,submitAction,isPending] = useActionState(
    async (previousState,formData: FormData)=>{
        //1. Extract form data
            const email = formData.get("email")
            const password = formData.get("password")
        //2. Perform the signin function
           try{
                const {
                    success, 
                    data, 
                    error:signInError
                } = await signInUser(email, password)

                  if(signInError){
                    return new Error(signInError)
                }

                if(success && data?.session){
                 router.push('/sign-up');
                 console.log("Successful signIn")
                    return null
                }
                return null
              }  catch(error){
                   const message = error instanceof Error ? error.message : String(error);
                   console.error("Sign in error", message)
                   return new Error ("An unexpected error occured. Please try again")
            }

                
   }, null)
  
  return (
    <div>
      <div>
        <h1>Sign In to Mboa flow</h1>
        <form action= {submitAction}>
            <div>
                Use this form to sign in to your account
            </div>
            <h2>
                Sign In
            </h2>
            {/* <p>
                Don't have an account yet?
                <Link to='/signup'>Sign up</Link>
            </p> */}

            <label htmlFor="email">Email</label> <br />
            <input
            type='email'
            name='email'
            placeholder='email'
            required
            />  <br />

              <label htmlFor="password">Password</label> <br />
              <input
            type='password'
            name='password'
            placeholder='password'
            required
            aria-required = 'true'
            aria-invalid = {error? 'true': 'false'}
            aria-describedby={error ? 'sigin-error': undefined}
            disabled = {isPending}
            />
        

        <button
        type='submit'
        aria-busy= {isPending}
        >
           { isPending? 'Signing In' : 'Sign In'}
        </button>
        {
            error && (
                <div>
                    {error.message}
                </div>
            )
        }
</form>
    </div>
    
    {/* {session} */}
    </div>
    
  )
}

export default SignIn
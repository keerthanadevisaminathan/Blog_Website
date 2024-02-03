import { Button, Label, TextInput } from 'flowbite-react';
import React from 'react';
import { Link } from 'react-router-dom';

export default function SignUp() {
  return (
      <div className='min-h-screen mt-20'>
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        <div className="">  
          <Link to="/" className='font-bold dark:text-white text-4xl'>
            <span className='px-2 py-1 bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg text-white'>Nest</span>
            Blog
          </Link>
          <p className='text-sm mt-4'>Sign up with your email and password or with Google.</p>
        </div>
        <div className="flex-1">
          <form>
            <div>
              <Label value='Username'/>
              <TextInput
                type='text'
                placeholder='Username'
                id='username'
              />  
            </div>
            <div>
              <Label value='Email'/>
              <TextInput
                type='text'
                placeholder='email'
                id='email'
              />  
            </div>
            <div>
              <Label value='Password'/>
              <TextInput
                type='text'
                placeholder='password'
                id='password'
              />  
            </div>
          
            <Button className='flex gap-2 text-sm mt-5 px-2 py-1 bg-gradient-to-r from-orange-500 to-pink-500 outline' type='submit' style={{ width: '100%' }}>
              Sign Up
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to='/sign-in' className='text-orange-500'>SignIn</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'; 
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import OAuth from '../OAuth';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value.trim() });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('Please fill out all the fields!'));
    }
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate('/');
        setFormData({}); // Clear form fields after successful submission
      } else {
        dispatch(signInFailure(data.message || 'Login failed.'));
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className='min-h-screen mt-20'>
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        <div className="">
          {/* Left section */}
          <Link to="/" className='font-bold dark:text-white text-4xl'>
            <span className='px-2 py-1 bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg text-white'>Nest</span>
            Blog
          </Link>
          <p className='text-sm mt-4'>Sign In with your email and password or with Google.</p>
        </div>
        {/* Right section */}
        <div className="flex-1">
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label value='Email' />
              <TextInput
                type='email'
                value={formData.email || ''}
                id='email'
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label value='Password' />
              <TextInput
                type='password'
                value={formData.password || ''}
                id='password'
                onChange={handleChange}
                required
              />
            </div>
            <Button className='flex gap-2 text-sm mt-5 px-2 py-1 bg-gradient-to-r from-orange-500 to-pink-500 outline' type='submit' style={{ width: '100%' }} disabled={loading}>
              {loading ? (
                <div className="flex items-center">
                  <Spinner size='sm' />
                  <span className='pl-3'>Loading...</span>
                </div>
              ) : (
                <span>Sign In</span>
              )}
            </Button>
            <OAuth/>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Don't have an account?</span>
            <Link to='/sign-up' className='text-orange-500'>Sign Up</Link>
          </div>
          {errorMessage && (
            <Alert className='mt-5' color='failure'>{errorMessage}</Alert>
          )}
        </div>
      </div>
    </div>
  );
}

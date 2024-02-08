import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import OAuth from '../OAuth';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage('Please fill out all fields');
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch('api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setErrorMessage(data.message);
      }
      setLoading(false);
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

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
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            {['username', 'email', 'password'].map((field) => (
              <div key={field}>
                <Label value={field === 'password' ? 'Password' : field.charAt(0).toUpperCase() + field.slice(1)} />
                <TextInput
                  type={field === 'password' ? 'password' : 'text'}
                  placeholder={field === 'username' ? 'Username' : field === 'email' ? 'Email' : 'Password'}
                  id={field}
                  onChange={handleChange}
                />
              </div>
            ))}
            <Button
              className='flex gap-2 text-sm mt-5 px-2 py-1 bg-gradient-to-r from-orange-500 to-pink-500 outline'
              type='submit'
              style={{ width: '100%' }}
              disabled={loading}
              aria-busy={loading}
              aria-disabled={loading}
            >
              {loading ? (
                <div className="flex items-center">
                  <Spinner size='sm' />
                  <span className='pl-3'>Loading...</span>
                </div>
              ) : (
                <span>Sign Up</span>
              )}
            </Button>
            <OAuth />
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to='/sign-in' className='text-orange-500'>Sign In</Link>
          </div>
          {errorMessage && (
            <Alert className='mt-5' color='failure'>{errorMessage}</Alert>
          )}
        </div>
      </div>
    </div>
  );
}

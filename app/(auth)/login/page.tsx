import React from 'react';;
import LoginFrom from '../_components/LoginFrom';
import LoginFooter from '../_components/LoginFooter';

const LoginPage = () => {
  return (
    <div className='flex min-h-screen items-center justify-center'>
      <div className='w-full max-w-md space-y-6 rounded-lg border p-8 shadow-lg'>
          <div className="text-center space-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              Welcome Back
            </h1>
            <p className="text-sm text-muted-foreground">
              Log in to your RentNest account
            </p>
          </div>

          <div>
            <LoginFrom></LoginFrom>
            <LoginFooter></LoginFooter>
          </div>





      </div>
    </div>
  );
};

export default LoginPage;
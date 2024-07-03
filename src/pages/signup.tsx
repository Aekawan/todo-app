import React from 'react';
import LoginLayout from '@/components/Layouts/LoginLayout';
import SignUpForm from '@/components/SignUpForm';

const SignUpPage: React.FC = () => {
  return (
    <>
      <h1 className="text-center text-3xl font-bold text-blue-500 uppercase">Todo App Sign Up</h1>
      <div className="max-w-md w-full bg-white p-8 rounded-lg mt-4 m-auto shadow-md">
        <SignUpForm />
      </div>
    </>
  );
};

(SignUpPage as any).Layout = LoginLayout;

export default SignUpPage;
import React from 'react';
import AuthForm from '../components/AuthForm';
import LoginLayout from '@/components/Layouts/LoginLayout';

const LoginPage: React.FC = () => {
  return (
    <>
      <h1 className="text-center text-3xl font-bold text-blue-500 uppercase">Todo App Login</h1>
      <div className="max-w-md w-full bg-white p-8 rounded-lg mt-4 m-auto shadow-md">
        <AuthForm />
      </div>
    </>
  );
};

(LoginPage as any).Layout = LoginLayout;

export default LoginPage;
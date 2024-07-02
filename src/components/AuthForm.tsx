import React, { use } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { login } from '../services/api';
import nookies from 'nookies';
import { toast } from 'react-toastify';
import { useAuth } from '@/hooks/useAuth';

const AuthForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const { goLogin } = useAuth();

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const isSuccess = await goLogin(data.username, data.password);
      if (isSuccess) {
        toast.success("Login success.")
        router.push('/todos');
      } else {
        toast.error("Login failed, please try again.")
      }
    } catch (error) {
      toast.error("Login failed, please try again.")
      console.error('Login failed', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Username</label>
        <input
          type="text"
          {...register('username', { required: 'Username is required' })}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.username && <p className="mt-2 text-sm text-red-600">{errors.username.message as string}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          {...register('password', { required: 'Password is required' })}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password.message as string}</p>}
      </div>
      <div>
        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {loading ? 'Loading...' : 'Login'}
        </button>
      </div>
    </form>
  );
};

export default AuthForm;
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useAuth } from '@/hooks/useAuth';
import { LoginForm } from '@/types/loginForm';

const ERROR_MESSAGES_ALERT = {
  loginField: 'Login failed, please try again.',
  loginSuccess: 'Login success.',
}

const AuthForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();
  const router = useRouter();
  const [loading, setLoading] = React.useState<boolean>(false);
  const { goLogin } = useAuth();

const onSubmit: SubmitHandler<LoginForm>  = async (data) => {
  setLoading(true);

  try {
    const isSuccess = await goLogin(data.username, data.password);
    if (isSuccess) {
      toast.success(ERROR_MESSAGES_ALERT.loginSuccess);
      router.push('/todos');
    } else {
      toast.error(ERROR_MESSAGES_ALERT.loginField);
    }
  } catch (error) {
    toast.error(ERROR_MESSAGES_ALERT.loginField);
    console.error(ERROR_MESSAGES_ALERT.loginField, error);
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
          defaultValue="admin"
          {...register('username', { required: 'Username is required' })}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-full shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.username && <p className="mt-2 text-sm text-red-600">{errors.username.message as string}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          defaultValue="password"
          {...register('password', { required: 'Password is required' })}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-full shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password.message as string}</p>}
      </div>
      <div>
        <button
          type="submit"
          disabled={loading}
          className="bg-gradient-to-r mt-2 from-blue-400 to-blue-600 text-white p-3 rounded-full w-full font-bold"
        >
          {loading ? 'Loading...' : 'Login'}
        </button>
      </div>
      <div className="border-1 border-blue-100 p-4">
        Note: You can login with <br />
        <div className="mt-2">
          Username: <strong>admin</strong> <br />
          Password: <strong>password</strong>
        </div>
      </div>
    </form>
  );
};

export default AuthForm;
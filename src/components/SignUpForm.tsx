import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';

type CreateUserForm = {
  username: string;
  password: string;
  email: string;
};

const SignUpForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<CreateUserForm>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const router = useRouter();
  const { signUp } = useAuth();

  const onSubmit: SubmitHandler<CreateUserForm> = async (data) => {
    setIsSubmitting(true);
    try {
      await signUp(data.username, data.password);
      toast.success("User created successfully.");
      router.push('/login');
    } catch (error) {
      toast.error("Failed to create user, please try again.");
      console.error('Create user failed', error);
    } finally {
      reset();
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            className="mt-1 p-2 w-full border rounded"
            placeholder="Username"
            {...register('username', { required: 'Username is required' })}
          />
          {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            className="mt-1 p-2 w-full border rounded"
            placeholder="Password"
            {...register('password', { required: 'Password is required' })}
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-gradient-to-r mt-4 from-blue-400 to-blue-600 text-white p-4 rounded-full w-full"
        >
          {isSubmitting ? 'Loading...' : 'Sign Up'}
        </button>
      </form>
      <div className="flex mt-4 justify-center text-blue-500 hover:text-blue-600">
        <Link href="/login">Login</Link>
      </div>
    </div>
  );
};

export default SignUpForm;
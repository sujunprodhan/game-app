'use client';

import { useForm } from 'react-hook-form';
import { Eye, EyeOff, Mail, User, Lock, Chrome, Github } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { postUser } from '@/actions/server/auth';

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const onSubmit = async (data) => {
    console.log('FORM DATA:', data);
    const formData = {
      name: data.name,
      email: data.email,
      password: data.password,
      image: data.image?.[0],
    };

   const result = await postUser(formData);
   alert(result.message)
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4">
      {/* Background */}
      <Image src="/register.webp" alt="bg" fill priority className="object-cover -z-10" />
      <div className="absolute inset-0 bg-black/80"></div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-white text-center mb-6">Create Account</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" encType="multipart/form-data">
          {/* Name */}
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Full Name"
              {...register('name', { required: 'Name is required' })}
              className="w-full pl-10 px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white outline-none"
            />
            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="email"
              placeholder="Email Address"
              {...register('email', { required: 'Email is required' })}
              className="w-full pl-10 px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white outline-none"
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Image Upload */}
          <div>
            <input
              type="file"
              accept="image/*"
              {...register('image')}
              className="w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 
                file:rounded-lg file:border-0 file:bg-pink-600 file:text-white 
                hover:file:bg-pink-700 cursor-pointer"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type={showPass ? 'text' : 'password'}
              placeholder="Password"
              {...register('password', { required: 'Password is required' })}
              className="w-full pl-10 pr-10 px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white outline-none"
            />
            <span
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
            >
              {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type={showConfirm ? 'text' : 'password'}
              placeholder="Confirm Password"
              {...register('confirmPassword', {
                required: 'Confirm password is required',
                validate: (value) => value === watch('password') || 'Passwords do not match',
              })}
              className="w-full pl-10 pr-10 px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white outline-none"
            />
            <span
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
            {errors.confirmPassword && (
              <p className="text-red-400 text-sm mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* Submit */}
          <button className="w-full py-2 rounded-lg bg-gradient-to-r from-pink-600 to-purple-600 text-white">
            Register
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-4">
          <div className="flex-1 h-px bg-gray-600"></div>
          <span className="px-3 text-gray-400 text-sm">OR</span>
          <div className="flex-1 h-px bg-gray-600"></div>
        </div>

        {/* Social Login */}
        <div className="space-y-3">
          <button
            onClick={() => signIn('google')}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-white text-black"
          >
            <Chrome size={18} /> Continue with Google
          </button>

          <button
            onClick={() => signIn('github')}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-gray-800 text-white"
          >
            <Github size={18} /> Continue with GitHub
          </button>

          <button
            onClick={() => signIn('facebook')}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-blue-600 text-white"
          >
            Continue with Facebook
          </button>
        </div>

        {/* Login Link */}
        <p className="text-center text-sm text-gray-300 mt-5">
          Already have an account?{' '}
          <Link href="/login">
            <span className="text-pink-500 cursor-pointer hover:underline">Login</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;

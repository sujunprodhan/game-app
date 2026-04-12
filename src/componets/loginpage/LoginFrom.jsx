'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, UserRound } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import {useRouter} from "next/navigation"

const LoginForm = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPass, setShowPass] = useState(false);

  const onSubmit = async (data) => {
    const res = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    if(res.error){
      alert('Invalid credentials')
    }
    setTimeout(()=>{
    router.push('/')
    })
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4">
      <Image
        src="/register.webp"
        alt="Background"
        fill
        priority
        className="object-cover object-center -z-10"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70 z-0"></div>

      {/* Form Container */}
      <div className="relative z-10 w-full max-w-md bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-lg">
        {/* Title */}
        <h2 className="text-2xl font-bold text-white text-center mb-6">Welcome Back</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Email Address"
              {...register('email', { required: 'Email is required' })}
              className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white outline-none focus:border-pink-500"
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type={showPass ? 'text' : 'password'}
              placeholder="Password"
              {...register('password', { required: 'Password is required' })}
              className="w-full px-4 py-2 pr-10 rounded-lg bg-gray-900 border border-gray-700 text-white outline-none focus:border-pink-500"
            />

            <span
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-pink-500"
            >
              {showPass ? <Eye size={18} /> : <EyeOff size={18} />}
            </span>

            {errors.password && (
              <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Extra Options */}
          <div className="flex justify-between text-sm text-gray-300">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-pink-600" />
              Remember me
            </label>
            <span className="hover:text-pink-500 cursor-pointer">Forgot password?</span>
          </div>

          {/* Submit */}
          <button type='submit' className="w-full py-2 rounded-lg bg-linear-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-semibold shadow-md hover:shadow-pink-500/40 transition">
            Login
          </button>

          {/* Register Link */}
          <p className="text-center text-sm text-gray-300 mt-4">
            Don&apos;t have an account?{' '}
            <Link href="/register">
              <span className="text-pink-500 hover:underline cursor-pointer">Register</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

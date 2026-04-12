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
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();

      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('password', data.password);

      // image file backend 
      if (data.image?.[0]) {
        formData.append('image', data.image[0]);
      }

      const result = await postUser(formData);

      if (!result?.success) {
        throw new Error(result.message);
      }

      alert(result.message);

      // LOGIN here
      await signIn('credentials', {
        email: data.email,
        password: data.password,
        callbackUrl: '/',
      });
    } catch (error) {
      alert(error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4">
      <Image src="/register.webp" alt="bg" fill priority className="object-cover -z-10" />
      <div className="absolute inset-0 bg-black/80"></div>

      <div className="relative z-10 w-full max-w-md bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-white text-center mb-6">Create Account</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

          {/* Image */}
          <input
            type="file"
            accept="image/*"
            {...register('image')}
            className="w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-pink-600 file:text-white hover:file:bg-pink-700 cursor-pointer"
          />

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
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-lg bg-linear-to-r from-pink-600 to-purple-600 text-white"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

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

// const IMGBB_API = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
// console.log(IMGBB_API, 'image data');

// const uploadToImgbb = async (imageFile) => {
//   const formData = new FormData();
//   formData.append('image', imageFile);

//   const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API}`, {
//     method: 'POST',
//     body: formData,
//   });

//   const data = await res.json();

//   if (!data.success) throw new Error('Image upload failed');

//   return data.data.url;
// };

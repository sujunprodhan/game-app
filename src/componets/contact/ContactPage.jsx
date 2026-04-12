'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Mail, Phone, MapPin } from 'lucide-react';
import Image from 'next/image';
import { sendContactMessage } from '@/actions/server/contact';
import { signIn } from 'next-auth/react';

const ContactPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('subject', data.subject || '');
      formData.append('message', data.message);

      const result = await sendContactMessage(formData);
      if (result.needLogin) {
        alert(result.message);
        signIn('credentials', {callbackUrl: '/login'});
        return;
      }

      if (!result.success) {
        alert(result.message);
        return;
      }

      alert('Message sent successfully');
      reset();
    } catch (error) {
      alert(error.message || 'Please Login Here');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-16">
      {/* Background */}
      <Image src="/contactbg.webp" alt="background" fill priority className="object-cover -z-10" />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 -z-10"></div>

      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl text-white">
        {/* LEFT SIDE */}
        <div className="flex flex-col justify-center space-y-6">
          <h1 className="text-4xl font-bold">
            Get in <span className="text-pink-500">Touch</span>
          </h1>

          <p className="text-gray-300">Have a question or feedback? Send us a message.</p>

          <div className="space-y-4 mt-4">
            <div className="flex items-center gap-3">
              <Mail className="text-pink-500" />
              <span className="text-gray-300">support@example.com</span>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="text-pink-500" />
              <span className="text-gray-300">+880 1234 567 890</span>
            </div>

            <div className="flex items-center gap-3">
              <MapPin className="text-pink-500" />
              <span className="text-gray-300">Dhaka, Bangladesh</span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* NAME */}
          <div>
            <label className="text-sm text-gray-200">Your Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              {...register('name', { required: 'Name is required' })}
              className="w-full mt-1 px-4 py-2 rounded-lg bg-gray-900/80 border border-gray-700 outline-none focus:border-pink-500"
            />
            {errors.name && <p className="text-red-400 text-sm">{errors.name.message}</p>}
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm text-gray-200">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              {...register('email', { required: 'Email is required' })}
              className="w-full mt-1 px-4 py-2 rounded-lg bg-gray-900/80 border border-gray-700 outline-none focus:border-pink-500"
            />
            {errors.email && <p className="text-red-400 text-sm">{errors.email.message}</p>}
          </div>

          {/* SUBJECT */}
          <div>
            <label className="text-sm text-gray-200">Subject</label>
            <input
              type="text"
              placeholder="Subject"
              {...register('subject')}
              className="w-full mt-1 px-4 py-2 rounded-lg bg-gray-900/80 border border-gray-700 outline-none focus:border-pink-500"
            />
          </div>

          {/* MESSAGE */}
          <div>
            <label className="text-sm text-gray-200">Message</label>
            <textarea
              rows="6"
              placeholder="Write your message..."
              {...register('message', { required: 'Message is required' })}
              className="w-full mt-1 px-4 py-2 rounded-lg bg-gray-900/80 border border-gray-700 outline-none focus:border-pink-500"
            />
            {errors.message && <p className="text-red-400 text-sm">{errors.message.message}</p>}
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-lg bg-gradient-to-r from-pink-600 to-purple-600 hover:opacity-90 transition disabled:opacity-60"
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;

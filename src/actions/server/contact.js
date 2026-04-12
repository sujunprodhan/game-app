'use server';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { dbConnect } from '@/lib/dbconnect';
import { getServerSession } from 'next-auth';

export const sendContactMessage = async (payload) => {
  const contactCollection = await dbConnect('contacts');

  const session = await getServerSession(authOptions);

  if (!session) {
    return {
      success: false,
      message: 'Please Login first and try again',
      needLogin: true,
    };
  }
  const email = session?.user?.email || formEmail;
  const name = session?.user?.name || formName;
  const subject = payload.get('subject');
  const message = payload.get('message');
  if (!message) {
    return {
      success: false,
      message: 'Message is required form login user'
    };
  }

  const newMessage = {
    name,
    email,
    subject: subject || '',
    message,
    userId: session?.user?.id || null,
    createdAt: new Date(),
  };

  const result = await contactCollection.insertOne(newMessage);

  return {
    success: true,
    message: 'Message sent successfully ',
    id: result.insertedId,
  };
};

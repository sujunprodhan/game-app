'use server';

import { dbConnect } from '@/lib/dbconnect';
import bcrypt from 'bcryptjs';

export const postUser = async (payload) => {
  const usersCollection = await dbConnect('users');

  const name = payload.get('name');
  const email = payload.get('email');
  const password = payload.get('password');
  const imageFile = payload.get('image'); 

  //  check user exist
  const isExist = await usersCollection.findOne({ email });
  if (isExist) {
    return {
      success: false,
      message: 'User already exist',
    };
  }

  // hash password bcrypt
  const hashedPassword = await bcrypt.hash(password, 10);

  let imageUrl = '';

  // IMAGE UPLOAD 
  if (imageFile && imageFile.size > 0) {
    const imgForm = new FormData();
    imgForm.append('image', imageFile);

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
      {
        method: 'POST',
        body: imgForm,
      }
    );

    const imgData = await res.json();

    if (!imgData.success) {
      return {
        success: false,
        message: 'Image upload failed',
      };
    }

    imageUrl = imgData.data.url;
  }

  // create user
  const newUser = {
    name,
    email,
    password: hashedPassword,
    image: imageUrl,
    role: 'user',
    createdAt: new Date(),
  };

  const result = await usersCollection.insertOne(newUser);

  return {
    success: true,
    message: `user created with id: ${result.insertedId}`,
  };
};

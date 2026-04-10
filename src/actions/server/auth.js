'use server';

import { dbConnect } from '@/lib/dbconnect';
import bcrypt from 'bcryptjs';

export const postUser = async (payload) => {
  //validate

  const usersCollection = await dbConnect('users');

  console.log('hello');

  // 1 check user exist
  const isExist = await usersCollection.findOne({ email: payload.email });

  if (isExist) {
    return {
      success: false,
      message: 'User already exist',
    };
  }

  // 2 hash password
  const hashedPassword = await bcrypt.hash(payload.password, 10);

  // 3 create new user
  const newUser = {
    name: payload.name,
    email: payload.email,
    password: hashedPassword,
    role: 'user',
    createdAt: new Date(),
  };

  // DB Connect
  const result = await usersCollection.insertOne(newUser);

  if (result.insertedId) {
    return {
      success: true,
      message: `user created with id: ${result.insertedId}`,
    };
  } else {
    return {
      success: false,
      message: `something is wrong try aging`,
    };
  }
};

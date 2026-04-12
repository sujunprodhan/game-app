import { dbConnect } from '@/lib/dbconnect';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { signIn } from 'next-auth/react';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',

      credentials: {
        email: { label: 'email', type: 'email', placeholder: 'Enter Email' },
        password: { label: 'Password', type: 'password', placeholder: 'Enter Email' },
      },

      async authorize(credentials, req) {
        const { email, password } = credentials;
        console.log(email, password, 'auth js');

        // database
        const user = await dbConnect('users').findOne({ email });
        if (!user) {
          return null;
        }
        const isPassword = await bcrypt.compare(password, user?.password);
        if (!isPassword) {
          return null;
        }
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          image: user.image,
        };
      },
    }),
  ],
  pages:{
    signIn: "/login"
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

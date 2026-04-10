import { dbConnect } from '@/lib/dbconnect';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';



const userList = [
  { name: 'John Doe', password: 'password123' },
  { name: 'Jane Smith', password: 'password456' },
];

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

        // const user = userList?.find((u) => u.name == username);

        // database
        const user = await dbConnect('users').findOne({email})
        if (!user) {
          return null;
        }
      const isPassword = await bcrypt.compare(password, user?.password)
        if (isPassword) {
          return user;
        }
        return null;
      },
    }),
  ],
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

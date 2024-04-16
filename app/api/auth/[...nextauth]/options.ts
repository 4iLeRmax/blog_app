import type { AuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getUsers } from '@/lib/getUsers';
import { GithubProfile } from 'next-auth/providers/github';
import { createUser } from '@/lib/createUser';
import { User } from '@/types';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Us',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'Type your email' },
        password: { label: 'Password', type: 'password', placeholder: 'Type your password' },
      },
      async authorize(credentials) {
        const users = await getUsers();

        const currentUser = users?.find(
          (user) => user.email === credentials?.email && user.password === credentials?.password,
        );

        if (currentUser) return currentUser;
        return null;
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      async profile(profile: GithubProfile) {
        // console.log(profile);
        const githubProfile = {
          id: profile.id.toString(),
          email: profile.email,
          name: profile.login,
          image: profile.avatar_url,
          password: null,
          role: profile.role ?? 'user',
        } as User;
        // console.log(githubProfile);

        const users = await getUsers();

        const existGithubUser =
          users !== null
            ? users.some(
                (user) =>
                  user.email?.toLowerCase() === githubProfile.email?.toLowerCase() &&
                  user.name.toLowerCase() === githubProfile.name.toLowerCase(),
              )
            : false;
        // console.log(existGithubUser);

        if (!existGithubUser) {
          // console.log("don't exist");
          createUser(githubProfile);
        }

        return {
          ...profile,
          name: profile.login,
          role: profile.role ?? 'user',
          id: profile.id.toString(),
          image: profile.avatar_url,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (user) {
        token.role = (user as User).role;
        token.id = (user as User).id;
      }
      return token;
    },
    async session({ session, token, user }) {
      if (token) {
        (session.user as any).role = token.role;
        (session.user as any).id = token.id;
      }
      return session;
    },
  },
};

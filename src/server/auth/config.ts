import { PrismaAdapter } from "@auth/prisma-adapter";
import { type NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import { db } from "~/server/db";
import { signInSchema } from "~/lib/validations/auth";

// Extend NextAuth types with our custom properties
declare module "next-auth" {
  interface User {
    firstName: string;
    lastName: string;
  }
  interface Session {
    user: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      image?: string | null;
    };
  }
}

// Custom JWT type with our additional properties
interface CustomJWT {
  sub?: string;
  firstName: string;
  lastName: string;
  [key: string]: unknown;
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const validatedFields = signInSchema.safeParse(credentials);

        if (!validatedFields.success) {
          return null;
        }

        const { email, password } = validatedFields.data;

        const user = await db.user.findUnique({
          where: { email },
        });

        if (!user || !user.password) {
          return null;
        }

        const passwordsMatch = await bcrypt.compare(password, user.password);

        if (!passwordsMatch) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          image: user.image,
        };
      },
    }),
  ],
  adapter: PrismaAdapter(db) as NextAuthConfig["adapter"],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    session: ({ session, token }) => {
      const customToken = token as unknown as CustomJWT;
      return {
        ...session,
        user: {
          id: customToken.sub!,
          firstName: customToken.firstName,
          lastName: customToken.lastName,
          email: session.user.email,
          image: session.user.image,
        },
      };
    },
    jwt: ({ token, user }) => {
      if (user) {
        token.sub = user.id;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
      }
      return token;
    },
  },
} satisfies NextAuthConfig;

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import type { NextAuthOptions } from "next-auth";
import { NextApiRequest, NextApiResponse } from "next";

type NextAuthOptionsCallback = (
  req: NextApiRequest,
  res: NextApiResponse
) => NextAuthOptions;

const nextAuthOptions: NextAuthOptionsCallback = (req, res) => {
  return {
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      }),
    ],
    pages: {
      signIn: "/login",
      error: "/login",
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV !== "production",
    session: {
      strategy: "jwt",
      maxAge: 24 * 60 * 60, // 1 day
    },
  };
};

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, nextAuthOptions(req, res));

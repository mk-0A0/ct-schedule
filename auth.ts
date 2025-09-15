import NextAuth from "next-auth";
import Slack from "next-auth/providers/slack";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Slack({
      clientId: process.env.SLACK_CLIENT_ID!,
      clientSecret: process.env.SLACK_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.AUTH_SECRET,
});

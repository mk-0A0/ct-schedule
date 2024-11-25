import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl
      return pathname === '/' ? true : !!auth
    },
  },
})

import { auth, signIn, signOut } from '@/auth'

export const Header = async () => {
  const session = await auth()
  return (
    <header
      style={{
        padding: '16px',
        display: 'flex',
        justifyContent: 'end',
        gap: '16px',
      }}
    >
      {session ? (
        <>
          <button
            onClick={async () => {
              'use server'
              await signOut()
            }}
          >
            SignOut
          </button>
        </>
      ) : (
        <>
          <button
            onClick={async () => {
              'use server'
              await signIn('google', { redirectTo: '/mypage' })
            }}
          >
            Signin with Google
          </button>
        </>
      )}
    </header>
  )
}

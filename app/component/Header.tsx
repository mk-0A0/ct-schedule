import { auth, signIn, signOut } from '@/auth'
import { Button } from '@/components/ui/button'

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
        <Button
          onClick={async () => {
            'use server'
            await signOut()
          }}
        >
          SignOut
        </Button>
      ) : (
        <Button
          onClick={async () => {
            'use server'
            await signIn('google', { redirectTo: '/mypage' })
          }}
        >
          Signin with Google
        </Button>
      )}
    </header>
  )
}

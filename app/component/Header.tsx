import { auth, signIn, signOut } from '@/auth'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

export const Header = async () => {
  const session = await auth()
  return (
    <header className="flex justify-end gap-4 p-4 shadow">
      {session ? (
        <Popover>
          <PopoverTrigger asChild>
            <Button size="icon" className="rounded-full">
              <Avatar>
                <AvatarImage
                  src={`${session.user && session.user.image}`}
                  alt={session.user && `${session.user.name}のアイコン`}
                />
              </Avatar>
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <Button
              onClick={async () => {
                'use server'
                await signOut()
              }}
            >
              ログアウト
            </Button>
          </PopoverContent>
        </Popover>
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

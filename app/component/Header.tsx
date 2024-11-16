import { auth, signIn, signOut } from '@/auth'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/ui/menubar'

export const Header = async () => {
  const session = await auth()
  return (
    <header className="flex justify-end gap-4 p-4 shadow">
      {session ? (
        <Menubar className="rounded-full p-0 border-none">
          <MenubarMenu>
            <MenubarTrigger className="rounded-full p-0">
              <Avatar>
                <AvatarImage
                  src={`${session.user && session.user.image}`}
                  alt={session.user && `${session.user.name}のアイコン`}
                />
              </Avatar>
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem
                onClick={async () => {
                  'use server'
                  await signOut()
                }}
              >
                ログアウト
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
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

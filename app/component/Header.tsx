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
import Link from 'next/link'

export const Header = async () => {
  const session = await auth()
  return (
    <header className="p-4 shadow">
      <div className="container flex justify-between items-center gap-4">
        <img
          src="https://placehold.jp/150x50.png"
          alt="ロゴ"
          width="150"
          height="50"
        />
        {session ? (
          <Menubar className="rounded-full p-0 border-none">
            <MenubarMenu>
              <MenubarTrigger className="rounded-full p-0 cursor-pointer">
                <Avatar>
                  <AvatarImage
                    src={`${session.user && session.user.image}`}
                    alt={session.user && `${session.user.name}のアイコン`}
                  />
                </Avatar>
              </MenubarTrigger>
              <MenubarContent align="end">
                <MenubarItem>
                  <Link href={{ pathname: '/mypage' }}>マイページ</Link>
                </MenubarItem>
                <MenubarItem
                  onClick={async () => {
                    'use server'
                    await signOut()
                  }}
                >
                  <span className="text-red-600 font-bold">ログアウト</span>
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
      </div>
    </header>
  )
}

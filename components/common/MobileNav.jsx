import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetTrigger,
  } from "@/components/ui/sheet"
import Image from 'next/image'
import { Separator } from '../ui/separator'
import NavItems from './NavItems'
import Link from 'next/link'
  

const MobileNav = ({userId}) => {
  return (
    <div>
      <Sheet>
        <SheetTrigger className='align-middle'>
            <Image 
                src="/assets/icons/menu.png" alt="Menu" width={24} height={24}
                className='cursor-pointer'
                style={{ maxWidth: 'none' }} 
            />
        </SheetTrigger>
        <SheetContent className="flex flex-col gap-6 bg-white md:hidden">
            <Image src="/assets/images/logo192.png" width={40} height={40} />
            <Separator className="border border-gray-200"/>
            {!userId && <li className={`p-medium-16 whitespace-nowrap`}>
                <Link href="/login">Login</Link>
            </li>}
            <NavItems />
            {!userId && <li className={`p-medium-16 whitespace-nowrap`}>
                <Link href="/signup">Signup</Link>
            </li>}
        </SheetContent>
        </Sheet>

    </div>
  )
}

export default MobileNav

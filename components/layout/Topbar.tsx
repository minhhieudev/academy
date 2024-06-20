"use client"
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { Search } from 'lucide-react'
import { UserButton, useAuth } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'

const Topbar = () => {

  const topRoutes = [
    { label: "Instructor", path: "/instructor/courses" },
    { label: "Learning", path: "/learning" }
  ]

  const { userId } = useAuth()
  return (
    <div className='flex justify-between items-center p-4'>
      <Link href="/">
        <Image src='/logo.png' height={100} width={200} alt='logo' />
      </Link>
      <div className='max-md:hidden w-[400px] rounded-full flex'>
        <input className='flex-grow bg-[#FFF8EB] rounded-l-full border-none text-sm pl-4 py-3' placeholder='Search for courses'></input>
        <button className='bg-[#FDAB04] rounded-r-full border-none outline-none cursor-pointer px-4 py-3 hover:bg-[#FDAB04]/80' ><Search className='w-4 h-4' /></button>
      </div>
      <div className="flex gap-6 items-center">
        <div className="max-sm:hidden flex gap-6">
          {topRoutes.map(rou => (
            <Link href={rou.path} key={rou.path} className='text-sm font-medium hover:text-[#FDAB04]'>{rou.label} </Link>
          ))}
        </div>
        {userId ? (<UserButton afterSignOutUrl='/sign-in' />) : (<Link href='/sign-in'><Button>Sign In</Button></Link>)}
      </div>
     
    </div>
  )
}

export default Topbar

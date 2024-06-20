"use client"
import { BarChart4, MonitorPlay } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Sidebar = () => {
    const pathname = usePathname()
    const items = [
        { icon: <MonitorPlay />, lable: "Courses", path: "/instructor/courses" },
        { icon: <BarChart4 />, lable: "Performance", path: "/instructor/performance" }
    ]
    return (
        <div className='max-sm:hidden flex flex-col w-64 border-r shadow-md px-3 my-4 gap-4 text-sm font-medium'>
            {items.map(route => (
                <Link href={route.path} key={route.path} className={`flex items-center gap-4 p-3 rounded-lg hover:bg-[#FFF8EB] ${pathname.startsWith(route.path) && "bg-[#FDAB04] hover:bg-[#FDAB04]/80"}`}>{route.icon}{route.lable}</Link>
            ))}
        </div>
    )
}

export default Sidebar

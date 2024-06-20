import Topbar from '@/components/layout/Topbar'
import React, { Children } from 'react'

function HomeLayout({children}: {children: React.ReactNode}) {
  return (
    <div>
      <Topbar/>
      {children}
    </div>
  )
}

export default HomeLayout

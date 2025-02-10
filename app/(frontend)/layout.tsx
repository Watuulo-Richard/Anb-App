import React, { ReactNode } from 'react'
import Header from '@/components/header';
export default function DashboardLayout({children}:{children:ReactNode}) {
  return (
    <div>
        <div>
          <Header />
        </div>
        <div>
          <main className="">
            {children}  
          </main>
        </div>
    </div>
  )
}
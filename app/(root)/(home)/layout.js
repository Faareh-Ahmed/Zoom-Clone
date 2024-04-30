import Navbar from '@/components/navbar'
import Sidebar from '@/components/sidebar'
import React from 'react'

const HomeLayout = ({children}) => {
  return (
    <main className=' relative text-white'>
      <Navbar/>

        <div className=' flex sticky top-16 pt-16'>
            <Sidebar/>

            <section className=' flex min-h-screen flex-1 flex-col p-8'>
              <div className=' w-full'>
                {children}
              </div>
            </section>
        </div>
    </main>
  )
}

export default HomeLayout
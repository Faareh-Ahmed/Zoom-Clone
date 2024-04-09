import Navbar from '@/components/navbar'
import Sidebar from '@/components/sidebar'
import React from 'react'

const HomeLayout = ({children}) => {
  return (
    <main className=' relative text-white'>
      <Navbar/>

        <div className=' flex'>
            <Sidebar/>

            <section className=' flex min-h-screen flex-col p-8'>
              <div className=' w-full'>
                {children}
              </div>
            </section>
        </div>
    </main>
  )
}

export default HomeLayout
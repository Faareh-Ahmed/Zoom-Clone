import React from 'react'
import '../globals.css'
import StreamVideoProvider from '@/providers/streamClientProvider'
const RootLayout = ({children}) => {
  return (
    <main>
      <StreamVideoProvider>

        {children}
      </StreamVideoProvider>
    </main>
  )
}

export default RootLayout
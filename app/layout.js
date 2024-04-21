
import { Inter } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from "@/components/ui/toaster"

import "./globals.css";
import '@stream-io/video-react-sdk/dist/css/styles.css';
import { icons } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Chit Chat",
  description: "Video Calling Application",
  icons:{
    icon:'/icons/logo.svg'
  }
};

export default function RootLayout({ children }) {
  return (
      <ClerkProvider appearance={{
        layout:{
          logoImageUrl: 'icons/yoom-logo.svg',
          socialButtonsVariant: 'iconButton'
        },
        variables:{
          colorText: '#fff',
          colorPrimary:'#0E78F9',
          colorBackground: '#1c1f2e',
          colorInputBackground:'#252a41',
          colorInputText:'#fff'
        }
      }}>
    <html lang="en">
      <body className={`${inter.className} bg-dark-1`}>
        {children}
        <Toaster />
      </body>
    </html>
    </ClerkProvider>
  );
}

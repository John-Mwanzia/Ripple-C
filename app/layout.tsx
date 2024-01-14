import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import { StoreProvider } from '@/contexts/store'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Tradvow Company',
  description: 'Welcome to Tradvow, where collaboration fuels success! Join our community of forward-thinkers and investors. With our unique referral system, earn rewards as you grow your network. Invite friends, earn credits, and embark on a journey to financial empowerment together. Join today and lets ride the wave of success as a team!',
icons :{
  icon:[
    '/favicon.ico?v=4',
  ],
  apple:[
    '/apple-touch-icon.png?v=4',
  ],
  shortcut:[
    '/apple-touch-icon.png'
  ],


}
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <StoreProvider>
    <html lang="en">
      <body className={inter.className}>{children}
      <Toaster position='top-center' />
      
      </body>
    </html>
    </StoreProvider>
    
  )
}

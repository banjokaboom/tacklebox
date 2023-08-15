'use client'

import './assets/css/globals.css'
import { Inter } from 'next/font/google'
import Header from './components/header'
import Footer from './components/footer'
import React, { Suspense } from 'react'
import { Analytics } from '@vercel/analytics/react'
import Loader from './components/loader'
import { GoogleOAuthProvider } from '@react-oauth/google'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7012167562751887"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className={inter.className}>
        <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID || ''}>
          <Header></Header>
          <main className="p-12 pt-6 pb-6 lg:p-24 lg:pt-8 lg:pb-8 bg-cyan-700 mx-auto">
            <Suspense
              fallback={
                <div className="flex flex-col items-center justify-between">
                  <div className="max-w-5xl w-full">
                    <Loader />
                  </div>
                </div>
              }
            >
              {children}
            </Suspense>
          </main>
          <Footer></Footer>
          <Analytics />
        </GoogleOAuthProvider>
      </body>
    </html>
  )
}

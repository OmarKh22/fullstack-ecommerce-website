import React from 'react'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'

function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default FrontendLayout
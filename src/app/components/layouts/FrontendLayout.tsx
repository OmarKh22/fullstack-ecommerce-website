import React from 'react'
import Navbar from '../navbar/Navbar'

function FrontendLayout({children} : {children: React.ReactNode}) {
  return (
    <>
        <Navbar />
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
            <h1>Hi from FrontendLayout</h1>
            {children}
        </div>
    </>
)
}

export default FrontendLayout
import Footer from '@/components/organisms/Footer'
import Navbar from '@/components/organisms/Navbar'
import React from 'react'

function MarketingLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Navbar />
            {children}
            <Footer />
        </div>
    )
}

export default MarketingLayout

import React from 'react'
import HeroSection from './HeroSection'
import Category from './Category'
import Jobs from './Jobs'
import Footer from './Footer'

const Home = () => {
  return (
    <div className='w-full h-screen mx-auto'>
      <HeroSection />
      <Category />
      <Jobs />
      <Footer />
    </div>
  )
}

export default Home

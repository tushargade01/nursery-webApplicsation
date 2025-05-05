import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
const Home = () => {
  return (
    <div className='w-full'>
      <Hero/>
      <div className='px-[4vw] sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
          <LatestCollection/>
          <BestSeller/>
          <OurPolicy/>
      </div>
    </div>
  )
}

export default Home

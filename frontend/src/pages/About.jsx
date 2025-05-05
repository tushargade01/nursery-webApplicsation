import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div className='px-[4vw] sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'}/>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>
          Welcome to Botanicozy – Pune’s very own digital nursery where nature meets comfort, and every plant tells a story.

Born from a love for greenery and a passion to reconnect city life with nature, Botanicozy is more than just a plant shop — it’s your personal gateway to a greener, calmer, cozier lifestyle.
          </p>
          <p>
          In today’s concrete jungle, we often forget how powerful a single plant can be. A touch of green can lift your spirits, clean the air, reduce stress, and bring life into any dull corner of your home or office. But let’s face it — not everyone has the time or the know-how to run around nurseries and get their hands dirty.
          </p>
          <p>
          We’re making plant parenting easy, joyful, and accessible — all with a few taps on your screen. Whether you’re a seasoned plant lover or just starting out, we’ll help you build your very own indoor jungle — no stress, no mess.
          </p>
        </div>
      </div>
    </div>
  )
}

export default About

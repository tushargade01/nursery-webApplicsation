import React from 'react'
import Title from '../components/Title'
const Contact = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      {/* leftside */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'GET'} text2={'IN TOUCH'}/>
        </div>
        <div className='flex gap-3'>
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='First Name'/>
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Last Name'/>
        </div>
        <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="email" placeholder='Email Address'/>
        <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Phone Number'/>
        <textarea rows='8' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Message'></textarea>
        <button className='bg-black w-30 text-white font-light px-8 py-2 mt-4 hover:cursor-pointer'>Submit</button>
      </div>


      {/* right side */}
      <div className='lg:ml-10'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'CONTACT'} text2={'US'}/>
        </div>
        <div className='flex gap-3 flex-col'>
          <div>
            <p className='text-1xl'>Address</p>
            <p className='text-gray-600'>Office No. 7A, Second Floor, Innovation Hub, Gokhalenagar, Pune, Maharashtra – 411016, India</p>
          </div>
          <div>
            <p>Phone</p>
            <p className='text-gray-600'>+917387092151</p>
          </div>
          <div>
            <p>Email</p>
            <p className='text-gray-600'>info@botanicozy.in</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact

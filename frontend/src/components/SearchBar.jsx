import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';

const SearchBar = () => {
    const {search, setSearch, showSearch, setShowSearch} = useContext(ShopContext);
  return showSearch ? (
    <div className='border-t border-b bg-gray-50 text-center'>
        <div className='inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2'>
          <input value={search} onChange={(e)=>setSearch(e.target.value)} className='flex-1 outline-none bg-inherit text-sm' type="text" placeholder='Search'/>
          <img className='w-4' src={assets.search_icon} alt="" />
        </div>
        <img onClick={()=>setShowSearch(false)} className='inline w-3 cursor-pointer' src={assets.cross_icon} alt="" />
        <div className='flex justify-center  gap-3 mb-3'>
          <button className='border flex gap-2 items-center justify-center px-5 py-2 cursor-pointer' onClick={()=>setSearch("home")}>For Home 
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"></path>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h12"></path>
          </svg>
          </button>

          <button className='border flex gap-2 items-center justify-center px-5 py-2 cursor-pointer' onClick={()=>setSearch("office")}>For Office 
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"></path>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h12"></path>
          </svg>
          </button>

          <button className='border flex gap-2 items-center justify-center px-5 py-2 cursor-pointer' onClick={()=>setSearch("hotel")}>For Hotel
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"></path>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h12"></path>
            </svg>
          </button>
        </div>
    </div>
  ) : null
}

export default SearchBar

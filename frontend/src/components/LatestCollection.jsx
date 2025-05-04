import React,{ useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {

    const { products} = useContext(ShopContext);
    const [latestProducts,setLatestProducts] = useState([]);

    useEffect(()=>{
        setLatestProducts(products.slice(0,10));
    },[products])

  return (
    <div className='my-10'>
        <div className=' text-center py-8 text-3xl'>
            <Title text1={'LATEST'} text2={'COLLECTION'}/>
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>this is Welcome to our platform! We strive to provide the best experience with high-quality content and seamless navigation. Explore our collection and stay updated with the latest trend</p>
    
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 mt-3'>
              {
                latestProducts.map((item,index)=>(
                  <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
                ))
              }
            </div>
        </div>
      
    </div>
  )
}

export default LatestCollection

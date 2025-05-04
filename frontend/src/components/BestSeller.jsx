import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {
    const { products } = useContext(ShopContext);
    const [bestSeller, setBestSeller] = useState([]);

    useEffect(() => {

        if (products && products.length > 0) {
            const bestProduct = products.filter((item) => item.bestSeller === true);

            setBestSeller(bestProduct.slice(0, 5));
        }
    }, [products]);

    return (
        <div className='my-10'>
            <div className='text-center text-3xl py-8'>
                <Title text1={'BEST'} text2={'SELLERS'} />
            </div>
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                Welcome to our platform! We strive to provide the best experience with high-quality content and seamless navigation. Explore our collection and stay updated with the latest trends.
            </p>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 mt-3'>
                {bestSeller.length > 0 ? (
                    bestSeller.map((item) => (
                        <ProductItem key={item._id} id={item._id} image={item.image} name={item.name} price={item.price} />
                    ))
                ) : (
                    <p className="col-span-5 text-center text-gray-500">No best sellers found.</p>
                )}
            </div>
        </div>
    );
};
 
export default BestSeller;

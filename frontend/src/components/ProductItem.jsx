import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({id,image,name,price}) => {

    const {currency} = useContext(ShopContext);

  return (
    <div>
        <Link className='text-gray-700 cursor-pointer' to={`/product/${id}`}>
            <div className='overflow-hidden'>
                <img className='hover:scale-110 transition ease-in-out' src={image[0]} alt="productImg" />
                <p className='pt-3 pb-1 text-sm text-left ml-3'>{name}</p>
                <p className='text-sm font-medium text-left ml-3'>{currency}{price}</p>
            </div>
        </Link>
      
    </div>
  )
}

export default ProductItem

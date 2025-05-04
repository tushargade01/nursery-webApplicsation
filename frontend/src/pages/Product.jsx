import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Ensure Toastify styles are applied

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');
  const [quantity, setQuantity] = useState(1);

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId]);

  const handleQuantityChange = (type) => {
    if (type === 'increase') {
      setQuantity(quantity + 1);
    } else {
      if (quantity > 1) {
        setQuantity(quantity - 1);
      } else {
        toast.info("Quantity must be greater than 1");
      }
    }
  };

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      <ToastContainer /> {/* Ensure the ToastContainer is present to display notifications */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        <div className='flex-1 flex gap-3 sm:flex-row justify-end'>
          <div className='w-full sm:w-[70%] flex justify-end'>
            <img className='w-full h-auto' src={image} alt='product' />
          </div>
        </div>

        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            <img src={assets.star_icon} alt='' className='w-3.5' />
            <img src={assets.star_icon} alt='' className='w-3.5' />
            <img src={assets.star_icon} alt='' className='w-3.5' />
            <img src={assets.star_icon} alt='' className='w-3.5' />
            <img src={assets.star_dull_icon} alt='' className='w-3.5' />
            <p className='pl-2'>(122)</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>{currency} {productData.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>

          <div className='flex items-center mt-5 gap-4'>
            <div className='flex items-center border border-gray-300 rounded px-4 py-2'>
              <button onClick={() => handleQuantityChange('decrease')} className='px-3 text-lg'>-</button>
              <span className='px-4'>{quantity}</span>
              <button onClick={() => handleQuantityChange('increase')} className='px-3 text-lg'>+</button>
            </div>
            <button onClick={() => addToCart(productData._id, quantity)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>
          </div>
          
          <hr className='mt-8 sm:w-4/5' />
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>Good Quality Trees.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  ) : <div className='opacity-0'></div>;
};

export default Product;

import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import axios from 'axios';
import { toast } from 'react-toastify';

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) return;

      const response = await axios.post(
        `${backendUrl}/api/order/userorders`,
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            allOrdersItem.push({
              ...item,
              orderId: order._id,
              status: order.status,
              payment: order.payment,
              paymentMethod: order.paymentMethod,
              date: order.date
            });
          });
        });
        setOrderData(allOrdersItem.reverse());
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error('Error loading orders:', error);
    }
  };

  const handleTrackOrder = async (orderId) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/track`,
        { orderId },
        { headers: { token } }
      );
  
      if (response.data.success) {
        
        await loadOrderData();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error tracking order:', error.message);
      toast.error('Something went wrong while tracking the order.');
    }
  };
  
  

  const handleCancelProduct = async (orderId, productId) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/cancel`,
        { orderId, productId },
        { headers: { token } }
      );

      if (response.data.success) {
        
        await loadOrderData();
      } else {
        toast.error(response.data.message || 'Cancellation failed');
      }
    } catch (error) {
      console.error('Error canceling product:', error.message);
      toast.error('Something went wrong while canceling the product.');
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="border-t pt-16 px-[4vw] sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <div className="text-2xl mb-6">
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      <div className="flex flex-col gap-4">
        {orderData.map((item, index) => (
          <div
            key={index}
            className="p-4 border rounded-lg shadow-sm bg-white text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
          >
            <div className="flex gap-4">
              <img
                className="w-20 h-20 object-cover rounded-md"
                src={item.image[0]}
                alt="order-img"
              />
              <div className="text-sm sm:text-base">
                <p className="font-medium">{item.name}</p>
                <div className="flex flex-wrap gap-4 mt-2 text-base text-gray-700">
                  <p className="text-lg font-semibold">
                    {currency} {item.price}
                  </p>
                  <p>Qty: {item.quantity}</p>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Date:{' '}
                  <span className="text-gray-400">
                    {item.date
                      ? new Date(item.date).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })
                      : 'N/A'}
                  </span>
                </p>
              </div>
            </div>

            <div className="flex flex-col md:items-end gap-3 md:gap-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                <p className="text-sm md:text-base">{item.status || 'Pending'}</p>
              </div>

              <button
                className="border border-gray-400 px-4 py-1.5 rounded text-sm font-medium hover:bg-gray-100 transition"
                onClick={() => handleTrackOrder(item.orderId)}
              >
                Track Order
              </button>

              <button
                className="border border-red-400 text-red-500 px-4 py-1.5 rounded text-sm font-medium hover:bg-red-50 transition"
                onClick={() => handleCancelProduct(item.orderId, item._id)}
              >
                Cancel Product
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;

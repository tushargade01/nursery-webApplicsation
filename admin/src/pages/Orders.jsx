import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchAllOrders = async () => {
    if (!token) return;

    setLoading(true);
    setError('');

    try {
      const response = await axios.post(
        `${backendUrl}/api/order/list`,
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        setOrders(response.data.orders || []);
      } else {
        setError(response.data.message || 'Failed to fetch orders');
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error(err.message);
      setError('Something went wrong while fetching orders.');
    } finally {
      setLoading(false);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/status`,
        { orderId, status: event.target.value },
        { headers: { token } }
      );

      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">All Orders</h2>

      {loading && <p>Loading orders...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && orders.length === 0 && (
        <p>No orders found.</p>
      )}

      {!loading && !error && orders.length > 0 && (
        <ul className="space-y-6">
          {orders.map((order) => (
            <li key={order._id} className="border p-4 rounded-lg shadow flex flex-col sm:flex-row gap-4">
              <img src={assets.parcel_icon} alt="Parcel" className="w-16 h-16" />

              <div className="flex-1">
                <div className="mb-2">
                  {order.items.map((item, i) => (
                    <p key={i}>
                      <span className="font-medium">{item.name}</span> × {item.quantity}
                    </p>
                  ))}
                </div>

                <div className="mb-2">
                  <p className="font-semibold">Shipping To:</p>
                  <p>{order.address.firstName} {order.address.lastName}</p>
                  <p>{order.address.street}</p>
                  <p>{order.address.city}, {order.address.state}, {order.address.country} - {order.address.zipCode}</p>
                  <p>{order.address.phone}</p>
                </div>

                <div className="text-sm text-gray-600 mt-2">
                  <p><strong>Items:</strong> {order.items.length}</p>
                  <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
                  <p><strong>Payment:</strong> {order.payment ? 'Done' : 'Pending'}</p>
                  <p><strong>Order Date:</strong> {new Date(order.date).toLocaleString()}</p>
                </div>
                <p>{currency}{order.amount}</p>
                <select 
                  value={order.status}
                  onChange={(event) => statusHandler(event, order._id)}
                >
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipping">Shipping</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Orders;

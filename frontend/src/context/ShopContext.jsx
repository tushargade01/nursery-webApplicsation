import { createContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = '₹';
    const delivery_fee = 150;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState('');
    const navigate = useNavigate();

    const getCartCount = () => {
        let totalCount = 0;
        try {
            for (const item in cartItems) {
                if (cartItems[item] > 0) {
                    totalCount += cartItems[item];
                }
            }
        } catch (error) {
            console.error("Error in getCartCount:", error);
        }
        return totalCount;
    };

    const addToCart = async (itemId, itemQuantity) => {
        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            cartData[itemId] += itemQuantity;
        } else {
            cartData[itemId] = itemQuantity;
        }

        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(
                    backendUrl + '/api/cart/add',
                    {
                        userId: localStorage.getItem('userId'),
                        itemId,
                        quantity: itemQuantity
                    },
                    {
                        headers: { token }
                    }
                );
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    };

    const updateQuantity = async (itemId, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId] = quantity;
        setCartItems(cartData);

        try {
            await axios.post(backendUrl+ '/api/cart/update',{itemId,quantity},{headers:{token}})
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    const getCartAmount = () => {
        let totalAmount = 0;

        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);

            try {
                if (cartItems[items] > 0 && itemInfo) {
                    totalAmount += itemInfo.price * cartItems[items];
                }
            } catch (error) {
                console.log("Error calculating total:", error);
            }
        }

        return totalAmount;
    };

    const getProductData = async () => {
        try {
            const responce = await axios.get(backendUrl + '/api/product/list');
            if (responce.data) {
                setProducts(responce.data.products);
            } else {
                toast.error(responce.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    const getUserCart = async (token)=>{
        try {
            const response = await axios.post(backendUrl+'/api/cart/get',{},{headers:{token}});

            if(response.data.success){
                setCartItems(response.data.cartData);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    useEffect(() => {
        getProductData();
    }, []);

    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'));
            getUserCart(localStorage.getItem('token'))
        }
    }, []);

    const value = {
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        addToCart,
        setCartItems,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate,
        backendUrl,
        setToken,
        token
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;

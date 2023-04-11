import React from 'react';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { formatDistanceToNow, formatRelative } from 'date-fns';

import axios from 'axios';

function Orderhistory() {

    const [orders, setOrders] = useState([]);

    const [user, setLoginUser] = useState({})

    useEffect(() => {
        setLoginUser(JSON.parse(localStorage.getItem("MyUser")))
    }, [])

    const getOrders = async () => {
        try {
            const { data } = await axios.post("http://localhost:9002/orderhistory", { user })
            return data
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const result = await getOrders();
            setOrders(result)
        }
        fetchData()
    }, [user])

    return (
        <div className="bg-gray-900 min-h-screen">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-3xl font-extrabold text-white">Order History</h1>
                <div className="mt-6">
                    {orders.map((order) => (
                        <div
                            key={order._id}
                            className="bg-gray-800 rounded-lg shadow-md mt-6"
                        >
                            <div className="px-6 py-4">
                                <div className="flex justify-between items-center">
                                    <div className="text-lg font-bold text-yellow-200">
                                        Order # : {order._id}
                                    </div>
                                    <div className="text-base font-medium text-lime-300	">
                                        {formatRelative(new Date(order.createdAt), new Date())}
                                    </div>
                                </div>
                                <div className="mt-4">
                                    {order.items.map((product) => (
                                        <div key={product.title} className="flex items-center">
                                            <div className="text-base font-medium text-white">
                                                {product.title} x
                                            </div>
                                            <div className="text-base font-medium text-white">
                                                 {product.qty}
                                            </div>
                                            <div className="ml-auto text-base font-medium text-gray-400">
                                                {product.price}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-4 flex justify-between items-center">
                                    <div className="text-base font-medium text-white">
                                        Total Price: {order.price}
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Orderhistory;

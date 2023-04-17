import React from 'react';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { formatDistanceToNow, formatRelative } from 'date-fns';
import {
    Collapse,
    initTE,
} from "tw-elements";

import axios from 'axios';

function Orderhistory() {
    initTE({ Collapse });

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
            Hello
        </div>
    );
}

export default Orderhistory;
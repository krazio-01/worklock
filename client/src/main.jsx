import React from 'react'
import ReactDOM from 'react-dom/client'
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider
} from 'react-router-dom';
import Layout from './Layout.jsx';
import Home from './Pages/home/Home.jsx';
import Booking from './Pages/booking/Booking.jsx';
import Food from './Pages/food/Food.jsx';
import Contact from './Pages/contact/Contact.jsx';
import Auth from './Pages/authentication/Auth.jsx';
import Admin from './Pages/admin/Admin.jsx';
import ManageCafe from './Pages/admin/manageCafe/ManageCafe.jsx';
import NotFound from './Pages/404/NotFound.jsx'
import { ToastContainer } from 'react-toastify';
import './index.css';
import axios from 'axios';

axios.defaults.baseURL = `${import.meta.env.VITE_APP_BASE_URL}/api`;

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path='/' element={<Layout />}>
                <Route index element={<Home />} />
                <Route path='booking' element={<Booking />} />
                <Route path='food' element={<Food />} />
                <Route path='contact' element={<Contact />} />
            </Route>

            <Route path='/admin' element={<Layout />}>
                <Route index element={<Admin />} />
                <Route path='manageCafe' element={<ManageCafe />} />
            </Route>

            <Route path='/login' element={<Auth />} />
            <Route path='*' element={<NotFound />} />
        </>
    )
)

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
        <ToastContainer />
    </React.StrictMode>
)

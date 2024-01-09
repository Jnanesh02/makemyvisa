import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './Footer/Footer';
import Navbar from './NavBar/Navbar';
import Service from '../Service/Service';
const Layout = () => {
    return (
        <>
        <Navbar/>
        <Outlet/>
       <Service/>
        <Footer/>
            
        </>
    );
}

export default Layout;

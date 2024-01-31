import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import Navbar from '../components/NavBar/Navbar';
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

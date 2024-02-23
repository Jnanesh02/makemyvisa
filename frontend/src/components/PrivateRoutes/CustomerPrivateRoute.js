import React,{useEffect} from 'react'
import { Outlet ,Navigate,useNavigate} from 'react-router-dom'
import CookieUtils from '../cookie/Cookies';

const PrivateRoute = () => {
    const navigate=useNavigate()
    useEffect(() => {
      function isTokenExpired() {
        const token = CookieUtils.getCookies('userId');
        if (!token) {
          return true;
        }
        const tokenData = JSON.parse(atob(token.split('.')[1]));
        const expirationTime = tokenData.exp * 1000;
        const currentTime = new Date().getTime();
        return expirationTime < currentTime;
      }
  
      const interval = setInterval(() => {
        if (isTokenExpired()) {
          navigateToAdminLogin();
        }
      }, 600000);
  
      return () => clearInterval(interval);
    },[]);
  
    function navigateToAdminLogin() {
      CookieUtils.removeCookies('userId');
      navigate('/login');
    }



    const employeeId = CookieUtils.getCookies("userId");
    // const employeeId = true;
    if(!employeeId){
        
        return <Navigate to='/login'  />
    }else{
        return <Outlet/>
    }


 
}

export default PrivateRoute

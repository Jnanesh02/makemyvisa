import React,{useEffect} from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import CookieUtils from './Cookie/Cookies';
import postServiceCollectionApi from './ApiServices/ApiService';
const Google = () => {
    const navigate=useNavigate();
    const getUser = async () => {
		try {
			const url = `${process.env.REACT_APP_BACKEND_URL}/customer/auth/login/success`;
			const { data } = await axios.get(url, { withCredentials: true });
      if(data.message.token) {
             CookieUtils.setCookies("userId",data.message.token);
             const dummyTicketCookie = CookieUtils.getCookies("servicename");
             if (dummyTicketCookie) {
               await postServiceCollectionApi(dummyTicketCookie, CookieUtils.getCookies("userId"));
             }
            navigate('/dashboard')
      }
		} catch (err) {
			console.log(err);
		}
	};

    useEffect(() => {
        
     
          getUser()
       
        },[]);
  return (
    <div>
      
    </div>
  )
}

export default Google

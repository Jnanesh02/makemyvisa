import React,{useEffect} from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
const Google = () => {
    const navigate=useNavigate();
    const getUser = async () => {
		try {
			const url = `${process.env.REACT_APP_BACKEND_URL}/customer/auth/login/success`;
			const { data } = await axios.get(url, { withCredentials: true });
    
			localStorage.setItem("userId",data.user.userid);
            navigate('/dashboard')
      
		} catch (err) {
			console.log(err);
		}
	};

    useEffect(() => {
        
     
          getUser()
       
        });
  return (
    <div>
      
    </div>
  )
}

export default Google

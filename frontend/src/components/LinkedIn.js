import React,{useEffect} from 'react'

import {useLocation,useNavigate  } from "react-router-dom";

const LinkedIn = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');
    const navigate = useNavigate();
    localStorage.setItem("userId",token);


    const getLinkedInuser = async () => {
        try {
          // const url = `${process.env.REACT_APP_BACKEND_URL}/customer/auth/getinfo`;
          // const postData ={token} ; // Add any other required data in the request body
          // const { data } = await axios.post(url, postData, { withCredentials: true });
          // console.log("data:",data);
          
          // localStorage.setItem("userId",data.user.LinkedinID);
          // // localStorage.setItem("userId", data.user.userid);
          navigate('/dashboard')
        } catch (err) {
          console.log(err);
        }}

        useEffect(() => {
        
     
            getLinkedInuser()
         
          },[]);

  return (
    <div>
      
    </div>
  )
}

export default LinkedIn

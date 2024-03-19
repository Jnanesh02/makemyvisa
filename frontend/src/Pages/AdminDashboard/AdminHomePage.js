import React, { useEffect, useState } from "react";
import "./AdminDashboardStyles/AdminHome.css";
import { Piechart } from "../../components/Charts/Piechart";
import axios from "axios";
import { Donutchart } from "../../components/Charts/Donutchart";

const fetchServices = async (url, setData) => {
  try {
    const response = await axios.get(url);
    setData(response.data);
  } catch (error) {
    alert(error.message);
  }
};
function AdminHomePage() {
  const [serviceName, setServiceName] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hotelreservations, setHotelReservations] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchServices(
          `${process.env.REACT_APP_BACKEND_URL}/getservices/dummytickets`,
          setServiceName
        );
        await fetchServices(
          `${process.env.REACT_APP_BACKEND_URL}/getservices/hotelreservations`,
          setHotelReservations
        );
        setIsLoading(false);
      } catch (error) {
        alert(error.message);
      }
    };
    fetchData();
  }, []);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
     <div className="welcome-container">
      <h1 className="welcome-dummy-text">Welcome to Admin Dashboard</h1>
      </div>
      <div className="row m-5">
        <div className="col-md-6 p-0">
          <div className="flight-graph">
        <h3>flight</h3>
          <div id="flight-piechart">
            <Piechart data={serviceName} />
          </div>
          </div>
        </div>
        <div className="col-md-6 p-0">
        <div className="flight-graph">
        <h3>Hotel Reservation</h3>
        <div id="flight-piechart">
         
          <div id="Insurance-donutChart">
            <Donutchart data={hotelreservations} />
          </div>
</div>
</div>
        </div>
      </div></>
   
    
  );
}

export default AdminHomePage;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import CookieUtils from "../../../components/Cookie/Cookies";
import TicketService from "./DummyTicket";
import VisaTicket from "./VisaTicket";
export const Services = () => {
  const { serviceName } = useParams();
  const [formData, setFormData] = useState([]);
  const [assignedTicket, setAssignedTicket] = useState([]);
  const [error, setError] = useState(null);
  const [loading,setLoading] = useState(false);

  const token = CookieUtils.getCookies("adminToken");
  const tokenData = JSON.parse(atob(token.split(".")[1]));
  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/employeeticket`,
        {
          params: {
            employe_id: tokenData.id,
            departmentName: `${tokenData.department}s`,
          },
        }
      );
      if (response.status === 200 ) {
        setFormData(response.data);
        if(response.data.status === "occupied"){
        fetchEmployeTickets(response.data.assignto);
        }
      } else {
        setFormData(response.data);
      }
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    }
  };
  const fetchEmployeTickets = async (data) => {
    try {
      const fetchTicket = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/employeeticket`,
        {
          params: {
            employe_id: data.ticketId,
            departmentName: `${data.ticketName}s`,
          },
        }
      );
      setAssignedTicket(fetchTicket);
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, [loading]);
  const renderTicketComponent = ()=>{
    if(!formData){
      return <p>Loading ...</p>
    }
    if(formData.status !== 'occupied'  || formData.assignto?.ticketName !== serviceName){
      return <p>No Ticket Available</p>
    }
    switch(serviceName){
      case "dummyticket":
        return <TicketService serviceName={serviceName} data={assignedTicket} setLoading={setLoading}/>;
      default:
        return <p>Unsupported service: {serviceName}</p>;
    }
  }
  return (
    <div>
      <div className="main-department-section">
        <div className="dep-tbl">
          <h2>{`${serviceName} Tickets`}</h2>
        </div>
        {renderTicketComponent()}
      </div>
    </div>
  );
};

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import CookieUtils from "../../components/Cookie/Cookies";
export const Services = () => {
  const { serviceName } = useParams();
  const [formData, setFormData] = useState([]);
  const [assignTicketDetails, setAssignTicketDetails] = useState([]);

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
      if (response.status === 200 && response.data.status === "occupied") {
        setFormData(response.data);
        fetchEmployeTickets(response.data.assignto);
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
      setAssignTicketDetails(fetchTicket);
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);
  const downloadDocuments = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getPresignalUrlDownload`,
        {
          params: {
            customerId: "65ddc4c6b2b7c3bf692258a5",
          },
        }
      );
      if (response.status === 200 && response.data.message.length > 0) {
        const documentUrls = response.data.message;
      const downloadOne = async (url) => {
        try {
          const downloadLink = document.createElement("a");
          downloadLink.href = url;
        } catch (error) {
          console.error("Error downloading document:", url, error);
        }
      };
      if (documentUrls.length === 1) {
        await downloadOne(documentUrls[0]);
      } else {
        for (let i = 0; i < documentUrls.length; i++) {
          await downloadOne(documentUrls[i]);
        }
      }
    } else {
      console.warn("No documents available for download.");
    }
    } catch (error) {
      alert("Error downloading");
    }
  };
  const handleDownload = () => {
    downloadDocuments();
  };
  return (
    <div>
      <div className="main-department-section">
        <div className="dep-tbl">
          <h2>{`${serviceName} Tickets`}</h2>
        </div>
        {formData.status === "occupied" &&
        formData.assignto?.ticketName === serviceName ? (
          <table className="employee-table">
            <thead>
              {serviceName === "visastatuse" ? (
                <tr>
                  <th>FirstName</th>
                  <th>Email</th>
                  <th>Passport</th>
                  <th>PhoneNumber</th>
                  <th>Current Country</th>
                  <th>Destination Country</th>
                  <th>Additional Document</th>
                  <th>Document status</th>
                  <th>Documents view</th>
                </tr>
              ) : (
                <tr>
                  <th>FirstName</th>
                  <th>Email</th>
                  <th>Passport</th>
                  <th>PhoneNumber</th>
                  <th>Current Country</th>
                  <th>Destination Country</th>
                  <th>Additional Document</th>
                  <th>Document status</th>
                </tr>
              )}
            </thead>
            <tbody>
              {assignTicketDetails.data &&
              assignTicketDetails.data.data.formData ? (
                <tr key={assignTicketDetails._id}>
                  <td>{assignTicketDetails.data.data.formData.firstName}</td>
                  <td>{assignTicketDetails.data.data.formData.email}</td>
                  <td>{assignTicketDetails.data.data.formData.passport}</td>
                  <td>{assignTicketDetails.data.data.formData.phoneNumber}</td>
                  <td>{assignTicketDetails.data.data.formData.country}</td>
                  <td>
                    {assignTicketDetails.data.data.formData.destination ||
                      "empty"}
                  </td>
                  <td>{assignTicketDetails.data.data.formData.passport}</td>
                  <td>{assignTicketDetails.data.data.formData.status}</td>
                  <td>
                    {" "}
                    <button onClick={handleDownload}>download Document</button>
                  </td>
                </tr>
              ) : (
                <tr>
                  <td colSpan="8">No ticket available</td>
                </tr>
              )}
            </tbody>
          </table>
        ) : (
          <p>No Ticket available</p>
        )}
      </div>
    </div>
  );
};

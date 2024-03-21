import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./CostumerDashboardStyles/Employee.css";
import CookieUtils from "../../components/Cookie/Cookies";
const TicketStatus = () => {
  const [ticketDetails, setTicketDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const [error, setError] = useState(null); // Handle errors
  const { dummytickets } = useParams({});

  useEffect(() => {
    const fetchTicketDetails = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const customerId = CookieUtils.getCookies("userId");
        const objectID = JSON.parse(atob(customerId.split(".")[1]));
        const customerID = objectID.id;

        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/getservice/${dummytickets}`,
          { params: { customerID } }
        );
        if (response.status === 200) {
          setTicketDetails(response.data);
        } else {
          setError(`API error: ${response.statusText}`);
        }
      } catch (err) {
        setError(`Error fetching data: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTicketDetails();
  }, [dummytickets]);


  console.log("ticketDetails",ticketDetails);
  return (
    <div>
      {isLoading ? (
        <p>Loading ticket details...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <>
          {ticketDetails.length > 0 ? (
            <table className="employee-table">
              <thead>
                <tr className="fw-bold align-middle text-center">
                  <th>Passengers</th>
                  <th>Passenger Details</th>
                  <th>Departure Country</th>
                  <th>Arrive Country</th>
                  <th>Departure Date</th>
                  <th>Return Date</th>
                  <th>Trip Type</th>
                  <th>Payment Link</th>
                  <th>Price</th>
                  <th>Ticket Status</th>
                </tr>
              </thead>
              <tbody className="align-middle text-center ">
                {ticketDetails.map((ticket, key) => (
                  <tr key={`${ticket._id}-${key}`} className="justify-content-center">
                    <td>{ticket.data.numberOfPassengers}</td>
                    <td style={{width:'20%'}}>
                      {ticket?.data?.passengerDetails.map((details, subKey) => (
                        <span key={subKey} className="card mb-2 p-2 bg-light">
                          <span className="fw-bold"><span className="fw-normal">Given Name : </span>{details.givenName || "-"}</span>
                          <span className="fw-bold"><span className="fw-normal">Surname :
                          </span> {details.surname || "-"}</span> 
                         <span className="fw-bold"><span className="fw-normal">Age :
                         </span>
                           {details.age || "-"}</span>
                          <span className="fw-bold"><span className="fw-normal">Date of Birth : </span>{details.dateOfBirth || "-"}</span>
                          <span className="fw-bold"><span className="fw-normal">Passport Number : </span>{details.passportNumber || "-"}</span>
                          <span className="fw-bold"><span className="fw-normal">Date of Issue : </span>{details.dateOfIssue || "-"}</span>
                          <span className="fw-bold"><span className="fw-normal">Date of Expiry : </span>{details.dateOfExpiry || "-"}</span>
                        </span>
                      ))}
                    </td>
                    <td>{ticket.data.from}</td>
                    <td>{ticket.data.to}</td>
                    <td>{ticket.data.departureDate}</td>

                    <td>{ticket.data.returnDate || "-"}</td>
                    <td>{ticket.data.tripType}</td>
                    {(ticket.price === "" || ticket.price === "awaiting") &&
                    ticket.ticketStatus !== "completed" ? (
                      <td>{"awaiting"}</td>
                    ) : ticket.ticketStatus === "completed" ? (
                      <td>Payment Completed</td>
                    ) : (
                      <td>
                        <Link to="/payment-link">Payment Link</Link>
                      </td>
                    )}
                    <td>{ticket.price || "awaiting "}</td>
                    <td>{ticket.ticketStatus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No tickets available.</p>
          )}
        </>
      )}
    </div>
  );
};

export default TicketStatus;

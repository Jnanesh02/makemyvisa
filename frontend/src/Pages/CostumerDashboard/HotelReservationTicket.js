import axios from 'axios';
import React ,{useState,useEffect} from 'react'
import { useParams,Link } from 'react-router-dom';
import "./CostumerDashboardStyles/Employee.css"
import CookieUtils from '../../components/cookie/Cookies';

export const HotelReservationTicket = () => {
    const [ticketDetails, setTicketDetails] = useState([]);
    const [isLoading, setIsLoading] = useState(false); 
    const [error, setError] = useState(null); 
    const {hotelreservations} = useParams({});
  
  
    useEffect(() => {
      const fetchTicketDetails = async () => {
        setIsLoading(true);
        setError(null); 
  
        try {
          const customerId = CookieUtils.getCookies('userId');
          const objectID = JSON.parse(atob(customerId.split('.')[1]));
          const customerID = objectID.id;
          const response = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/getservice/${hotelreservations}`,
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
    }, [hotelreservations]);
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
                <tr>
                  <th>ArrivalCountry</th>
                  <th>Check In</th>
                  <th>Check Out</th>
                  <th># Passengers</th>
                  <th>Passenger Details</th>
                  <th>Payment Details</th>
                  <th>Price</th>
                  <th>Ticket Status</th>
                </tr>
              </thead>
              <tbody>
                {ticketDetails.map((ticket, key) => (
                  <tr key={`${ticket._id}-${key}`}>
                    <td>{ticket.data.arrivalCountry}</td>
                    <td>{ticket.data.checkIn}</td>
                    <td>{ticket.data.checkOut}</td>
                    <td>{ticket.data.numberOfPassengers}</td>
                    <td>
                      {ticket?.data?.passengerDetails.map((details, subKey) => (
                        <span key={subKey}>
                          {details.name || '-'} ({details.age || '-'}) ({details.passportNumber || '-'})<br />
                        </span>
                      ))}
                    </td>
                    {/* <td>{ticket.paymentDetails || '-'}</td> */}
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
                    <td>{ticket.price || 'awaiting '}</td>
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
    )
}

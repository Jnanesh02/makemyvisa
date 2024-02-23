import axios from 'axios';
import React ,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom';
import "./CostumerDashboardStyles/Employee.css"
import CookieUtils from '../../components/cookie/Cookies';
const TicketStatus = () => {
  const [ticketDetails, setTicketDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const [error, setError] = useState(null); // Handle errors
  const {dummytickets} = useParams({});


  useEffect(() => {
    const fetchTicketDetails = async () => {
      setIsLoading(true);
      setError(null); 

      try {
        const customerId = CookieUtils.getCookies("userId");
        const objectID = JSON.parse(atob(customerId.split('.')[1]));
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
                <th>Departure Date</th>
                <th>From</th>
                <th># Passengers</th>
                <th>Passenger Details</th>
                <th>Return Date</th>
                <th>To</th>
                <th>Trip Type</th>
                <th>Payment Details</th>
                <th>Price</th>
                <th>Ticket Status</th>
              </tr>
            </thead>
            <tbody>
              {ticketDetails.map((ticket, key) => (
                <tr key={`${ticket._id}-${key}`}>
                  <td>{ticket.data.departureDate}</td>
                  <td>{ticket.data.from}</td>
                  <td>{ticket.data.numberOfPassengers}</td>
                  <td>
                    {ticket?.data?.passengerDetails.map((details, subKey) => (
                      <span key={subKey}>
                        {details.name || '-'} ({details.age || '-'}) ({details.passportNumber || '-'})<br />
                      </span>
                    ))}
                  </td>
                  <td>{ticket.data.returnDate || '-'}</td>
                  <td>{ticket.data.to}</td>
                  <td>{ticket.data.tripType}</td>
                  <td>{ticket.paymentDetails || '-'}</td>
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

export default TicketStatus

import axios from "axios";
import React, { useState } from "react";


const TicketService = ({ serviceName, data,setLoading }) => {
  const [disablePriceInput, setDisablePriceInput] = useState(
    data.data?.price === ""
  );

  const [price,setPrice]= useState("");
  const priceUpdate = async()=>{
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/employe/priceupdate`,{
        serviceName: `${serviceName}`,
        ticketId: data.data._id,
        price: price.price
      })
      if(response.status === 200){
        setLoading(true);
      }
    } catch (error) {
      alert(error.message);
    }
  }
  const handleSubmit = () =>{
    priceUpdate();
  }
  const onChangeInput = (event)=>{
    event.preventDefault();
    setPrice((prevData)=>({
      ...prevData,
      [event.target.name]:event.target.value
    }));
  }
  
  return (
    <>
      <table className="employee-table">
        <thead>
          <tr>
            <th>No-Of-Passenger</th>
            <th>Passenger Details</th>
            <th>TripType</th>
            <th>Current Country</th>
            <th>Destination Country</th>
            <th>From Date</th>
            <th>Return Date</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.data && data.data.data ? (
            <tr>
              <td>{data.data.data.numberOfPassengers}</td>
              <td>{data.data.data.from}</td>
              <td>{data.data.data.tripType}</td>
              <td>{data.data.data.from}</td>
              <td>{data.data.data.to}</td>
              <td>{data.data.data.departureDate}</td>
              <td>{data.data.data.returnDate ? "" : "empty"}</td>
              {data.data.price === "" ? (
                <>
                  <td>
                    <>
                      $
                      <input
                        type="number"
                        id="price"
                        name="price"
                        onChange={onChangeInput}
                        disabled={disablePriceInput}
                      />
                    </>
                  </td>
                  <td>
                    <button onClick={handleSubmit}>Submit</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{data.data.price}</td>
                  <td>
                    <button>Edit</button>
                  </td>
                </>
              )}
            </tr>
          ) : (
            <tr>
              <td colSpan="8">No ticket available</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default TicketService;

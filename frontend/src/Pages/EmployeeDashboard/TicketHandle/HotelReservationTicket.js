import axios from "axios";
import React, { useState } from "react";

const TicketService = ({ serviceName, data, setLoading }) => {
  const [disablePriceInput, setDisablePriceInput] = useState(
    data.data?.price === ""
  );
  const [isEditing, setIsEditing] = useState(false);
  const [price, setPrice] = useState({});
  
  const handleEdit = () => {
    setIsEditing(true);
  };
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const closeForm = () => {
    setIsOpen(false);
  };

  const priceUpdate = async () => {
    try {
      console.log("price", price);
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/employe/priceupdate`,
        {
          serviceName: `${serviceName}`,
          ticketId: data.data._id,
          price: price.price,
        }
      );
      if (response.status === 200) {
        setLoading(true);
      }
    } catch (error) {
      alert(error.message);
    }
  };
  const handleSubmit = () => {
    priceUpdate();
  };
  const onChangeInput = (event) => {
    event.preventDefault();
    console.log("event",event.target);
    setPrice((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };
  console.log("DATA:",data.data  );
  return (
    <>
  <table className="employee-table">
        <thead>
          <tr>
            <th>No-Of-Passenger</th>
            <th>Passenger Details</th>
            <th>ArrivalCountry</th>
            <th>CheckIn</th>
            <th>CheckOut</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.data && data.data.data ? (
            <tr>
              <td>{data.data.data.numberOfPassengers}</td>
              <td>{data?.data?.data?.passengerDetails.map((details, subKey) => (
                        <span key={subKey} className="card mb-2 p-2 bg-light">
                        <span className="fw-bold"><span className="fw-normal">Given Name : </span>{details.givenName || "-"}</span>
                        <span className="fw-bold"><span className="fw-normal">Surname :
                        </span> {details.surname || "-"}</span> 
                       <span className="fw-bold"><span className="fw-normal">Age :
                       </span>
                         {details.age || "-"}</span>
                         <span className="fw-bold"><span className="fw-normal">Phone Number :
                       </span>
                         {details.phonenumber || "-"}</span>
                        <span className="fw-bold"><span className="fw-normal">Passport Number : </span>{details.passportNumber || "-"}</span>
                        <span className="fw-bold"><span className="fw-normal">Date of Issue : </span>{details.dateOfIssue || "-"}</span>
                        <span className="fw-bold"><span className="fw-normal">Date of Expiry : </span>{details.dateOfExpiry || "-"}</span>
                      </span>
                      ))}</td>
              <td>{data.data.data.arrivalCountry}</td>
              <td>{data.data.data.checkIn}</td>
              <td>{data.data.data.checkOut}</td>
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
                  {isEditing ? (
                    <>
                      <td>
                      $
                        <input
                          type="text"
                          id="price"
                          name="price"
                          value={price.price}
                          onChange={onChangeInput}
                          placeholder="Eg: 2000/-"
                        />
                      </td>
                      <td>
                        <button onClick={toggleModal}>Save</button>
                      </td>
                      {isOpen && (
                        <div
                          className="modal mx-auto"
                          style={{
                            display: "block",
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                          }}
                        >
                          <div className="modal-dialog">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5 className="modal-title">Message</h5>
                                <button
                                  type="button"
                                  className="btn-close"
                                  onClick={closeForm}
                                ></button>
                              </div>
                              <div className="modal-body">
                                <div>Do you want to change?</div>
                              </div>
                              <div class="modal-footer">
                                <button
                                  type="button"
                                  class="btn btn-secondary"
                                  data-bs-dismiss="modal"
                                  onClick={closeForm}
                                >
                                  Close
                                </button>
                                <button
                                  type="button"
                                  class="btn btn-primary"
                                  onClick={handleSubmit}
                                >
                                  Save
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <td>$ {data.data.price}</td>
                      <td>
                        <button onClick={handleEdit}>Edit</button>
                      </td>
                    </>
                  )}
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

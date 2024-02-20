import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DummyTicketForm.css';
import CookieUtils from '../../../components/cookie/Cookies';
import { useParams } from 'react-router-dom';
function DummyTicketForm() {
  const [formData, setFormData] = useState({
    tripType: 'oneWay',
    DepartureDate:'',
    returnDate: '',
    departureDate: '',
    numberOfPassengers: 1,
    passengerDetails: [{ name: '', age: '', passportNumber: '' }],
    from: '',
    to: '',
  });
  const {dummyticket} = useParams({});
  const { tripType, returnDate,departureDate, passengerDetails, from, to } = formData;
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePassengerChange = (index, field, value) => {
    const updatedPassengerDetails = [...passengerDetails];
    updatedPassengerDetails[index][field] = value;
    setFormData({ ...formData, passengerDetails: updatedPassengerDetails });
  };

  const handleAddPassenger = () => {
    setFormData({
      ...formData,
      numberOfPassengers: formData.numberOfPassengers + 1,
      passengerDetails: [...passengerDetails, { name: '', age: '', passportNumber: '' }],
    });
  };

  const handleRemovePassenger = (index) => {
    const updatedPassengerDetails = passengerDetails.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      numberOfPassengers: formData.numberOfPassengers - 1,
      passengerDetails: updatedPassengerDetails,
    });
  };

  const handleSubmit = async () => {
    console.log("data:",formData)
    try {
      if (localStorage.getItem('userId')) {
        navigate('/dashboard');
      } else {
        const cookieData = {
          formData: formData,
          dummyTicket: dummyticket
      };
        CookieUtils.setCookies('dummyTicket',JSON.stringify(cookieData));
        navigate('/login');
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className='dummy-ticket-form-container'>
      <div className="container mx-auto shadow bg-body rounded p-5 dummytickets">
        <h2 className='text-center dummy-text-heading'>
          {/* <i className="fas fa-plane"></i>  */}
          
<svg class="flight-icon" xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 -960 960 960" width="40"><path d="m319.5-319-104-49 8.5-8.5 93.5 13.5 170-168.5-269-148 14.5-16 330 89 84.5-88q9.5-9.5 21.75-9.5t22.25 9.5Q701-685 701-672t-9.5 22.5l-85 86.5L696-234l-15.5 16.5-149-268.5L365-319l12.5 95.5-9 9-49-104.5Z"/></svg>
       <span>  Dummy Ticket </span>
        </h2>
        <div className="form-group">
          <div className="form-group triptype">
            <h4 className="form-label">Trip Type:</h4>
            <div className="trip-type-radio">
              <label className="form-check-label">
                <input class="form-check-input " type="radio" name="tripType" value="oneWay" checked={tripType === 'oneWay'} onChange={handleChange} />
                One Way
              </label>
              <label className="form-check-label">
                <input class="form-check-input" type="radio" name="tripType" value="roundTrip" checked={tripType === 'roundTrip'} onChange={handleChange} />
                Round Trip
              </label>
            </div>
          </div>
          <div className="from-to-group">
            <div className='fromto'>
              <label className="form-label">Arrival City:</label>
              <input type="text" className="dummy-form-control form-control" name="from" placeholder="Country Name" value={from} onChange={handleChange} />
            </div>
            <div className='fromto'>
              <label className="form-label">Departure City:</label>
              <input type="text" className="dummy-form-control form-control" name="to" placeholder="Country Name" value={to} onChange={handleChange} />
            </div>
          </div>
        </div>
        <div className="form-group">
          <div className="date-group">
            <div className='Departure_date'>
              <label className="label_Departure form-label">Departure Date:</label>
              <input type="date" className="dummy-form-control form-control" value={departureDate} name="departureDate" onChange={handleChange}/>
            </div>
            {tripType === 'roundTrip' && (
              <>
                <div className='Return_date'>
                  <label className="label_return">Return Date:</label>
                  <input type="date" className="dummy-form-control form-control" value={returnDate} name="returnDate" onChange={handleChange} />
                </div>
              </>
            )}
          </div>
        </div>

        <div>
          <div className='d-flex justify-content-between'>
          <h4 className="form-label"> Passenger Details: </h4>
            <button className="btn btn-primary add-passangers" onClick={handleAddPassenger}><i className="fas fa-plus"></i> Add Passenger</button>
          </div>
          
          <table class="table table-dummyticket">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col"> Age</th>
                <th scope="col">Passport Number</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {passengerDetails.map((passenger, index) => (
                <tr key={index}>
                  <td><input type="text" className="dummy-form-control form-control" value={passenger.name} onChange={(e) => handlePassengerChange(index, 'name', e.target.value)} /></td>
                  <td><input type="text" className="dummy-form-control form-control" value={passenger.age} onChange={(e) => handlePassengerChange(index, 'age', e.target.value)} /></td>
                  <td><input type="text" className="dummy-form-control form-control" value={passenger.passportNumber} onChange={(e) => handlePassengerChange(index, 'passportNumber', e.target.value)} /></td>
                  <td><button className="btn btn-danger" onClick={() => handleRemovePassenger(index)}><i className="fas fa-minus"></i></button></td>
                </tr>
              ))}
            </tbody>
          </table>
          
        </div>
        <button className="btn btn-success" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default DummyTicketForm;

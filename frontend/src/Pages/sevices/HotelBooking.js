import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import './DummyTickets/DummyTicketForm.css';
import CookieUtils from '../../components/cookie/Cookies';
import { useParams } from 'react-router-dom';
export const HotelBooking = () => {
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
      const {  passengerDetails, from } = formData;
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
            <h2 className='text-center'><i className="fa fa-bed"></i>Hotel Reservation</h2>
            <div className="form-group">
              <div className="from-to-group">
                <div className='fromto'>
                  <h4 className="form-label">Arrival City:</h4>
                  <input type="text" className="dummy-form-control" name="from" placeholder="Country Name" value={from} onChange={handleChange} />
                </div>
              </div>
            </div>
    
            <div>
              <div className='d-flex justify-content-between mb-2'>
                <h3>Passenger Details:</h3>
                <button className="btn btn-primary me-5" onClick={handleAddPassenger}><i className="fas fa-plus"></i> Add Passenger</button>
              </div>
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Passport Number</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {passengerDetails.map((passenger, index) => (
                    <tr key={index}>
                      <td><input type="text" className="dummy-form-control" value={passenger.name} onChange={(e) => handlePassengerChange(index, 'name', e.target.value)} /></td>
                      <td><input type="text" className="dummy-form-control" value={passenger.age} onChange={(e) => handlePassengerChange(index, 'age', e.target.value)} /></td>
                      <td><input type="text" className="dummy-form-control" value={passenger.passportNumber} onChange={(e) => handlePassengerChange(index, 'passportNumber', e.target.value)} /></td>
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

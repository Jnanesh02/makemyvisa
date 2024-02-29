import React, { useState } from "react";
import axios from "axios";
import PhoneInput from "react-phone-input-2";

const CourierPickup = () => {
  const [formData, setFormData] = useState({
    ParcelWeight:"",
    pickUpAddress: "",
    pickUpMobile: "+91",
    pickUpDepart: "",
    pickUpFrom:"",
    pickUpTo:"",
    deliveryAddress: "",
    deliveryMobile: "+91",
    deliveryArrive: "",
    deliveryFrom:"",
    deliveryTo:""
  });



  const handleInputChange = (name,value) => {
   
    
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const renderOptions = () => {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
      const time = hour.toString().padStart(2, "0") + ":00";
      options.push(<option key={time} value={time}>{time}</option>);
    }
    return options;
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("formdata",formData);
    
    
    axios
      .post("/api/submit", formData)
      .then((response) => {
        
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
      });
  };

  return (
    <div>
      <div
        style={{
       
          backgroundSize: "100% 100%",
          backgroundColor: "#e0e0e0",
          backgroundRepeat: "no-repeat",
          height: "250px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h2
          className="text-center"
          style={{ color: "#fe5141", fontSize: "60px" }}
        >
          Courier And Pickup
        </h2>
      </div>
      <form onSubmit={handleSubmit}>
      <div className="courierpickupform">
        <div className="courierpickupform__From mb-3">
          <h4>From</h4>
          <div className="card p-3">
            <div className="mb-3">
              <label htmlFor="pickUpAddressInput" className="form-label">
                Pick up Address
              </label>
              <input
                type="text"
                className="form-control"
                id="pickUpAddressInput"
                name="pickUpAddress"
                value={formData.pickUpAddress}
                onChange={(e)=> handleInputChange(e.target.name,e.target.value)}
                placeholder="Street name & Locality Name"
                required
              />
            </div>

<div className="ed">
            <div className="mb-3 w-50">
              <label htmlFor="pickUpMobileInput" className="form-label">
                10-digit mobile
              </label>
              
              <PhoneInput
                    placeholder="Phone Number"
                    name="pickUpMobile"
                    id="pickUpMobileInput"
                    
                    value={formData.pickUpMobile}
                    onChange={(value)=>handleInputChange("pickUpMobile",value)
                    }
                    required
                  />
            </div>
            <div className="w-50">
              <label htmlFor="WeightInput" className="form-label">
                Weight
              </label>
              <select className="form-select" aria-label="Default select example"
              name="ParcelWeight"
              value={formData.ParcelWeight}
              onChange={(e)=> handleInputChange(e.target.name,e.target.value)}
              required
              >
                <option defaultValue>Weight</option>
                <option value="<5">{`<${5}kg`}</option>
                <option value="<10">{`<${10}kg`}</option>
                <option value="<15">{`<${15}kg`}</option>
                <option value=">15">{`>${15}kg`}</option>
              </select>
            </div>
            </div>


            <div className="mb-3">
              <label className="form-label">Depart</label>
              <div className="d-flex align-items-center">
                <input
                  type="date"
                  id="departureDate"
                  className="form-control"
                  value={formData.pickUpDepart}
                  onChange={(e)=> handleInputChange(e.target.name,e.target.value)}
                  name="pickUpDepart"
                  required
                />
                From
                <select className="form-select mx-2" aria-label="From" name="pickUpFrom" value={formData.pickUpFrom} onChange={(e)=> handleInputChange(e.target.name,e.target.value)} required>
                  <option value="">Select</option>
                  {renderOptions()}
                </select>
                To
                <select className="form-select" aria-label="To" name="pickUpTo" value={formData.pickUpTo} onChange={(e)=> handleInputChange(e.target.name,e.target.value)} required>
                  <option value="">Select</option>
                  {renderOptions()}
                </select>
              </div>
            </div>
           
          </div>
        </div>
        <div className="courierpickupform__To">
          <h4>To</h4>
          <div className="card p-3">
            <div className="mb-3">
              <label htmlFor="deliveryAddressInput" className="form-label">
                Delivery Address
              </label>
              <input
                type="text"
                className="form-control"
                id="deliveryAddressInput"
                name="deliveryAddress"
                value={formData.deliveryAddress}
                onChange={(e)=> handleInputChange(e.target.name,e.target.value)}
                placeholder="Drop off Locality/street"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="deliveryMobileInput" className="form-label">
                10-digit mobile
              </label>
              
              <PhoneInput
                    placeholder="Phone Number"
                    name="deliveryMobile"
                    id="deliveryMobileInput"
                    
                    value={formData.deliveryMobile}
                    onChange={(value)=>handleInputChange("deliveryMobile",value)
                    }
                    required
                  />
            </div>
            <div className="mb-3">
              <label className="form-label">Arrive</label>
              <div className="d-flex align-items-center">
                <input
                  type="date"
                  id="departureDate"
                  className="form-control"
                  value={formData.deliveryArrive}
                  onChange={(e)=> handleInputChange(e.target.name,e.target.value)}
                  name="deliveryArrive"
                  required
                />
                From
                <select className="form-select" aria-label="From" name="deliveryFrom" value={formData.deliveryFrom} onChange={(e)=> handleInputChange(e.target.name,e.target.value)} required>
                  <option value="">Select</option>
                  {renderOptions()}
                </select>
                To
                <select className="form-select" aria-label="To" name="deliveryTo" value={formData.deliveryTo} onChange={(e)=> handleInputChange(e.target.name,e.target.value)} required>
                  <option value="">Select</option>
                  {renderOptions()}
                </select>
              </div>
            </div>
           
          </div>
        </div>
        
       
      </div>
      </form>
      <div className="courierpickupform__submitbutton mt-3 text-center mb-3">
          <button
            
            className="btn btn-danger"
            type="submit"
          >
            Submit
          </button>
        </div>
    </div>
  );
};

export default CourierPickup;

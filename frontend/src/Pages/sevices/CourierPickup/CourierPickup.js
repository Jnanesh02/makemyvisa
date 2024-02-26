import React, { useState } from "react";
import axios from "axios";

const CourierPickup = () => {
  const [formData, setFormData] = useState({
    selectedOption: null,
    pickUpAddress: "",
    pickUpMobile: "",
    pickUpDepart: "",
    pickUpTextarea: "",
    deliveryAddress: "",
    deliveryMobile: "",
    deliveryArrive: "",
    deliveryTextarea: "",
    sendingDetails: "",
    preferCourierWithBag: false,
  });



  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: newValue,
    }));
  };

  const handleNameClick = (name) => {
    setFormData((prevState) => ({
      ...prevState,
      sendingDetails: name,
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
  console.log("formdata",formData);
  const handleSubmit = () => {
    axios
      .post("/api/submit", formData)
      .then((response) => {
        console.log(response.data);
        setFormData({
          selectedOption: null,
          pickUpAddress: "",
          pickUpMobile: "",
          pickUpDepart: "",
          pickUpTextarea: "",
          deliveryAddress: "",
          deliveryMobile: "",
          deliveryArrive: "",
          deliveryTextarea: "",
          sendingDetails: "",
          preferCourierWithBag: false,
        });
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
      });
  };

  return (
    <div>
      <div
        style={{
          backgroundImage:
            "url('https://www.gopackagingstore.com/sites/all/themes/hwcps_zen/images/topper/pickupdelivery_topper.png')",
          backgroundSize: "50% 100%",
          backgroundRepeat: "no-repeat",
          height: "400px",
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
      <div className="courierpickupform w-50 mx-auto mt-5">
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
                onChange={handleInputChange}
                placeholder="Street name & Locality Name"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="pickUpMobileInput" className="form-label">
                10-digit mobile
              </label>
              <input
                type="text"
                className="form-control w-50"
                id="pickUpMobileInput"
                name="pickUpMobile"
                value={formData.pickUpMobile}
                onChange={handleInputChange}
                placeholder="Mobile number"
              />
            </div>
            <div>
              <label htmlFor="pickUpMobileInput" className="form-label">
                Weight
              </label>
              <select className="form-select" aria-label="Default select example">
                <option selected>Weight</option>
                <option value="1">1kg to 5kg</option>
                <option value="2">5kg to 10kg</option>
                <option value="3">10kg to 15kg</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Depart</label>
              <div className="d-flex align-items-center">
                <input
                  type="date"
                  id="departureDate"
                  className="form-control mb-3"
                  value={formData.pickUpDepart}
                  onChange={handleInputChange}
                  name="pickUpDepart"
                />
                From
                <select className="form-select mx-2" aria-label="From" name="deliveryFrom" value={formData.pickUpFrom} onChange={handleInputChange}>
                  <option value="">Select</option>
                  {renderOptions()}
                </select>
                To
                <select className="form-select" aria-label="To" name="deliveryTo" value={formData.pickUpTo} onChange={handleInputChange}>
                  <option value="">Select</option>
                  {renderOptions()}
                </select>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="pickUpTextarea" className="form-label">
                Pickup Instructions
              </label>
              <textarea
                className="form-control"
                id="pickUpTextarea"
                rows="3"
                name="pickUpTextarea"
                value={formData.pickUpTextarea}
                onChange={handleInputChange}
                placeholder="flat number, floor, building name, street name, landmarks, contact name, etc."
              ></textarea>
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
                onChange={handleInputChange}
                placeholder="Drop off Locality/street"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="deliveryMobileInput" className="form-label">
                10-digit mobile
              </label>
              <input
                type="text"
                className="form-control"
                id="deliveryMobileInput"
                name="deliveryMobile"
                value={formData.deliveryMobile}
                onChange={handleInputChange}
                placeholder="Mobile number"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Arrive</label>
              <div className="d-flex align-items-center">
                <input
                  type="date"
                  id="departureDate"
                  className="form-control mb-3"
                  value={formData.deliveryArrive}
                  onChange={handleInputChange}
                  name="deliveryArrive"
                />
                From
                <select className="form-select" aria-label="From" name="deliveryFrom" value={formData.deliveryFrom} onChange={handleInputChange}>
                  <option value="">Select</option>
                  {renderOptions()}
                </select>
                To
                <select className="form-select" aria-label="To" name="deliveryTo" value={formData.deliveryTo} onChange={handleInputChange}>
                  <option value="">Select</option>
                  {renderOptions()}
                </select>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="deliveryTextarea" className="form-label">
                Delivery Instructions
              </label>
              <textarea
                className="form-control"
                id="deliveryTextarea"
                rows="3"
                name="deliveryTextarea"
                value={formData.deliveryTextarea}
                onChange={handleInputChange}
                placeholder="flat number, floor, building name, street name, landmarks, contact name, etc."
              ></textarea>
            </div>
          </div>
        </div>
        <div className="courierpickupform__sendingdetails mt-3 ">
          <div className="card p-3">
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                name="sendingDetails"
                value={formData.sendingDetails}
                onChange={handleInputChange}
                placeholder="what are you sending?"
              />
            </div>
            <div >
              <span
                className="name-link mx-2"
                onClick={() => handleNameClick("Food")}
                style={{color:"#e12912"}}
              >
                Food
              </span>
              <span
                className="name-link mx-2"
                onClick={() => handleNameClick("Cloth")}
                style={{color:"#e12912"}}
              >
                Cloth
              </span>
              <span
                className="name-link mx-2"
                onClick={() => handleNameClick("Groceries")}
                style={{color:"#e12912"}}
              >
                Groceries
              </span>
              <span
                className="name-link mx-2"
                onClick={() => handleNameClick("Flowers")}
                style={{color:"#e12912"}}
              >
                Flowers
              </span>
              <span
                className="name-link mx-2"
                onClick={() => handleNameClick("CakeParcel")}
                style={{color:"#e12912"}}
              >
                CakeParcel
              </span>
            </div>
          </div>
        </div>
        <div className="courierpickupform__courierbag mt-4">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value={formData.preferCourierWithBag}
              id="flexCheckDefault"
              onChange={handleInputChange}
              name="preferCourierWithBag"
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Prefer Courier with Delivery Bag
            </label>
          </div>
        </div>
        <div className="courierpickupform__submitbutton mt-3 text-center">
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourierPickup;

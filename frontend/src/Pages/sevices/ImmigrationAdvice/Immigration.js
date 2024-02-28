import React, { useState, useEffect } from "react";
import axios from "axios";
import ImmigrationImg from "../../../assets/images/Immigration-Lawyer-Kent-UK-Picture.jpg";
import PhoneInput from "react-phone-input-2";
export const Immigration = () => {
  const initialData = {
    fullName: "",
    email: "",
    phoneNumber: "+91",
    visaAssistanceDescription: "",
    presentcountry: "",
    destinationCountry: "",
  };
  const [formData, setFormData] = useState(initialData);
  const [countriesData, setCountriesData] = useState([]);

  

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/getcountries`
        );
        if (Array.isArray(response.data.message)) {
          setCountriesData(response.data.message);
        } else {
          setCountriesData([]);
        }
      } catch (error) {
        alert(error.message);
      }
    };

    fetchCountries();
  }, []);
  const onchangeInput = (name,value) => {
        setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("submit", formData);
      const response = await axios.post("/api/submit", formData);
      console.log(response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setFormData(initialData);
    }
  };

  const [showFullText, setShowFullText] = useState(false);

  const toggleText = () => {
    setShowFullText(!showFullText);
  };
  return (
    <div>
      <div style={{ position: "relative", textAlign: "center" }}>
        <img
          src={ImmigrationImg}
          className="w-100"
          style={{ height: "400px" }}
          alt="/"
        />
        <h2
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "#fe5141",
            fontSize: "60px",
          }}
        >
          Immigration Advice
        </h2>
      </div>

      <div
        className="VisaAssistance__box p-5 d-flex justify-content-around"
        
      >
        <div
          className="VisaAssistance__Content w-50"
          style={{ margin: "0 auto", maxWidth: "600px" }}
        >
          <h3
            className="VisaAssistance__title"
            style={{ textTransform: "capitalize" }}
          >
            Immigration Advice
          </h3>
          <p
            style={{
              wordSpacing: "2px",
              letterSpacing: "1px",
              textAlign: "justify",
            }}
          >
            {showFullText
              ? "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente minus vero cupiditate placeat quam soluta aliquam doloribus reiciendis molestias dolorum consequuntur commodi, possimus optio nihil maiores, voluptatem quaerat. Necessitatibus debitis minima molestias veritatis hic voluptas nisi ex magni asperiores fugit corrupti amet, veniam, tenetur unde iste aperiam voluptates quaerat. Mollitia quam impedit, veniam architecto dignissimos ullam, accusamus nulla aliquam, totam porro voluptatem odio maxime dolorum velit nobis fuga iure itaque veritatis aliquid. Quibusdam provident quas odio. Deleniti id temporibus, voluptatibus qui dolore nisi dignissimos ipsa omnis voluptas excepturi quibusdam ullam consequuntur distinctio aut perferendis placeat, ratione repellendus obcaecati magni reiciendis?"
              : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente minus vero cupiditate placeat quam soluta aliquam doloribus reiciendis molestias dolorum consequuntur commodi, possimus optio nihil maiores, voluptatem quaerat. Necessitatibus debitis minima molestias veritatis hic voluptas nisi ex magni asperiores fugit corrupti amet, veniam, tenetur unde iste aperiam voluptates quibusdam."}
          </p>
          <button className="btn btn-link" onClick={toggleText}>
            {showFullText ? "Read Less" : "Read More"}
          </button>
        </div>
        <div className="VisaAssistance__FormApplication card p-3 ">
          <div className="VisaAssistance__Form">
            <h3 className="VisaAssistance__Form--title">
              Request a call back from our Visa Assistance experts
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="FullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={(e)=> onchangeInput(e.target.name,e.target.value)}
                  placeholder="Full Name"
                  required
                />
              </div>
              <div className="row mb-3">
                <div className="col">
                  <input
                    type="email"
                    className="form-control"
                    id="Email"
                    name="email"
                    value={formData.email}
                    onChange={(e)=> onchangeInput(e.target.name,e.target.value)}
                    placeholder="name@example.com"
                    required
                  />
                </div>
                <div className="col">
                  

                  <PhoneInput
                    placeholder="Phone Number"
                    name="phoneNumber"
                    id="phonenumber"
                    className='w-100'
                    value={formData.phoneNumber}
                    onChange={(value, country) =>
                      onchangeInput("phoneNumber", value)
                    }
                    required
                  />
                </div>
              </div>
              <div className="mb-3">
                <textarea
                  className="form-control"
                  id="VisaExperts"
                  name="visaAssistanceDescription"
                  placeholder="Please explain your situation to our Visa Assistance Experts"
                  value={formData.visaAssistanceDescription}
                  onChange={(e)=> onchangeInput(e.target.name,e.target.value)}
                  rows="3"
                  required
                ></textarea>
              </div>
              <div className="row mb-3">
                <div className="col">
                  <select
                    className="form-select"
                    id="country"
                    name="presentcountry"
                    value={formData.presentcountry}
                    onChange={(e)=> onchangeInput(e.target.name,e.target.value)}
                    required
                  >
                    <option value="">Choose your country</option>
                    <option value="India">India</option>
                    {countriesData
                      .filter(
                        (country) =>
                          country.countryName !== formData.destinationCountry
                      )
                      .map((country) => (
                        <option key={country._id} value={country.countryCode}>
                          {country.countryName}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="col">
                  <select
                    className="form-select"
                    id="destination"
                    name="destinationCountry"
                    value={formData.destinationCountry}
                    placeholder="Choose a destination"
                    onChange={(e)=> onchangeInput(e.target.name,e.target.value)}
                    required
                  >
                    <option value="">Choose your destination</option>
                    {countriesData
                      .filter(
                        (country) => country.countryName !== formData.presentcountry
                      )
                      .map((country) => (
                        <option key={country._id} value={country.countryName}>
                          {country.countryName}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <button type="submit" className="btn btn-danger mx-auto d-block">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

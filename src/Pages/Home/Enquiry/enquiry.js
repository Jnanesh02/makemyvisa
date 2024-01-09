import React, { useEffect, useState } from "react";

const Enquiry = () => {
  useEffect(() => {
    const handleScroll = () => {
      const header = document.getElementById("myHeader");
      const sticky = header.offsetTop;

      if (window.scrollY > sticky) {
        header.classList.add("sticky");
      } else {
        header.classList.remove("sticky");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const initialEnquiryData = {
    name: "",
    phoneNumber: "",
    email: "",
    serviceType: "",
    serviceDetails: "",
    description: "",
    source: "",
    destination: "",
  };
  const [EnquiryData, setEnQuiryData] = useState(initialEnquiryData);

  // handleInputChange
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEnQuiryData({ ...EnquiryData, [name]: value });
  };

  return (
    <>
      <div className="header-form" id="myHeader">
        <div className="slider-form">
          <h4 className="mb-3 form-heading"> Query Form </h4>
          <form>
            <div className="mb-4 form-inputs-controls">
              <input
                type="text"
                placeholder="Name"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name="name"
                required
                autoComplete="off"
                value={EnquiryData.name}
                onChange={(event) => {
                  handleInputChange(event);
                }}
              />
            </div>
            <div className="mb-4 form-inputs-controls">
              <input
                type="text"
                className="form-control"
                placeholder="Phone no"
                name="phoneNumber"
                value={EnquiryData.phoneNumber}
                id="exampleInputPhoneNumber"
                maxLength={10}
                minLength={10} 
                required
                autoComplete="off"
                onChange={(event) => {
                  handleInputChange(event);
                }}
              />
            </div>
            <div className="mb-4 form-inputs-controls">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                name="email"
                value={EnquiryData.email}
                required
                autoComplete="off"
                id="exampleInputPassword1"
                onChange={(event) => {
                  handleInputChange(event);
                }}
              />
            </div>
            <select
              className="form-select mb-4 form-inputs-controls"
              aria-label="Default select example"
              type="text"
              placeholder="ServiceType"
              name="serviceType"
              value={EnquiryData.serviceType}
              onChange={(event) => {
                handleInputChange(event);
              }}
              required
              autoComplete="off"
            >
              <option value="" disabled>
                Select Service Type
              </option>
              <option value="visa">Visa</option>
              <option value="insurance">Insurance</option>
            </select>
            {EnquiryData.serviceType === "visa" && (
              <select
                className="form-select mb-4 form-inputs-controls"
                aria-label="Default select example"
                value={EnquiryData.serviceDetails}
                name="serviceDetails"
                onChange={(event) => {
                  handleInputChange(event);
                }}
              >
                <option value="" disabled>
                  Choose Type of Visa
                </option>
                <option value="work">Work Visa</option>
                <option value="student">Student Visa</option>
                {/* Add more visa types as needed */}
              </select>
            )}

            <button
              type="submit"
              className="btn btn-primary submit form-control-btn"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Enquiry;

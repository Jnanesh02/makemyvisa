import React, { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../../../assets/images/OJO4YQ0.jpg";
import "react-phone-input-2/lib/style.css";
import { State } from "country-state-city";
import axios from "axios";
import SocialMediaAccount from "../SocialAccount/SocialMediaAccount";

function SignUp() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    phonenumber: "91",
    serviceType: "",
    country: { countryCode: "in", name: "India" }, // Default country code
    state: "", // New field for service type
  });

  const [states, setStates] = useState([]);
  const [Country, setCountry] = useState("");
  const [errors, setErrors] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    phonenumber: "",
    country: "",
    state: "",
  });

  useEffect(() => {
    if (inputs.country) {
      const statesForSelectedCountry = State.getStatesOfCountry(
        inputs.country.countryCode.toUpperCase()
      );
      const countryname = inputs.country.name;
      setStates(statesForSelectedCountry);
      setCountry(countryname);
    }
  }, [inputs.country]);

  const validateForm = () => {
    const newErrors = {};
    if (inputs.firstname.trim() === "") {
      newErrors.firstname = "First Name is required";
    } else {
      if (inputs.firstname.trim().length < 3) {
        newErrors.firstname = "First Name must be at least 3 characters long";
      }
      const nameRegex = /^[a-zA-Z]+$/;
      if (!nameRegex.test(inputs.firstname)) {
        newErrors.firstname = "First Name should only contain letters";
      }
    }
    if (inputs.lastname.trim() === "") {
      newErrors.lastname = "Last Name is required";
    } else {
      if (inputs.lastname.trim().length < 3) {
        newErrors.lastname = "Last Name must be at least 3 characters long";
      }
      const lastnameRegex = /^[a-zA-Z]+$/;
      if (!lastnameRegex.test(inputs.lastname)) {
        newErrors.lastname = "Last Name should only contain letters";
      }
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inputs.email)) {
      newErrors.email = "Email is required";
    }
    if (!inputs.password?.trim()) {
      newErrors.password = "Password is required";
    } else {
      const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*\d).{8,}$/;
      if (!passwordRegex.test(inputs.password)) {
        newErrors.password =
          "Password must contain at least one special character, one capital letter, and one number. Minimum length is 8 characters.";
      }
    }
    if (!inputs.confirmPassword?.trim()) {
      newErrors.confirmPassword = "Confirm Password is required";
    } else if (inputs.confirmPassword !== inputs.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    const mobileNumberRegex = /^\d{10,}$/;
    if (!mobileNumberRegex.test(inputs.phonenumber)) {
      newErrors.phonenumber = "Mobile Number should be a 10-digit number";
    }
    if (!inputs.country || !Country) {
      newErrors.country = "Please select a valid country";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStateChange = (event) => {
    setInputs((prev) => ({
      ...prev,
      state: event.target.value,
    }));
  };

  const handleCountryChange = (event) => {
    const selectedCountryCode = event.target.value;
    const selectedCountry = State.getCountryByCode(selectedCountryCode);

    setInputs((prev) => ({
      ...prev,
      country: {
        countryCode: selectedCountryCode,
        name: selectedCountry?.name || "",
      },
    }));
  };

  const handlePhoneChange = (value, country) => {
    setInputs((prev) => ({
      ...prev,
      phonenumber: value,
      country: country,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/customer/register`,
          {
            firstName: inputs.firstname,
            lastName: inputs.lastname,
            email: inputs.email,
            phoneNumber: inputs.phonenumber,
            state: inputs.state,
            country: inputs.country.name,
            password: inputs.password,
          }
        );
        if (response.data) {
          alert(response.data.message);
          navigate("/login");
        }
      } catch (error) {
        alert(error.response.data.message);
      }
    } else {
      alert("Form contains errors. Please fix them.");
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <main>
      <section
        className="certificate-section sing-up"
        style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="container-fluid  signupForm">
          <div className="row">
            <div className="col-lg-12">
              <h2 className="sign-up-text"> Sign Up </h2>
            </div>
            <div className="row">
              <div className="col-lg-3"></div>
              <div className="col-lg-6 col-md-12 col-sm-12">
                <div className="login-forms">
                  <form onSubmit={handleSubmit}>
                    <div className="row mb-2">
                      <div className="col-md-6">
                        <input
                          placeholder="First Name"
                          type="text"
                          className="form-control"
                          id="firstName"
                          name="firstname"
                          value={inputs.firstname}
                          onChange={handleChange}
                        />
                        {errors.firstname && (
                          <div className="error-message">
                            {errors.firstname}
                          </div>
                        )}
                      </div>
                      <div className="col-md-6">
                        <input
                          placeholder="Last Name"
                          type="text"
                          className="form-control"
                          id="lastName"
                          name="lastname"
                          value={inputs.lastname}
                          onChange={handleChange}
                        />
                        {errors.lastname && (
                          <div className="error-message">{errors.lastname}</div>
                        )}
                      </div>
                    </div>

                    <div className="mb-2">
                      <input
                        placeholder="Email"
                        type="text"
                        className="form-control"
                        id="email"
                        name="email"
                        value={inputs.email}
                        onChange={handleChange}
                      />
                      {errors.email && (
                        <div className="error-message">{errors.email}</div>
                      )}
                    </div>

                    <div className="row mb-2">
                      <div className="col-md-6">
                        <div className="input-group">
                          <input
                            placeholder="Password"
                            type={showPassword ? "text" : "password"}
                            className="form-control"
                            id="password"
                            name="password"
                            value={inputs.password}
                            onChange={handleChange}
                          />
                          <span
                            className="input-group-text"
                            onClick={togglePasswordVisibility}>
                            <i
                              className={`fas ${
                                showPassword ? "fa-eye-slash" : "fa-eye"
                              }`}></i>
                          </span>
                        </div>
                        {errors.password && (
                          <div className="error-message">{errors.password}</div>
                        )}
                      </div>
                      <div className="col-md-6">
                        <div className="input-group">
                          <input
                            placeholder="Confirm Password"
                            type={showPassword ? "text" : "password"}
                            className="form-control"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={inputs.confirmPassword}
                            onChange={handleChange}
                          />
                          <span
                            className="input-group-text"
                            onClick={togglePasswordVisibility}>
                            <i
                              className={`fas ${
                                showPassword ? "fa-eye-slash" : "fa-eye"
                              }`}></i>
                          </span>
                        </div>
                        {errors.confirmPassword && (
                          <div className="error-message">
                            {errors.confirmPassword}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="row mb-2">
                      <div className="col-md-6">
                        <PhoneInput
                          placeholder="Phone Number"
                          name="phonenumber"
                          value={inputs.phonenumber}
                          onChange={(value, country) =>
                            handlePhoneChange(value, country)
                          }
                        />
                        {errors.phonenumber && (
                          <div className="error-message">
                            {errors.phonenumber}
                          </div>
                        )}
                      </div>
                      <div className="col-md-6">
                        <select
                          placeholder="Select Country"
                          className="form-select form-control"
                          name="country"
                          onChange={handleCountryChange}
                          value={inputs.country.countryCode}>
                          <option value="" disabled>
                            Select country
                          </option>
                          <option
                            key={inputs.country.countryCode}
                            value={inputs.country.countryCode}>
                            {inputs.country.name}
                          </option>
                        </select>
                        {errors.country && (
                          <div className="error-message">{errors.country}</div>
                        )}
                      </div>
                    </div>

                    <div className="mb-2">
                      <select
                        placeholder="Select State"
                        className="form-select form-control"
                        name="state"
                        onChange={handleStateChange}
                        value={inputs.state}>
                        <option value="" disabled>
                          Select State
                        </option>
                        {states.map((state, index) => (
                          <option key={index} value={state.name}>
                            {state.name}
                          </option>
                        ))}
                      </select>
                      {errors.state && (
                        <div className="error-message">{errors.state}</div>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary sign-up-sumbit-button">
                      Submit
                    </button>
                  </form>
                  <SocialMediaAccount />
                </div>
              </div>
              <div className="col-lg-3"></div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default SignUp;

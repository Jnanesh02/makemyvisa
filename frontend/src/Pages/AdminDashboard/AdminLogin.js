import React, { useState } from "react";
import backgroundImage from "../../assets/images/OJO4YQ0.jpg";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const AdminLogin = () => {
  const navigate = useNavigate();
  const initialState = { email: "", password: "" };
  const [showPassword, setShowPassword] = useState(false);
  const [userInputDetails, setuserInputDetails] = useState(initialState);
  const handleInputDetails = (event) => {
    const { name, value } = event.target;
    setuserInputDetails({ ...userInputDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const [email, password] = [
      userInputDetails.email,
      userInputDetails.password,
    ];
    const data = { email, password };
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/employee/login`,
        data
      );

      if (response.data.error) {
        alert(response.data.error.message);
      } else {
        // alert("successfully logged in "); 
        const adminTokens = JSON.stringify({
          "AdminToken": response.data.token,
          "_Id":response.data.message._id
        })
        localStorage.setItem("adminToken",adminTokens );
        navigate("/Admindashboard");
      }
    } catch (err) {
      alert(err.message);
    }
  };
  return (
    <>
      <div>
        <section
          className="certificate-section sing-up"
          style={{ backgroundImage: `url(${backgroundImage})` }}>
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <h2 className="sign-up-text"> Login </h2>
              </div>
              <div className="row">
                <div className="col-lg-3"></div>
                <div className="col-lg-6 col-md-12 col-sm-12">
                  <div className="login-forms  login  shadow-sm">
                    <form method="post" action="login">
                      <div className="mb-2">
                        {/* <label htmlFor="email" className="form-label">
                          Email
                        </label> */}
                        <input
                          type="email"
                          placeholder="Email"
                          className="form-control"
                          id="exampleInputEmail1"
                          name="email"
                          required
                          value={userInputDetails.email}
                          onChange={(event) => {
                            handleInputDetails(event);
                          }}
                        />
                      </div>
                      <div className="mb-2">
                        {/* <label htmlFor="email" className="form-label">
                          Password
                        </label> */}
                        <div style={{ position: "relative" }}>
                          <input
                            type={showPassword ? "text" : "password"}
                            className="form-control"
                            placeholder="Password"
                            id="exampleInputPassword1"
                            name="password"
                            required
                            value={userInputDetails.password}
                            onChange={(event) => handleInputDetails(event)}
                            style={{ paddingRight: "30px" }}
                          />
                          <i
                            className={`fas ${
                              showPassword ? "fa-eye" : "fa-eye-slash"
                            }`}
                            onClick={() => setShowPassword(!showPassword)}
                            style={{
                              position: "absolute",
                              top: "50%",
                              right:
                                "10px" /* Adjust right position as needed */,
                              transform: "translateY(-50%)",
                              cursor: "pointer",
                            }}></i>
                        </div>
                      </div>
                      <NavLink
                        style={{ color: "#fe5141" }}
                        to="/forgotpassword">
                        Forgot Password?
                      </NavLink>
                      <br />
                      <br />
                      <button
                        type="submit"
                        className="btn btn-primary sign-up-sumbit-button"
                        onClick={handleSubmit}>
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
                <div className="col-lg-3"></div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default AdminLogin

import React,{ useEffect,useState } from "react";
import "./CostumerDashboardStyles/Dashboard.css";
import Logo from "../../assets/images/logo.png";
import Avatar from "../../assets/images/avatar.png";
import { NavLink, Link, Outlet} from "react-router-dom";
import CookieUtils from "../../components/Cookie/Cookies";
import axios from "axios";
function Dashboard() {
  const [notifications, setNotifications] = useState([]);
  const token = CookieUtils.getCookies("userId");
  const tokenData = JSON.parse(atob(token.split(".")[1]));

  const handleNotificationClick = async (notificationId) => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/AdminToEmployeeAndCustomerNotifications/${notificationId}`, {
        read: true,
        tokenData
      });
      if (response.status === 200) {
        const updatedNotifications = notifications.map(notification => {
          if (notification._id === notificationId) {
            return { ...notification, read: true };
          }
          return notification;
        });
        setNotifications(updatedNotifications);
      }
    } catch (error) {
      console.error('Error updating notification status:', error);
    }
  }

  // Fetch data from the endpoint when the component mounts
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const url = `${process.env.REACT_APP_BACKEND_URL}/AdminToEmployeeAndCustomerNotifications/${tokenData.id}`;
        const response = await axios.get(url, { withCredentials: true });
        setNotifications(response.data[0].notificationsData);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);




  useEffect(() => {
    const handleSidebarToggle = () => {
      const sidebar = document.getElementById("sidebar");
      if (sidebar) {
        sidebar.classList.toggle("active");
      }
    };

    const sidebarCollapseButton = document.getElementById("sidebarCollapse");
    if (sidebarCollapseButton) {
      sidebarCollapseButton.addEventListener("click", handleSidebarToggle);
    }

    return () => {
      if (sidebarCollapseButton) {
        sidebarCollapseButton.removeEventListener("click", handleSidebarToggle);
      }
    };
  }, []);




  return (
    <div>
      <main className="content" />
      <div className="wrapper">
        {/* <!-- Sidebar  --> */}
        <nav id="sidebar">
          <div className="sidebar-header">
            <img className="dashboard-logo" src={Logo} alt="" />
          </div>

          <ul className="list-unstyled components">
            <NavLink style={{ textDecoration: "none" }} to="/dashboard">
              <p>
                <svg
                  className="dashborad-icons"
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 -960 960 960"
                  width="24">
                  <path d="M520-600v-240h320v240H520ZM120-440v-400h320v400H120Zm400 320v-400h320v400H520Zm-400 0v-240h320v240H120Zm80-400h160v-240H200v240Zm400 320h160v-240H600v240Zm0-480h160v-80H600v80ZM200-200h160v-80H200v80Zm160-320Zm240-160Zm0 240ZM360-280Z" />
                </svg>
                Dashboard{" "}
              </p>
            </NavLink>
            <div className="accordion" id="accordionExample2">
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne2">
                  <NavLink className="accordion-button custom-button" to="ticket/dummy/dummytickets">
                  Dummy Ticket
                  </NavLink>
                </h2>
              </div>
            </div>
            <div className="accordion" id="accordionExample2">
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne2">
                  <NavLink className="accordion-button custom-button" to="ticket/hotel/hotelreservations">
                  Hotel Reservation
                  </NavLink>
                </h2>
              </div>
            </div>
            <div className="accordion" id="accordionExample2">
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne2">
                  <NavLink className="accordion-button custom-button" to="ticket/visa/visastatuses">
                  Visa Status
                  </NavLink>
                </h2>
              </div>
            </div>
            <div className="accordion" id="accordionExample2">
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne2">
                  <NavLink className="accordion-button custom-button" to="/CustomerLogout">
                  Logout
                  </NavLink>
                </h2>
              </div>
            </div>
            {/* <div className="accordion" id="accordionExample1">
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne1">
                  <button
                    className="accordion-button custom-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#homeSubmenu1"
                    aria-expanded="false"
                    aria-controls="homeSubmenu1">
                    <i className="fas fa-gear"></i> Settings
                  </button>
                </h2>
                <div
                  id="homeSubmenu1"
                  className="accordion-collapse collapse  custom-collapse"
                  aria-labelledby="headingOne1"
                  data-bs-parent="#accordionExample1">
                 
                </div>
              </div>
            </div> */}

            
          </ul>
        </nav>

        {/* <!-- Page Content  --> */}
        <div id="content">
          <nav className="Dashboardnavbar navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <button
                type="button"
                id="sidebarCollapse"
                className="btn btn-info ">
                <svg
                  className="mb-bl"
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 -960 960 960"
                  width="24">
                  <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
                </svg>

                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 -960 960 960"
                    width="24">
                    <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
                  </svg>
                </span>
              </button>
              <button
                className="btn btn-dark d-inline-block d-lg-none ml-auto btn-mobile-sm"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation">
                <i className="fas fa-align-justify"></i>
              </button>

              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent">
                <ul className="nav navbar-nav ml-auto">
                  <li className="nav-item">
                    {/* <a className="nav-link notification" href="/">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24"
                        viewBox="0 -960 960 960"
                        width="24">
                        <path d="M160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z" />
                      </svg>
                    </a> */}
                    <div className="btn-group nav-link notification">
                      <span className="notificationNumber">{notifications.length}</span>
                      <button
                        className="btn btn-secondary"
                        type="button"
                        id="dropdownMenuButton"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24"
                          viewBox="0 -960 960 960"
                          width="24"
                        >
                          <path d="M160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z" />
                        </svg>
                      </button>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuButton"
                      >
                        {/* {notifications &&
                          notifications.map((notification) => (
                            <a  href="/dashboard/visastatus" onClick={() => handleNotificationClick(notification._id)}>
                            <li key={notification._id} className="mx-3 my-4" >
                              <h6>{notification.senderEmail}</h6>
                              <p className="dropdown-item" >
                                {notification.message}
                              </p>
                              <hr/>
                            </li>
                            
                            </a>
                          ))} */}
                      </ul>
                    </div>
                  </li>
                  <li className="nav-item avatar-icons-ds">
                    <button
                      className="btn btn-primary avatar-img"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseExample"
                      aria-expanded="false"
                      aria-controls="collapseExample">
                      <img className="avatar-icons" src={Avatar} alt="" />
                    </button>

                    <div className="collapse" id="collapseExample">
                      <div className="card card-body card-avatar">
                        <ul className="list-group">
                          <li className="list-group-item">
                          
                          <NavLink className="custom-link" to="profile">
                      {" "}
                      <i className="fa-solid fa-user m-2 " style={{color:"#dd2817"}}></i><span style={{color:"#dd2817"}}>Profile</span>
                    </NavLink>
                           
                          </li>
                          <li className="list-group-item">
                            <Link to="/CustomerLogout">
                              logout
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

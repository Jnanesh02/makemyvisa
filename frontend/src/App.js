import "./App.css";
import { useState,useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/CostumerAuthentication/Login/Login";
import Layout from "./Pages/Layout";
import Home from "./components/Home/Home";
import SignUp from "./Pages/CostumerAuthentication/Registraion/SignUp";
import Dashboard from "./Pages/CostumerDashboard/Dashboard";
import CostumerHomePage from "./Pages/CostumerDashboard/CostumerHomePage";
import AdminHomePage from "./Pages/AdminDashboard/AdminHomePage";
import Profile from "./Pages/CostumerDashboard/Profile";
import AdminLogin from "./Pages/AdminDashboard/AdminLogin";
import { AdminDashboard } from "./Pages/AdminDashboard/AdminDashboard";
import { AdminLogout } from "./Pages/AdminDashboard/AdminLogout";
import EmployeeDetails from "./Pages/AdminDashboard/EmployeeDetails/EmployeeDetails";
import { CustomerLogout } from "./Pages/CostumerDashboard/CustomerLogout";
import { AdminProfile } from "./Pages/AdminDashboard/AdminProfile";
import Department from "./Pages/AdminDashboard/master/Department";
import CountryServices from "./Pages/AdminDashboard/master/CountryServices";
import { CountriesServiceDetails } from "./components/Home/CountriesServiceDetails";
function App() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    const adminToken = JSON.parse(localStorage.getItem("adminToken"));
    return !!adminToken?.AdminToken;
  });

  useEffect(() => {
    const checkAdminLogin = async () => {
      const adminToken = JSON.parse(localStorage.getItem("adminToken"));
      await setIsAdminLoggedIn(!!adminToken?.AdminToken);
    };
  
    checkAdminLogin();
  }, []);
  const Visa = () => <h1>visa is working</h1>;
  const Travel = () => <h1>travel is working</h1>;
  const AA = () => <h1>AA is working</h1>;
  const ContactUs = () => <h1>contactus is working</h1>;
  const Study = () => <h1>study is working</h1>;

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="registration" element={<SignUp />} />
            <Route path="Admin" element={<AdminLogin />} />
           <Route path="/countries/:countryName/:serviceName"  element={<CountriesServiceDetails />} />

          </Route>

          <Route path="dashboard" element={<Dashboard />}>
            <Route index element={<CostumerHomePage />} />
            <Route path="profile" element={<Profile />}>
            </Route>
          </Route>
          <Route path="CustomerLogout" element={<CustomerLogout />} />

          <Route path="Admindashboard" element={isAdminLoggedIn?(<AdminDashboard/>):(<Navigate to="../Admin" replace={true}/>)}>
            <Route index element={<AdminHomePage />} />
            <Route path="Department" element={<Department />}>
            </Route>
            <Route path="countryServices" element={<CountryServices />}>
            </Route>
            <Route path="profile" element={<AdminProfile />}>
            </Route>
            <Route path="employeeDetails" element={<EmployeeDetails />} />
          </Route>
          <Route path="AdminLogout" element={<AdminLogout />} />

          <Route path="visa" element={<Visa />} />
          <Route path="study" element={<Study />} />
          <Route path="aa" element={<AA />} />
          <Route path="contactus" element={<ContactUs />} />
          <Route path="travel" element={<Travel />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;

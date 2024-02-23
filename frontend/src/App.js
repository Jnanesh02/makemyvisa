import "./App.css";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from "./Pages/CostumerAuthentication/Login/Login";
import SignUp from "./Pages/CostumerAuthentication/Registraion/SignUp";
import Layout from "./Pages/Layout";
import Home from "./components/Home/Home";
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
import { CustomerDetails } from "./Pages/AdminDashboard/CustomerDeatails/CustomerDetails";
import { CountriesDetails } from "./components/Home/CountriesDetails";
import ServicePage from "./Pages/AdminDashboard/master/DummyServices/service"

import CustomerPrivateRoute from "./components/PrivateRoutes/CustomerPrivateRoute";
import AdminPrivateRoute from "./components/PrivateRoutes/AdminPrivateRoute"


import Google from "./components/Google";
import LinkedIn from "./components/LinkedIn";
import EmployeePrivateRoute from "./components/PrivateRoutes/EmployeePrivateRoute";
import DummyTicketForm from "./Pages/sevices/DummyTickets/DummyTicketForm";
import TicketStatus from "./Pages/CostumerDashboard/TicketStatus";

import VisaStatus from "./Pages/CostumerDashboard/VisaStatus/VisaStatus";
import TravelHealthInsurance from "./Pages/sevices/TravelHealthInsurance/TravelHealthInsurance";
import { HotelBooking } from "./Pages/sevices/HotelBooking";
import { HotelReservationTicket } from "./Pages/CostumerDashboard/HotelReservationTicket";
import { Immigration } from "./Pages/sevices/Immigration";

import EmployeeDashboard from "./Pages/EmployeeDashboard/EmployeeDashboard"
import EmployeeHomePage from "./Pages/EmployeeDashboard/EmployeeHomePage/EmployeeHomePage"
import VisaAssistance from "./Pages/sevices/VisaAssistance/VisaAssistance";



function App() {
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
            <Route path="/services/TravelHealthInsurance" element={<TravelHealthInsurance/>} />
            <Route path="/services/hotel/:hotelReservation" element={<HotelBooking/>} />
            <Route path="/services/dummy/:dummyticket" element={<DummyTicketForm/>} />
            <Route path="service/immigration/:immigrationAdvice" element={<Immigration/>} />
            <Route path="/services/VisaAssistance/" element={<VisaAssistance/>} />



            <Route path="/countries/:countryName/:serviceName"  element={<CountriesServiceDetails />} />
            <Route path="/countries/:countryName"  element={<CountriesDetails />} />
          </Route>
          <Route path="/google" element={<Google/>}/>
          <Route path="/linkedin" element={<LinkedIn/>}/>
          <Route path='dashboard' element={<CustomerPrivateRoute/>}>
              <Route path="/dashboard" element={<Dashboard />}>
                <Route index element={<CostumerHomePage />} />
                <Route path="profile" element={<Profile />}/>
                <Route path="ticket/dummy/:dummytickets" element={<TicketStatus/>}/>
                <Route path="ticket/hotel/:hotelreservations" element={<HotelReservationTicket/>}/>
                <Route path="VisaStatus" element={<VisaStatus/>}/>
                
              </Route>
              
          </Route>

          <Route path="CustomerLogout" element={<CustomerLogout />} />

          <Route path="Admindashboard" element={<AdminPrivateRoute/>}>
            <Route path="/Admindashboard" element={<AdminDashboard/>}>
            <Route index element={<AdminHomePage />} />
            <Route path="Department" element={<Department />}>
            </Route>
            <Route path="countryServices" element={<CountryServices />}>
            </Route>
            <Route path="profile" element={<AdminProfile/>}/>
            <Route path="ServicesPage" element={<ServicePage />}>
            </Route>
            <Route path="customerDetails" element={<CustomerDetails />} />
            <Route path="employeeDetails" element={<EmployeeDetails />} />
            </Route>


            
          </Route>

          <Route path="/Employeedashboard" element={<EmployeeDashboard/>}>
              <Route index element={<EmployeeHomePage />} />
              <Route path="profile" element={<AdminProfile/>}/>
    
  </Route>




          <Route path="AdminLogout" element={<AdminLogout />} />

          <Route path="visa" element={<Visa />} />
          <Route path="study" element={<Study />} />
          <Route path="aa" element={<AA />} />
          <Route path="contactus" element={<ContactUs />} />
          <Route path="travel" element={<Travel />} />




          <Route path='employeeDashboard' element={<EmployeePrivateRoute/>}>



          </Route>

        </Routes>
      </Router>
    </div>
  );
}

export default App;

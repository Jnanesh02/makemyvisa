import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/CostumerDetails/Login/Login";
import Layout from "./Pages/Layout";
import Home from "./Pages/Home/Home";
import SignUp from "./Pages/CostumerDetails/Registraion/SignUp";
// import Contact from "./Pages/contact/contact"
import Dashboard from "./Pages/Dashboard/Dashboard";
import Hello from "./Pages/Dashboard/Hello";
import Profile from "./Pages/Dashboard/Profile";
import ProfileDetails from "./Pages/Dashboard/ProfileDetails";
import AddressDetails from "./Pages/Dashboard/AddressDetails";
import TravelDetails from "./Pages/Dashboard/TravelDetails";
import Logout from "./Pages/Dashboard/Logout";

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
          </Route>
          <Route path="dashboard" element={<Dashboard />}>
            <Route index element={<Hello />} />
            <Route path="profile" element={<Profile />}>
              <Route index element={<ProfileDetails />} />
              <Route path="Address" element={<AddressDetails />} />
              <Route path="Travel" element={<TravelDetails />} />
            </Route>
          </Route>
          <Route path="/logout" element={<Logout />} />

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

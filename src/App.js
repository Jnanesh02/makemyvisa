
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Pages/CostumerDetails/Login/Login';
import Layout from './Pages/Layout';
import Home from './Pages/Home/Home';
import SignUp from './Pages/CostumerDetails/Registraion/SignUp';
import Contact from "./Pages/contact/contact"
import Dashboard from './Pages/Dashboard/Dashboard';

function App() {
  return (
    <div className="App">
     <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />}/>
          <Route path="login" element={<Login />} />
          <Route path="registration" element={<SignUp />} />
          <Route path="contact" element={<Contact/>} />
          
          </Route>
          <Route path='dashboard' element={<Dashboard/>}/>
         </Routes>
         </Router>
    </div>
  );
}

export default App;

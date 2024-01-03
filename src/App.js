
import './App.css';
import Layout from './components/Layout';
import { BrowserRouter, Routes, Route }  from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
// Visa
// Travel ItineraryInsurance
// Apostille & Attestation
// Study/Admission
// Contact Us
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

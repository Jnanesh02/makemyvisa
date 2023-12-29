import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Pages/Login';
import Registration from './Pages/Registration';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/login' exact element={<Login/>}/> 
          <Route path='/registration' exact element={<Registration/>}/> 
        </Routes>
      </Router>
    </div>
  );
}

export default App;

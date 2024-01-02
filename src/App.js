import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Pages/Login/Login';
import Registration from './Pages/Registration';
import Layout from './Pages/Layout';
import Home from './Pages/Home/Home';

function App() {
  return (
    <div className="App">
     <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="registration" element={<Registration />} />
        </Route>
      </Routes>
    </Router>
    </div>
  );
}

export default App;

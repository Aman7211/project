import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
function App() {
  return (
    <div>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/createuser" element={<Signup />} />
        </Routes>

      </div>
          );
}

export default App;

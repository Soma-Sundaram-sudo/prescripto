import React, { useContext } from 'react'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Admincontext } from './context/Admincontext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Routes ,Route} from 'react-router-dom';
import Dashboard from "./pages/admin/Dashboard";
import Allappointments from "./pages/admin/Allappointments";
import AddDoctor from "./pages/admin/AddDoctor";
import Doctorslist from "./pages/admin/Doctorslist"
import { Doctorcontext } from './context/Doctorcontext';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import DoctorAppointment from './pages/Doctor/DoctorAppointment';
import DoctorProfile from './pages/Doctor/DoctorProfile';
const App = () => {
  const { atoken } = useContext(Admincontext)
  const {dtoken} = useContext(Doctorcontext)
  return atoken || dtoken ? (
    <div className='bg-[#F8F9FD]'>
      <ToastContainer />
      <Navbar/>
      <div className='flex items-start '>
        <Sidebar/>
        <Routes>
          {/* Admin Route */}
          <Route path="/" element={<></>}/>
          <Route path="/admin-dashboard" element={<Dashboard />}/>
          <Route path="/all-appointments" element={<Allappointments />}/>
          <Route path="/add-doctor" element={<AddDoctor />}/>
          <Route path="/doctor-list" element={<Doctorslist />}/>
          {/* Doctor Route */}
          <Route path="/doctor-dashboard" element={<DoctorDashboard/>}/>
          <Route path="/doctor-appointments" element={<DoctorAppointment/>}/>
          <Route path="/doctor-profile" element={<DoctorProfile/>}/>
        </Routes>
      </div>
    </div>
  ) : (
    <div>
      <Login />
      <ToastContainer />
    </div>
  )
}

export default App
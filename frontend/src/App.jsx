import React from 'react'
import Home from './pages/Home';
import Doctor from "./pages/Doctor";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Login from "./pages/Login";
import Myappointments from "./pages/Myappointments";
import Myprofile from "./pages/Myprofile";
import {Route,Routes} from "react-router-dom";
import Appointment from './pages/Appointment';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <Navbar />
      <ToastContainer />
     <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/doctors" element={<Doctor/>}/>
      <Route path="/doctors/:speciality" element={<Doctor/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/my-profile" element={<Myprofile/>}/>
      <Route path="/my-appointments" element={<Myappointments/>}/>
      <Route path="/appointment/:docId" element={<Appointment/>}/>
      <Route path="/login" element={<Login/>} />
     </Routes>
     <Footer/>
    </div>
  )
}

export default App

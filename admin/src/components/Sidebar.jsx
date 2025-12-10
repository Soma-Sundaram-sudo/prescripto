import React, { useContext } from 'react'
import { Admincontext } from '../context/Admincontext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { Doctorcontext } from '../context/Doctorcontext'

const Sidebar = () => {
    const {atoken} = useContext(Admincontext)
    const {dtoken} = useContext(Doctorcontext)
  return (
    <div className='min-h-screen bg-white border-r '>
      {  atoken && <ul className='text-[#515151] mt-5'>
            <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? " border-primary bg-[#F2F3FF] border-r-4":""}` } to={"admin-dashboard"}>
                <img src={assets.home_icon} />
                <p>Dashboard</p>
            </NavLink>

            <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? " border-primary bg-[#F2F3FF] border-r-4":""}` }  to={"/all-appointments"}>
                <img src={assets.appointment_icon} />
                <p>Appointments</p>
            </NavLink>

            <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? " border-primary bg-[#F2F3FF] border-r-4":""}` } to={"/add-doctor"}>
                <img src={assets.add_icon} />
                <p>Add Doctors</p>
            </NavLink>

            <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? " border-primary bg-[#F2F3FF] border-r-4":""}` } to={"/doctor-list"}>
                <img src={assets.people_icon} />
                <p>Doctors List</p>
            </NavLink>   
        </ul>
         }
          {  dtoken && <ul className='text-[#515151] mt-5'>
            <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? " border-primary bg-[#F2F3FF] border-r-4":""}` } to={"/doctor-dashboard"}>
                <img src={assets.home_icon} />
                <p className='hidden md:block'>Dashboard</p>
            </NavLink>

            <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? " border-primary bg-[#F2F3FF] border-r-4":""}` }  to={"/doctor-appointments"}>
                <img src={assets.appointment_icon} />
                <p className='hidden md:block'>Appointments</p>
            </NavLink>

            <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? " border-primary bg-[#F2F3FF] border-r-4":""}` } to={"/doctor-profile"}>
                <img src={assets.people_icon} />
                <p className='hidden md:block'>Doctors Profile</p>
            </NavLink>   
        </ul>
         }
    </div>
  )
}

export default Sidebar
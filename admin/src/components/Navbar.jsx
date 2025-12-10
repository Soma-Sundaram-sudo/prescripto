import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { Admincontext } from '../context/Admincontext'
import { useNavigate } from 'react-router-dom'
import { Doctorcontext } from '../context/Doctorcontext'

const Navbar = () => {
    const {atoken,setatoken} = useContext(Admincontext)
    const {dtoken,setDtoken}=useContext(Doctorcontext)
    const navigate = useNavigate()

    const logout = () => {
        navigate("/")
        atoken && setatoken("")
        atoken && localStorage.removeItem("atoken")
        dtoken && setDtoken("")
        dtoken && localStorage.removeItem("dtoken")
    }
  return (
    <div className='flex justify-between px-4 sm:px-10 py-3 border-b bg-white items-center '>
        <div className='flex items-center gap-4 '>
            <img className='w-36 sm:w-40 cursor-pointer' src={assets.admin_logo} />
            <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>{atoken ? "Admin":"Doctor"}</p>
        </div>
        <button  onClick={logout} className='bg-primary text-white text-sm px-10 py-2 rounded-full '>Logout</button>
    </div>
  )
}

export default Navbar
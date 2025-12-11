import React, { useContext, useState } from 'react'
import { Admincontext } from '../context/Admincontext';
import axios from "axios"
import { toast } from 'react-toastify';
import { Doctorcontext } from '../context/Doctorcontext';

const Login = () => {

    const [state, setstate] = useState("Admin");
    const [email, setemail] = useState("")
    const [Password, setpassword] = useState("")

    const { setatoken, backendurl } = useContext(Admincontext)
    const {setDtoken} = useContext(Doctorcontext)

    const onsubmithandler = async (event) => {


        event.preventDefault()
        try {
            if (state === "Admin") {
                const { data } = await axios.post(backendurl+"/api/admin/login", { email, Password })
                if (data.success) {
                    localStorage.setItem("atoken",data.token)
                    setatoken(data.token)
                }else{
                    toast.error(data.message)
                }
            }else{
                const {data} = await axios.post(backendurl + "/api/doctor/login",{email,Password})
                if (data.success) {
                    localStorage.setItem("dtoken",data.token)
                    setDtoken(data.token)
        
                }else{
                    toast.error(data.message)
                }
            }
        } catch (error) {

        }
    }
    return (
        <form onSubmit={onsubmithandler} className='min-h-[80vh] flex items-center'>
            <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[360px] sm:min-w-96 rounded-xl border text-[#5E5E5E] text-sm shadow-lg'>
                <p className='text-2xl font-semibold m-auto'><span className='text-primary'>{state}</span> Login</p>
                <div className='w-full'>
                    <p>Email</p>
                    <input onChange={(e) => setemail(e.target.value)} value={email} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="email" required />
                </div>
                <div className='w-full'>
                    <p>Password</p>
                    <input onChange={(e) => setpassword(e.target.value)} value={Password} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="password" required />
                </div>
                <button className='bg-primary text-white w-full p-2 rounded mt-2'>Login</button>

                {
                    state === "Admin" ?
                        <p>Doctor Login ? <span onClick={() => setstate("Doctor")} className='text-blue-700 underline cursor-pointer'>click here</span></p>
                        : <p>Admin Login ?<span onClick={() => setstate("Admin")} className='text-blue-700 underline cursor-pointer'>click here</span></p>
                }
            </div>
        </form>
    )
}

export default Login
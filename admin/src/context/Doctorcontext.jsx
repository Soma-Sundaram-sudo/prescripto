import { createContext, useContext, useState,useEffect } from "react";
import axios from "axios"
import { toast } from "react-toastify"

export const Doctorcontext = createContext()

const DoctorContextProvider = (props) => {


    const [dtoken, setDtoken] = useState(localStorage.getItem("dtoken") ? localStorage.getItem("dtoken") : "")
    const [appointments, setAppointments] = useState([])
    const [dashdata, setDashdata] = useState([])
    const [profile,setProfile] = useState([])
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    console.log(backendUrl)
    const getAppointments = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/doctor/appointments`, { headers: { dtoken } })
            if (data.success) {
                setAppointments(data.appointments)
                console.log(data)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }

    const completeAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/doctor/complete-appointment`, { appointmentId }, { headers: { dtoken } })
            if (data.success) {
                toast.success(data.message)
                getAppointments()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }

    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/doctor/cancel-appointment`, { appointmentId }, { headers: { dtoken } })
            if (data.success) {
                toast.success(data.message)
                getAppointments()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }

    const getDashdata = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/doctor/dashboard`, { headers: { dtoken } })
            // console.log(data)
            if (data.success) {
                setDashdata(data.dashData)
                // console.log(data.dashData)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }

    const getProfileData = async() => {
        try {
            const {data} = await axios.get(`${backendUrl}/api/doctor/profile`,{headers:{dtoken}})
            if(data.success){
                setProfile(data.profileData)
            }
        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }
    const value = {
        dtoken, setDtoken, appointments, setAppointments, getAppointments, completeAppointment, cancelAppointment, dashdata, setDashdata, getDashdata,profile,setProfile,getProfileData
    }

    return (
        <Doctorcontext.Provider value={value}>
            {props.children}
        </Doctorcontext.Provider>
    )
}



export default DoctorContextProvider
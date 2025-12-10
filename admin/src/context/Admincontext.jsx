import { createContext,useState,useEffect} from "react";
import axios from "axios"
import {toast} from 'react-toastify'

export const Admincontext = createContext()

const AdminContextProvider = (props) => {
    const [atoken,setatoken] = useState(localStorage.getItem("atoken")?localStorage.getItem("atoken"):"")
    const backendurl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000"
    const [doctors,setDoctors] = useState([])
    const [appointment,setAppointment] = useState([])
    const [dashData,setDashData] = useState([])
    const getAllDoctors = async() =>{
        try {
            const {data} = await axios.post( backendurl + "/api/admin/all-doctors",{},{headers:{atoken}})
            if(data.success){
                setDoctors(data.doctors)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(data.message)
        }
    }

    const changeAvailability = async(docId) => {
        try {
            

            const {data} = await axios.post(backendurl + "/api/admin/change-Availability",{docId},{headers:{atoken}})
            if (data.success) {
                toast.success(data.message)
                getAllDoctors()

            }else{
                toast.error(data.message)
            }
        } catch (error) {
                toast.error(error.message)
        }
    }

    const getAllAppointments = async () => {
        try {
            const {data} = await axios.post(backendurl + "/api/admin/appointments",{},{headers:{atoken}})
            // console.log(data.appointments)
            // console.log(data.appointments)
            if(data.success){
                // setAppointments((Data) => [...Data, data.appointments])
                setAppointment((Data) => [...Data, data.appointments])
                // console.log(appointment)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        if(atoken){
          getAllAppointments()
        // console.log(appointment)
        }},[atoken])

        const cancelAppointment = async (appointmentId) => {
            try {
                const {data} = await axios.post(backendurl + "/api/admin/cancel-appointment",{appointmentId},{headers:{atoken}})
                if (data.success) {
                    toast.success(data.message)
                    getAllAppointments()
                }else{
                    toast.error(data.message)
                }
            } catch (error) {
                
            }
        }

        const getDashData = async() => {
            try {
                const {data} = await axios.get(backendurl + "/api/admin/dashboard",{headers:{atoken}})
                if(data.success){
                    setDashData((Data) => [...Data, data.dashData])
                    // console.log(dashData)
                }else{
                    toast.error(data.message)
                }
            } catch (error) {
                toast.error(error.message)
            }
        }

        useEffect(() => {
            if(atoken){
              getDashData()
            //   console.log(dashData)
            }
          },[atoken])


    const value = {
        atoken,setatoken,backendurl,doctors,getAllDoctors,changeAvailability,getAllAppointments,appointment,cancelAppointment,dashData,getDashData
    }


    return (
        <Admincontext.Provider value={value}>
            {props.children}
        </Admincontext.Provider>
    )
}

export default AdminContextProvider
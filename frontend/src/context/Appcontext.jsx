import { createContext, useEffect, useState } from "react";
// import {doctors} from "../assets/assets"
import axios from "axios"
export const Appcontext = createContext();
import { toast } from 'react-toastify'


const Appcontextprovider = (props) => {

    const currencySymbols = "$";
    const backendurl = import.meta.env.VITE_BACKRND_URL || "http://localhost:4000"
    const [doctors, setDoctors] = useState([])
    const [token, setToken] = useState(localStorage.getItem("token") ? localStorage.getItem("token") : false)
    const [userData, setUserData] = useState(false)


    const getDoctorsData = async () => {
        try {
            const { data } = await axios.get("http://localhost:4000/api/doctor/list")
            if (data.success) {
                setDoctors(data.doctors)
            }
            else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

   

    const loadUserProfileData = async () => {
        try {
            const { data } = await axios.get("http://localhost:4000/api/user/get-profile", { headers: { token } })
            if (data.success) {
                setUserData(data.userData)
               
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }


    useEffect(() => {
        if (token) {
            loadUserProfileData()
        } else {
            setUserData(false)
        }
    }, [token])

    useEffect(() => {
        getDoctorsData()
    }, [])

   

    const value = {
        doctors, currencySymbols, token, setToken, backendurl, userData, setUserData, loadUserProfileData,getDoctorsData,
    }
    // console.log('userData',userData);
    
    return (
        <Appcontext.Provider value={value}>
            {props.children}
        </Appcontext.Provider>
    )
}

export default Appcontextprovider;


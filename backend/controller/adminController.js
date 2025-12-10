import validator from "validator"
import bcrypt from "bcrypt"
import { v2 as cloudinary } from "cloudinary"
import doctorModel from "../models/doctorsModel.js"
import jwt from "jsonwebtoken"
import appointmentModel from "../models/appointmentModel.js"
import doctorsModel from "../models/doctorsModel.js"
import userModel from "../models/userModel.js"

const addDoctor = async (req, res) => {
    try {
        const { name, email, Password, speciality, degree, experience, about, fees, address } = req.body
        const imageFile = req.file

        if (!name || !email || !Password || !speciality || !degree || !experience || !about || !fees || !address || !imageFile) {
            console.log(name,email,Password,address,speciality,degree,experience,about,fees,imageFile)
            return res.json({ success: false, message: "missing Details" })
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "please enter the valid email" })
        }

        if (Password.length < 8) {
            return res.json({ success: false, message: "please enter the strong Password" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(Password, salt)

        //upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
        const imageurl = imageUpload.secure_url

        const doctorData = {
            name,
            email,
            image: imageurl,
            Password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address),
            date: Date.now()
        }

        const newDoctor = new doctorModel(doctorData)
        await newDoctor.save()

        res.json({ success: true, message: "Doctor Added" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


// API for the admin login

const loginAdmin = async (req, res) => {


    try {
        const { email, Password } = req.body;

        if (email === process.env.ADMIN_EMAIL && Password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + Password, process.env.JWT_SECRET)
            res.json({ success: true, token })

        } else {
            res.json({ success: false, message: "invalid credentials" })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const alldoctors = async(req,res) =>{
    try {

        const doctors = await doctorModel.find({}).select("-password")
        res.json({success:true,doctors})
        
    } catch (error) {

        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

const appointmentsAdmin = async (req,res) => {
    try {
        const appointments = await appointmentModel.find({})
        res.json({success:true,appointments})
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const Appointmentcancel = async (req,res) => {
    try {
        const {appointmentId} = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)

        await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})

        const {docId,slotDate,slottime} = appointmentData

        const doctorsData = await doctorModel.findById(docId)

        let slots_booked = doctorsData.slots_booked

        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e!==slottime)

        await doctorModel.findByIdAndUpdate(docId,{slots_booked})

        res.json({success:true,message:"Appointment Cancelled"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

const adminDashBoard = async(req,res) => {
    try {
        
        const doctors = await doctorsModel.find({})
        const users = await  userModel.find({})
        const appointments = await appointmentModel.find({})

        const dashData = {
            doctors:doctors.length,
            appointments:appointments.length,
            patients:users.length,
            latestAppointments:appointments.reverse().slice(0,4)
        }
        res.json({success:true,dashData})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
export { addDoctor, loginAdmin , alldoctors,appointmentsAdmin,Appointmentcancel,adminDashBoard}
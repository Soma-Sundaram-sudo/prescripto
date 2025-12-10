import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from "jsonwebtoken"
import {v2 as cloudinary} from "cloudinary"
import doctorModel from '../models/doctorsModel.js'
import appointmentModel from '../models/appointmentModel.js'
import razorpay from "razorpay"

const registerUser = async(req,res) => {
    try {
        const {name,email,password} = req.body

        if(!name || !email || !password){
            return res.json({success:false,message:"Missing Details"})
        }

        if(!validator.isEmail(email)){
            return res.json({success:false,message:"enter a valid email"})
        }

        if(password.length < 8){
            return res.json({success:false,message:"Enter a strong password"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedpassword = await bcrypt.hash(password,salt)

        const userData = {
            name,
            email,
            password : hashedpassword
        }

        const newuser = new userModel(userData)
        const user = await newuser.save()

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
        res.json({success:true,token})
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const loginUser = async (req,res) =>{
    try {
        const {email,password} = req.body
        const user = await userModel.findOne({email})

        if(!user){
           return res.json({success:false,message:"User does not exist"})
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(isMatch){
            const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
            res.json({success:true,token})
        }else{
            res.json({success:false,message:"Invalid credentials"})
        }
        
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const getProfile = async (req,res) => {
    try{
        const {userId} = req.body
        const userData = await userModel.findById(userId).select("-password")
        res.json({success:true,userData})

    }catch(error){
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const updateProfile = async (req,res) => {
    try {

        const {userId , name , phone , address , dob, gender} = req.body
        const imageFile = req.file 
        
        
        if(!name || !phone || !address || !dob || !gender){
           return  res.json({success:false,message:"Missing Details"})
        }

        await userModel.findByIdAndUpdate(userId,{name,phone,address:JSON.parse(address),gender,dob})

        if(imageFile){
            const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"})
            const imageURL = imageUpload.secure_url

            await userModel.findByIdAndUpdate(userId,{image:imageURL})
        }
        res.json({success:true,message:"Profile Uploaded"})
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


const bookAppointment = async (req,res) => {

    try {
        
        const {userId,docId,slotDate,slottime} = req.body

        const docData = await doctorModel.findById(docId).select("-password")

        if(!docData.avaialable){
            return res.json({success:false,message:"Doctor not available"})
       }

       let slots_booked = docData.slots_booked

       if(slots_booked[slotDate]){
        if(slots_booked[slotDate].includes(slottime)){
            return res.json({success:false,message:"slot not available"})
        }else{
            slots_booked[slotDate].push(slottime)
        }
       }else{
        slots_booked[slotDate]=[]
        slots_booked[slotDate].push(slottime)
       }

       const userData = await userModel.findById(userId).select("-password")

       delete docData.slots_booked 

       const appointmentData = {
        userId,
        docId,
        docData,
        userData,
        amount:docData.fees,
        slottime,
        slotDate,
        date:Date.now()
       }

       const newAppointment = new appointmentModel(appointmentData)
       await newAppointment.save()

       await doctorModel.findByIdAndUpdate(docId,{slots_booked})
       res.json({success:true,message:"Appointment Booked"})
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const listAppointment = async (req,res) => {
    try {
        const {userId} = req.body

        const appointments = await appointmentModel.find({userId})
        res.json({success:true,appointments})
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

const cancelAppointment = async (req,res) => {
    try {
        const {userId,appointmentId} = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)

        if(appointmentData.userId !== userId){
            res.json({success:false,message:"unaithorized action"})
        }

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

const razorpayInstance = new razorpay({
    key_id:process.env.RAZOR_KEY_ID,
    key_secret:process.env.RAZOR_KEY_SECRET
})

const paymentRazorpay = async (req,res) => {

   try {
    const {appointmentId} = req.body

    const appointmentData = await appointmentModel.findById(appointmentId)

    if(!appointmentData || appointmentData.cancelled){
        return res.json({success:false,message:"Appointment Cancelled or not found"})
    }

    const options = {
        amount:appointmentData.amount * 100 ,
        currency : process.env.CURRENCY,
        receipt:appointmentId
    }

    const order = await razorpayInstance.orders.create(options)
    res.json({success:true,order})
   } catch (error) {
    console.log(error)
    res.json({success:false,message:error.message})
   }
}

const verifyRazorpay = async (req,res) => {
    try {
        const {razorpay_order_id} = req.body
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)

        console.log(orderInfo)
        if(orderInfo.status === "paid"){
            await appointmentModel.findByIdAndUpdate(orderInfo.receipt,{payment:true})
            res.json({success:true,message:"Payment successful"})
            console.log(orderInfo)
        }else{
            res.json({success:false,message:"Payment Failed"})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}


export {registerUser,loginUser,getProfile,updateProfile,bookAppointment,listAppointment,cancelAppointment,paymentRazorpay,verifyRazorpay}
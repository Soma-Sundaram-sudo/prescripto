import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Appcontext } from '../context/Appcontext';
import { assets } from '../assets/assets';
import RelatedDoctors from '../components/RelatedDoctors';
import { toast } from 'react-toastify';
import axios from "axios"

const Appointment = () => {
  const {docId} = useParams();
  const {doctors,currencySymbols,token,getDoctorsData,backendurl} = useContext(Appcontext);
  const daysofweek = ["SUN","MON","TUE","WED","THU","FRI","SAT"];


  const [docInfo,setdocInfo] = useState([]);
  const [docslots,setdocslots] = useState([]);
  const [slotindex,setslotindex] = useState(0);
  const [slottime,setslottime]=useState("");
  const navigate = useNavigate()
  const fetchDocinfo = async () => {
    const docInfo = doctors.find(doc => doc._id === docId);
    setdocInfo(docInfo);

  }

  const getavailableslots = async () =>{
    setdocslots([])

    let today = new Date()

    for(let i=0; i<7;i++){
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate()+i)

      let endTime = new Date()
      endTime.setDate(today.getDate()+i)
      endTime.setHours(21,0,0,0);

      if(today.getDate() === currentDate.getDate()){
        currentDate.setHours(currentDate.getHours()>=10 ? currentDate.getHours() + 1 : 10 );
        currentDate.setMinutes(currentDate.getMinutes()>=30 ? 30 : 0);
      }else{
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }

      let timeslots = []
      while(currentDate < endTime){
        let formattedtime = currentDate.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"});

        let day = currentDate.getDate()
        let month = currentDate.getMonth()+1
        let year = currentDate.getFullYear() 

        let slotDate = day + "_" + month + "_" + year
        let slottime = formattedtime 
   
        
        const isSlotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slottime) ? false : true;

        
        if (isSlotAvailable) {
          timeslots.push({
            datetime: new Date(currentDate),
            time:formattedtime
          })
        }
        

        currentDate.setMinutes(currentDate.getMinutes()+30)
      }

      setdocslots(prev =>([...prev,timeslots]))
    }
  }

  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Login to book appointment")
      return navigate("/login")
    }
    try {
      
      const date = docslots[slotindex][0].datetime

      let day = date.getDate()
      let month = date.getMonth()+1 
      let year = date.getFullYear()

      const slotDate = day + "_" + month + "_" + year
      const {data} = await axios.post(backendurl + "/api/user/book-appointment",{docId,slotDate,slottime},{headers:{token}})
      if(data.success){
        toast.success(data.message)
        getDoctorsData()
        navigate("/my-appointments")
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error)
      console.log(error.message)
    }
  }

  useEffect(()=>{
    fetchDocinfo()
  },[doctors,docId])

  useEffect(()=>{
    getavailableslots();
  },[docInfo])

  useEffect(()=>{
  
  },[docslots])


  return docInfo && (
    <div>
      <div className='flex flex-col sm:flex-row gap-4'>
        <div>
          <img className="bg-primary w-full rounded-lg sm:max-w-72" src={docInfo.image}/>
        </div>
        <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
          <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>{docInfo.name}
          <img className='w-5' src={assets.verified_icon}/>
          </p>
          <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
            <p>{docInfo.degree} - {docInfo.speciality}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experience}</button>
          </div>

          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>
              About <img src={assets.info_icon}/>
            </p>
            <p className='text-sm text-gray-500 max-w-[700px] mt-1'>
              {docInfo.about}
            </p>
          </div>
          <p className='text-gray-500 font-medium mt-4'>
            Appointment fee: <span className='text-gray-900'>{currencySymbols}{docInfo.fees}</span>
          </p>
        </div>
      </div>



        <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
          <p>Booking Slots</p>
          <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4 '>
            {
              docslots && docslots.map((item,index)=>(
                <div onClick={()=>{setslotindex(index)}} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotindex === index ? "bg-primary text-white":"border border-gray-200"}`} key={index}>
                  <p>{item[0] && daysofweek[item[0].datetime.getDay()]}</p>
                  <p>{item[0] && item[0].datetime.getDate()}</p>
                </div>
              ))
            }
          </div>


        <div className='flex gap-3 w-full overflow-x-scroll mt-4'>
          {docslots.length && docslots[slotindex].map((item,index)=>(
          <p onClick = {()=>(setslottime(item.time))} className={`flex-shrink-0 text-sm font-light px-5 py-2 rounded-full cursor-pointer ${item.time === slottime ? "bg-primary text-white":"text-gray-400 border border-gray-500"}`} key={index}>
            {item.time.toLowerCase()}
          </p>
          ))}
        </div>
        <button onClick={bookAppointment} className='bg-primary text-white text-sm font-light px-14 py-3 rounded-full'>Book An Appointment</button>
      </div>

      <RelatedDoctors docId={docId} speciality={docInfo.speciality}/>
     
    </div>
  )
}

export default Appointment
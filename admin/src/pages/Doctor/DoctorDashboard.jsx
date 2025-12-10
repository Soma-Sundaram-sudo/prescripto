import React, { useContext, useEffect } from 'react'
import { Doctorcontext } from '../../context/Doctorcontext'
import {assets} from "../../assets/assets"
import {Appcontext} from "../../context/Appcontext"

const DoctorDashboard = () => {

  const {dtoken,dashdata,setDashdata,getDashdata,completeAppointment,cancelAppointment} = useContext(Doctorcontext)
  const {currency,slotDateFormat} = useContext(Appcontext)

  useEffect(() => {
    if(dtoken){
      // console.log(dashdata)
      getDashdata()
    }
  },[dtoken])
  return dashdata &&  (
    <div className='m-5'>
      <div className='flex flex-wrap gap-3'>
        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.earning_icon}/>
          <div>
            <p className='text-xl font-semibold text-gray-600'>{currency}{dashdata.earnings}</p>
            <p className='text-gray-800'>Earnings</p>
          </div>
        </div>

        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.appointments_icon}/>
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashdata.appointments}</p>
            <p className='text-gray-800'>Appointments</p>
          </div>
        </div>

        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.patients_icon}/>
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashdata.patients}</p>
            <p className='text-gray-800'>Patients</p>
          </div>
        </div>
      </div>

      <div className='bg-white'>
        <div className='flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border'>
          <img src={assets.list_icon}/>
          <p className='font-semibold'>Latest Bookings</p>
        </div>
        <div className='pt-4 border border-t-0'>
          {
            dashdata.latestAppointments.map((item,index)=>(
              <div className='flex items-center px-6 py-3 gap-3 hover:bg-gray-100' key={index}>
                <img className='rounded-full w-10' src={item.userData.image}/>
                <div className='flex-1 text-sm'>
                  <p className='text-gray-800'>{item.userData.name}</p>
                  <p className='text-gray-600'>{slotDateFormat(item.slotDate)}</p>
                </div>
                {item.cancelled 
              ? 
              <p className='text-red-400 text-xs font-medium'>Cancelled</p>:item.isCompleted ? <p className='text-green-400 text-xs font-medium'>Completed</p>:
              <div className='flex'>
                <img onClick={()=>cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
                <img onClick={()=> completeAppointment(item._id)} className='w-10 cursor-pointer' src={assets.tick_icon} alt="" />
              </div>
              }
              </div>
            ))
          }
        </div>
      </div>

    </div>
  )
}

export default DoctorDashboard
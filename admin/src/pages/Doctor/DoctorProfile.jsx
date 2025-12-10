import React, { useContext, useEffect, useState } from 'react'
import { Doctorcontext } from '../../context/Doctorcontext'
import {Appcontext} from "../../context/Appcontext"
import axios from 'axios'
import { toast } from 'react-toastify'

const DoctorProfile = () => {

  const {dtoken,profile,setProfile,getProfileData} = useContext(Doctorcontext)
  const {currency} = useContext(Appcontext)

  const[isedit,setIsedit] = useState(false)

  const updateProfile = async() => {
    try {
      const updateData = {
        address:profile.address,
        fees:profile.fees,
        avaialable:profile.avaialable
      }

      const {data} = await axios.post("http://localhost:4000/api/doctor/update-profile",updateData,{headers:{dtoken}})
      if(data.success){
        toast.success(data.message)
        setIsedit(false)
        getProfileData() 
      }
    } catch (error) {
      toast.error(error.message)
      console.log(error)
    }
  }


  useEffect(()=>{
    if(dtoken){
      getProfileData()
    }
  },[dtoken])
  return (
    profile && 
    <div>
      <div className='flex flex-col gap-4 m-5'>
        <div>
          <img className='bg-primary/80 w-full sm:max-w-64 rounded-lg' src={profile.image}/>
        </div>
        <div className='flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white'>
          <p className='flex items-center gap-2 text-3xl font-medium text-gray-700'>{profile.name}</p>
          <div className='flex items-center gap-2 mt-1 text-gray-600'>
            <p>{profile.degree} - {profile.speciality}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>{profile.experience}</button>
          </div>
          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3'>About : </p>
            <p className='text-sm text-gray-600 max-w-[700px] mt-1 '>
              {profile.about}
            </p>
          </div>

          <p className='text-gray-600 font-medium mt-4'>
            Appointment fee:<span className='text-gray-800'>{currency}{isedit ? <input type='number' onChange={(e) => setProfile(prev => ({...prev,fees:e.target.value}))} value={profile.fees}/> :profile.fees}</span>
          </p>
          <div className='flex gap-2 py-2'>
            <p>Address :</p>
            <p className='text-sm'>
              {isedit ? <input type='text' onChange={(e) => setProfile(prev => ({...prev,address:{...prev.address,line1:e.target.value}}))} value={profile.address.line1}/>:profile.address.line1}<br/>
              {isedit ? <input type='text' onChange={(e) => setProfile(prev => ({...prev,address:{...prev.address,line2:e.target.value}}))} value={profile.address.line2}/>:profile.address.line2}
            </p>
          </div>

          <div className='flex gap-1 pt-2'>
            <input onChange={() => isedit && setProfile(prev =>({...prev,avaialable:!prev.avaialable}) )} checked={profile.avaialable} type='checkbox' id=""/>
            <label htmlFor=''>Available</label>
          </div>
          {
            isedit ? <button onClick={updateProfile} className='px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:text-white transition-all hover:bg-primary'>Save</button> : <button onClick={()=>setIsedit(true)} className='px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:text-white transition-all hover:bg-primary'>Edit</button>
          }
        </div>
      </div>
    </div>
  )
}

export default DoctorProfile
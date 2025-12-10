import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { Admincontext } from '../../context/Admincontext'
import { toast } from 'react-toastify';
import axios from 'axios';


const AddDoctor = () => {

  const [docImg, setDocImg] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [Password, setPassword] = useState("")
  const [experience, setExperience] = useState("1 year")
  const [fees, setFees] = useState("")
  const [about, setAbout] = useState("")
  const [speciality, setSpeciality] = useState("General Physician")
  const [degree, setDegree] = useState("")
  const [address1, setAddress1] = useState("")
  const [address2, setAddress2] = useState("")

  const { backendurl, atoken } = useContext(Admincontext)

  const onsubmithandler = async (event) => {
    event.preventDefault()
    try {

      if (!docImg) {
        return toast.error("Image Not Selected")
      }

      const formData = new FormData()

      formData.append("image", docImg)
      formData.append("name", name)
      formData.append("email", email)
      formData.append("Password", Password)
      formData.append("experience", experience)
      formData.append("fees", Number(fees))
      formData.append("about", about)
      formData.append("speciality", speciality)
      formData.append("degree", degree)
      formData.append("address", JSON.stringify({ line1: address1, line2: address2 }))

      formData.forEach((value, key) => {
        console.log(`${key}:${value}`)
      })
      console.log(atoken)
      const { data } = await axios.post(backendurl + "/api/admin/add-doctor", formData, { headers: { atoken } })

      if (data.success) {
        toast.success(data.message)
        setDocImg(false)
        setName("")
        setPassword("")
        setEmail("")
        setAddress1('')
        setAddress2('')
        setDegree('')
        setFees("")
        setAbout('')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error)
      console.log(error)
    }
  }

  return (
    <form onSubmit={onsubmithandler} >
      <p className='font-semibold m-7'>Add Doctors</p>
      <div className='bg-white sm:max-w-xl md:max-w-4xl h-full m-7 p-7 border rounded flex-1'>
        <div className='flex items-center gap-5'>
          <label htmlFor='Doc-img'>
            <img className='w-16 rounded-full' src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} />
          </label>
          <input onChange={(e) => setDocImg(e.target.files[0])} type='file' id="Doc-img" hidden />
          <p className='text-gray-400'>Upload Doctors <br /> image</p>
        </div>

        <div>
          <div className='flex sm:flex-col md:flex-row gap-14 mt-4 '>
            <div>
              <div>
                <p>Doctor Name</p>
                <input onChange={(e) => setName(e.target.value)} value={name} className='w-96 border rounded p-1.5 mt-2' type='text' placeholder='Name' required />
              </div>

              <div>
                <p className='mt-2'>Doctor Email</p>
                <input onChange={(e) => setEmail(e.target.value)} value={email} className='w-96 border rounded p-1.5 mt-2' type='email' placeholder='email' required />
              </div>

              <div>
                <p className='mt-2'>Password</p>
                <input onChange={(e) => setPassword(e.target.value)} value={Password} className='w-96 border rounded p-1.5 mt-2' type='password' placeholder='password' required />
              </div>

              <div>
                <p className='mt-2'>Experience</p>
                <select onChange={(e) => setExperience(e.target.value)} value={experience} className='w-96 border rounded p-1.5  mt-2'>
                  <option value="1 year">1 year</option>
                  <option value="2 year">2 year</option>
                  <option value="3 year">3 year</option>
                  <option value="4 year">4 year</option>
                  <option value="5 year">5 year</option>
                  <option value="6 year">6 year</option>
                  <option value="7 year">7 year</option>
                  <option value="8 year">8 year</option>
                  <option value="9 year">9 year</option>
                  <option value="10 year">10 year</option>
                </select>
              </div>

              <div>
                <p className='mt-2'>Fees</p>
                <input onChange={(e) => setFees(e.target.value)} value={fees} className='w-96 border rounded p-1.5  mt-2' type='number' placeholder='fees' required />
              </div>

            </div>
            <div>

              <div>
                <p>Speciality</p>
                <select onChange={(e) => setSpeciality(e.target.value)} value={speciality} className='w-96 border rounded p-1.5  mt-2'>
                  <option value="Gyncologist">Gyncologist</option>
                  <option value="General Physician">General Physician</option>
                  <option value="Dermatologist">Dermatologist</option>
                  <option value="Neurologist">Neurologist</option>
                  <option value="Gastroenterologist">Gastroenterologist</option>
                  <option value="Pediatricians">Pediatricians</option>
                </select>
              </div>
              <div>
                <p className='mt-2'>Education</p>
                <input onChange={(e) => setDegree(e.target.value)} value={degree} className='w-96 border rounded p-1.5  mt-2' type='text' placeholder='Education' required />
              </div>

              <div >
                <p className='mt-2'>Address</p>
                <input onChange={(e) => setAddress1(e.target.value)} value={address1} className='w-96 border rounded p-1.5 mt-2' type='text' required placeholder='Address 1' />
                <input onChange={(e) => setAddress2(e.target.value)} value={address2} className='w-96 border rounded p-1.5 mt-2' type='text' required placeholder='Address 2' />
              </div>

            </div>
          </div>
          <p className='mt-2' >About</p>
          <textarea onChange={(e) => setAbout(e.target.value)} value={about} className='w-full border rounded  px-2 mt-2' rows={5} placeholder='Write about doctors' />
          <button type='submit' className='bg-primary text-white p-2 mt-2 rounded-3xl'>Add Doctor</button>
        </div>

      </div>
    </form>
  )
}

export default AddDoctor
import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>
    <div className='text-center text-2xl pt-10 text-gray-500'>
      <p>ABOUT <span className='text-gray-700 font-medium'>US</span></p>
    </div>

    <div className='my-10 flex flex-col md:flex-row gap-12'>
      <img className='w-full md:max-w-[360px]' src={assets.about_image}/>
      <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
        <p>Our platform simplifies booking appointments with trusted medical professionals, offering a seamless and efficient way to connect with top doctors in your area. Whether for routine check-ups or specialized care, we ensure you find the right expert when you need them most. Your health and convenience are our priority.</p>
        <p>With an easy-to-use interface and real-time availability updates, scheduling a consultation has never been easier. Experience hassle-free healthcare booking, anytime, anywhere.</p>
        <b className='text-gray-800'>Vision</b>
        <p>Our vision is to revolutionize healthcare access by providing seamless, instant connections between patients and trusted medical professionals. We aim to make quality care accessible to everyone, anytime, and anywhere.</p>
      </div>
    </div>

    <div className='text-xl my-4'>
      <p>WHY <span className='font-semibold text-gray-700'>CHOOSE US</span></p>
    </div>

    <div className='flex flex-col md:flex-row mb-20'>
      <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white cursor-pointer transition-all'>
        <b>Efficiency :</b>
        <p>Our website ensures quick, hassle-free doctor bookings with real-time availability, making healthcare access faster and more efficient.</p>
      </div>
      <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white cursor-pointer transition-all'>
        <b>Convenience :</b>
        <p>With user-friendly features and 24/7 access, our platform makes scheduling medical appointments simple and convenient from anywhere.</p>
      </div>
      <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white cursor-pointer transition-all'>
        <b>Personalisation :</b>
        <p>Our platform offers personalized doctor recommendations based on your needs, ensuring the best match for your healthcare requirements.</p>
      </div>
    </div>
    </div>
  )
}

export default About
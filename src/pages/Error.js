import React from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimeError } from '../assets/Index'

function Error() {

  const navigate = useNavigate()
  const NavigateToHome = () =>
  {
      navigate('/')
  }

  return (
    <div>
      <div className='h-[calc(100vh-5rem)] max-w-[1240px] text-center flex flex-col items-center mx-auto gap-8 p-8'>
          <h1 className='text-5xl font-bold'>That doesnt exist!</h1>
          <img className='w-[600px]' src={AnimeError} alt=''/>
          <button 
          onClick={NavigateToHome}
          className='bg-[#801D2F] p-4'>Go back</button>
      </div>
    </div>
  )
}

export default Error
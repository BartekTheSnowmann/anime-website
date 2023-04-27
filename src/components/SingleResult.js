import React from 'react'
import { useNavigate } from 'react-router-dom'

function SingleResult({id,title,img,handleClick,theme}) {

  // Navigate after click
  const navigate = useNavigate()
  const handleNavigate = () =>
  {
    navigate(`/singleanime/anime/${id}`)
    handleClick()
  }

  return (
    <div 
    style={theme==='Light'? {background:'white', color:'#212121'}:{background:'#212121', color:'white'}}
    onClick={handleNavigate}
    className='flex p-2 text-white w-48 sm:w-60 pl-2 items-center hover:bg-primary cursor-pointer'>
      <div className='flex-1'>
        <h1 className=' text-sm sm:text-md font-bold'>{title}</h1>
      </div>
      <div className='flex-1'>
        <img src={img} alt=''/>
      </div>
    </div>
  )
}

export default SingleResult
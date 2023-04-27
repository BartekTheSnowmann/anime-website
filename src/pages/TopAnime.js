import React, {useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAxios from '../hooks/UseAxios'
import { motion } from 'framer-motion'

function TopAnime({theme}) {

  const [typeOfData, setTypeOfData] = useState('anime')
  const {data,loading} = useAxios(`https://api.jikan.moe/v4/top/${typeOfData}`) 

  const ChangeData = (dataType) =>
  {
    setTypeOfData(dataType)   
  }

  const navigate = useNavigate()
  const navigateTo = (id) =>
  {
    navigate(`/singleanime/${typeOfData}/${id}`)
  }

  const PageAnimation = {
    hidden:{
      opacity:0,
    },
    show:{
      opacity:1,
   
      transition:{
        type:'spring'
      }
    }
  }

  return (
    <>
    <motion.div
    variants={PageAnimation}
    initial='hidden'
    animate='show'>
    <div className='max-w-[1240px] mx-auto font-bold pb-4'>
      <div 
      style={theme==='Light'?{color:'#212121'}:{color:'white'}}
      className='flex p-4'>
        <button
        onClick={()=>ChangeData('anime')} 
        className={typeOfData === 'anime'? 'bg-primary text-white': '' }>Anime</button>
        <button
        onClick={()=>ChangeData('characters')}
        className={typeOfData === 'characters'? 'bg-primary text-white': '' }>Characters</button>
      </div>
      <div className='grid grid-cols-3 sm:grid-cols-4 xl:grid-cols-5 px-4 gap-4'>
      {loading === true? <h1>Loading...</h1>:
      data.map((item,index)=>
      (
      <div
        onClick={()=>navigateTo(item.mal_id)}
        className='hover:scale-105 duration-300 group relative cursor-pointer item_shadow'
        key={index}>
          <img src={item.images.jpg.image_url} alt={item.title} className='h-full w-full' />
          <div className='hidden group-hover:flex absolute top-0 h-full w-full bg-dark/50 text-white items-center justify-center'>
            <h1 className='text-sm sm:text-lg xl:text-xl px-2'>{item.title? (item.title):(item.name)}</h1>
          </div>
          
      </div>))}
      </div>
    </div>
    </motion.div>
    </>
  )
}

export default TopAnime
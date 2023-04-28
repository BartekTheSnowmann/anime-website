import React, {useEffect, useState} from 'react'
import {AiFillStar} from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';
import useAxios from '../hooks/UseAxios';
import { motion } from 'framer-motion';

function Recommended() {

  const url = 'https://api.jikan.moe/v4/top/anime'
  const {data} = useAxios(url)

  const [currentAnime, setCurrentAnime] = useState(data[Math.floor(Math.random()*25)])
  const randomAnime = () =>
  {
    const randomNumber = Math.floor(Math.random()*25)
    setCurrentAnime(data[randomNumber])
  }
  
  useEffect(() => {
        randomAnime()
        const interval = setInterval(() => {
          randomAnime()
         }, 3000);
        return () => clearInterval(interval);
    },[data])
    
    const navigate = useNavigate()
    const NavigateToAnime = () =>
    {
        navigate(`/singleanime/anime/${currentAnime.mal_id}`)
    }

  return (
    <div className='bg-primary' id='New'>
    <div className='text-white max-w-[1240px] mx-auto px-4 py-12'>
        {/* Whats new */}
        <div className='justify-self-start font-bold'>
          <h1 className='text-5xl md:text-6xl lg:text-7xl font-bold uppercase pb-12'>What's New</h1>
        </div>
        {/* Anime data */}
        
          {data.length > 3? 
          <div className='grid sm:grid-cols-2 sm:grid-rows-2 justify-items-between gap-4'>
            <motion.div className='text-gray-400'
            key={currentAnime?.title}
            initial={{y:20}}
            animate={{y:0}}
            transition={{type:'tween'}}>
                <h1 className='text-white text-3xl font-bold pt-12 pb-4'>{currentAnime?.title}</h1>
                <div className='flex items-center'>
                <p>{currentAnime?.score}</p> 
                <p className='mx-1'>
                  <AiFillStar className='text-yellow-400' size={30}/></p>
                </div>
                {currentAnime?.genres.map((genre, index)=>
                  (
                    <p key={index}>
                    {genre?.name}
                    </p>    
                  ))}
                <p>Episodes: {currentAnime?.episodes}</p>
            </motion.div>
          
            <div className='sm:row-span-2'
            >
                <img className='h-full w-full object-cover p-4 cursor-pointer'  
                onClick={NavigateToAnime}
                src={currentAnime?.images.jpg.image_url}/>
            </div>
          </div>:'...'}
    </div>
    </div>
  )
}

export default Recommended
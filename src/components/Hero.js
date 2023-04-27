import React from 'react'
import { Itachi } from '../assets/Index'

function Hero() {
 
  return (
    <div id='Home'>
      <div className='relative min-h-[500px]'>
        <img src={Itachi} alt='' className='min-h-[500px] max-h-[800px] w-full object-cover'/>
        <div className='bg-gray-800/60 absolute top-0 left-0 w-full h-full'>
          <div className='text-white max-w-[1240px] mx-auto h-full flex flex-col justify-center items-start px-4'>
            <div className='max-w-[500px] uppercase'>
              <h1 className='text-5xl md:text-6xl lg:text-7xl font-bold uppercase'>Welcome to AnimeWEB</h1>
              <p className='text-lg sm:text-xl text-gray-300 py-4'>You can watch here any Anime you would like & you can share your impressions with others</p>
            </div>
            <a href='#New'>
              <button className='border-2 border-white py-2 px-4 hover:bg-white hover:text-black'>See Whats New</button>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
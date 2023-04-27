import React, { useState } from 'react'
import { useContext } from 'react'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import FavoriteContext from '../context/FavoriteContext'
import { motion } from 'framer-motion';

function Favorites({theme}) {

  const {favoriteArray, setFavoriteArray} = useContext(FavoriteContext)

  const deleteFromFavorites = (id) =>
  {
    const newArray = favoriteArray.filter(item=>item.id !== id)
    setFavoriteArray(newArray)
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

  const [isEditing, setIsEditing] = useState(false)


  return (
    <div>
      <motion.div
      variants={PageAnimation}
      initial='hidden'
      animate='show'
      exit='hidden'>
        <div className='max-w-[1240px] mx-auto px-4 pt-4 flex gap-x-4 text-white'>
          <button className='bg-primary flex gap-x-2 items-center'
          onClick={()=>setIsEditing(true)} >Edit <AiFillEdit size={20} /> </button>
          {isEditing && <button className='bg-primary'
          onClick={()=>setIsEditing(false)}>Cancel</button>}
        </div>
        <div className='max-w-[1240px] mx-auto grid grid-cols-3 sm:grid-cols-4 xl:grid-cols-5 p-4 gap-6 md:gap-8 font-bold'>
          {favoriteArray.length === 0 ? <h1 className={theme === 'Light'?'text-3xl text-dark':'text-3xl text-white'}>List is empty</h1>:
          (
            favoriteArray.map((item=>
              (
                <div className='overflow-hidden group bg-white relative group item_shadow'
                key={item.title}>
                  <img src={item.img} alt='' className='h-full w-full'/>
                  <div className='hidden group-hover:flex absolute top-0 h-full w-full bg-dark/50 text-white items-center justify-center'>
                    <h1 className='drop-shadow-xl text-sm sm:text-lg xl:text-xl px-2  duration-300 transition-all'>{item.title? (item.title):(item.name)}</h1>
                  </div>
                   {isEditing  && <div 
                  className='cursor-pointer absolute bottom-0 left-0 bg-gray-400 hover:bg-primary duration-300 p-2'
                  onClick={()=>deleteFromFavorites(item.id)}>
                  <AiFillDelete size={25} className='text-white'/>
                  </div>}
                </div>
              )))
          )
          }
        </div>
      </motion.div>
  </div>
  )
}

export default Favorites
import React from 'react'
import { useContext } from 'react'
import { AiFillDelete } from 'react-icons/ai';
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

  return (
    <div>
      <motion.div
      variants={PageAnimation}
      initial='hidden'
      animate='show'
      exit='hidden'>
        <div className='max-w-[1240px] mx-auto grid grid-cols-3 sm:grid-cols-4 xl:grid-cols-5 p-4 gap-6 md:gap-8 font-bold'>
          {favoriteArray.length === 0 ? <h1 className={theme === 'Light'?'text-3xl text-dark':'text-3xl text-white'}>List is empty</h1>:
          (
            favoriteArray.map((item=>
              (
                <div className='hover:scale-105 duration-300 bg-white relative group item_shadow'
                key={item.title}>
                  <img src={item.img} alt='' className='h-full w-full '/>
                  <div className='hidden group-hover:flex absolute top-0 h-full w-full bg-dark/50 text-white items-center justify-center'>
                    <h1 className='drop-shadow-xl text-sm sm:text-lg xl:text-xl px-2'>{item.title? (item.title):(item.name)}</h1>
                  </div>
                  <div 
                  className='cursor-pointer absolute bottom-2 left-2'
                  onClick={()=>deleteFromFavorites(item.id)}>
                  <AiFillDelete size={40} className='text-white hidden group-hover:block'/>
                  </div>
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
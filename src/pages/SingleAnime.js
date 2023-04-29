import React, { useContext, useEffect, useState } from 'react'
import {useParams } from 'react-router-dom'
import UseAxios from '../hooks/UseAxios'
import {AiFillStar,AiOutlineCheck, AiOutlinePlus} from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import FavoriteContext from '../context/FavoriteContext'
import {motion } from 'framer-motion'

function SingleAnime({theme}) {

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

  const navigate = useNavigate()
  const {id,type} = useParams()
  const url = `https://api.jikan.moe/v4/${type}/${id}`
  const {data, loading, error} = UseAxios(url)
  if(error === true)
  {
    navigate('/notfound')
  }


  const [text, setText] = useState('')
  useEffect(()=>
  {
    if(data.about)
    {
      ShortenTheText()
    }
  },[data])

  const ChangeTextLength = () =>
  {
    if(text.length <= 259)
    {
      setText(data.about)
    }
    else
    {
      ShortenTheText()
    }
  }

  const ShortenTheText = () =>
  {
      let description = data.about
      description = data.about.substring(0,256)
      const dots = '...'
      setText(description + dots)
  }

  
  const {favoriteArray, setFavoriteArray} = useContext(FavoriteContext)
  const [favorite, setFavorite] = useState(false)
  const addToFavorite = () =>
  {
    if(favorite === false)
    {
      setFavorite(true)
      const newItem = {id:id, title:data?.name || data.title, img:data.images.jpg.image_url}
      setFavoriteArray([...favoriteArray, newItem])
    }
    else
    {
      setFavorite(false)
      const NewArray = favoriteArray.filter((item)=>item.id !== id)
      setFavoriteArray(NewArray)
    }
  }

  useEffect(()=>
  {
    setFavorite(false)
    favoriteArray.map((item)=>
    {
      if(item.id === id)
      {
        setFavorite(true)
      }
    })
  },[data])

  return (
    <>
      <motion.div
      variants={PageAnimation}
      initial='hidden'
      animate='show'>
        <>
        {loading === false?
          <>
          {type === 'anime'? //Anime
          <div className='max-w-[1240px] fixed_height mx-auto grid sm:grid-cols-2 px-4 py-6 gap-4'
          style={theme==='Light'?{color:'#212121'}:{color:'white'}}>
          <div className='self-start'>
            <h1 className='text-3xl font-bold'>{data.title}</h1>
            <div className='py-6 text-gray-400'>
              {data.score?<div className='flex items-center'>
              <p>{data?.score}</p>
              <p className='mx-1 text-gold'><AiFillStar size={30}/></p>
              </div>: ''}
              <p>Episodes: {data.episodes}</p>
              <div className='flex flex-col'>
                {data.genres.map((genre, index)=>
                  (
                  <p key={index}>{genre.name}</p>
                  ))}
              </div>
            </div>
            <div onClick={addToFavorite} className='font-bold col-start-2 flex items-center justify-end pb-6 gap-1 cursor-pointer'>
                  {favorite === false? <>
                  <p className='text-md'
                  variants={PageAnimation}
                  initial='hidden'
                  animate='show'
                  exit='hidden'>
                  Add to Favorites</p>
                  <AiOutlinePlus  size={30}/>
                  </>
                  :
                  <>
                  <p className='text-md'
                  variants={PageAnimation}
                  initial='hidden'
                  animate='show'
                  exit='hidden'>
                  Added to favorites</p>
                  <AiOutlineCheck className='text-green-400' size={30}/></> } 
                </div>
          </div>
          <div className='md:justify-self-end'>
            <img className='item_shadow' src={data.images.jpg.image_url} alt='' width='500px'/>
          </div>
        </div>
          : //Character
          <div 
          style={theme==='Light'?{color:'#212121'}:{color:'white'}}
          className='max-w-[1240px] fixed_height mx-auto grid sm:grid-cols-2 px-4 py-6'>
            <div className='self-start'>
              <h1 className='text-3xl font-bold'>{data.name}</h1>
              <h1 className='text-gray-400 py-6'>{text}
              <p className='cursor-pointer text-white text-md' 
              onClick={ChangeTextLength}>{text.length > 259? 'show less':'show more'}</p></h1>
               <div onClick={addToFavorite} className='font-bold col-start-2 flex items-center justify-end pb-6 gap-1 cursor-pointer'>
                  {favorite === false? <>
                  <p className='text-md'
                  variants={PageAnimation}
                  initial='hidden'
                  animate='show'
                  exit='hidden'>
                  Add to Favorites</p>
                  <AiOutlinePlus size={30}/>
                  </>
                  :
                  <>
                  <p className='text-md'
                  variants={PageAnimation}
                  initial='hidden'
                  animate='show'
                  exit='hidden'>
                  Added to favorites</p>
                  <AiOutlineCheck className='text-green-400' size={30}/></> } 
                </div>
            </div>
            <div className='md:justify-self-end'>
              <img className='item_shadow' src={data.images.jpg.image_url} alt='' width='400px'/>
            </div>
          </div>}
          </>
          : '...'} 
        </>
      </motion.div>
    </>
  )
}

export default SingleAnime
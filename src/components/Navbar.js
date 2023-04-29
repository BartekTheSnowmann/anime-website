import React, { useEffect, useRef, useState } from 'react'
import {AiOutlineSearch,AiOutlineMenu, AiOutlineClose} from 'react-icons/ai'
import {BsMoonFill, BsSunFill} from 'react-icons/bs'
import { Link, NavLink} from 'react-router-dom'
import SingleResult from './SingleResult'
import {motion, AnimatePresence } from 'framer-motion'

function Navbar({setSearch, searchData, SetTheme, theme}) {

  const [searchValue, setSearchValue] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const handleSubmit = (e) =>
  {
    e.preventDefault()
    setSearch(searchValue)
    setShowSearch(true)
  }

  // clicking outside of searchbar
  const searchTabRef = useRef()
  useEffect(()=>
  {
    let handler = (e) =>
    {
      if(!searchTabRef.current?.contains(e.target))
      {setShowSearch(false)}
    }
    window.addEventListener('mousedown', handler)
  })

  const handleClick =() =>
  {
    setShowSearch(false)
  }

  // 
  const [position, setPosition] = useState(true)
  const changeTheme = () =>
  {
    setPosition(prev=>!prev)
    if(theme === 'Light')
    {
      SetTheme('Dark')
    }
    else
    {
      SetTheme('Light')
    }
  }

  // Menu
  const [showMenu, SetShowMenu] = useState(false)
  const toggleMenu = () =>
  {
    SetShowMenu(prev=>!prev)
  }

  return (
    <div className='w-full h-20 z-10'>
      <div style={theme==='Light'? {background:'white', color:'#212121'}: {background:'#212121', color:'white'}}
      className='fixed w-full -translate-x-1/2 z-10 left-1/2 h-20 drop-shadow-lg'>
        <div className='max-w-[1240px] mx-auto h-full flex px-4 items-center justify-between'>
          
          {/* Logo */}
          <div>
              <Link to='/'><h1 className='text-4xl md:text-4xl lg:text-6xl font-bold text-primary cursor-pointer'>
                A<span className='text-yellow-400'>W</span></h1></Link>
          </div>
          
          {/* SearchBar */}
          <div>
          <form
          onSubmit={handleSubmit}
          className='flex items-center text-dark'>
            <input 
            type="text" 
            placeholder='Search...' 
            id='searchbar'
            onChange={e=>setSearchValue(e.target.value)}
            className='w-36 sm:w-60 outline-none p-2 m-2 bg-gray-200'/>
            <label htmlFor="searchbar"><AiOutlineSearch
            onClick={handleSubmit}
            style={theme==='Light'?{color:'#212121'}:{color:'white'}} size={30}/></label>
          </form>

          {/* SearchBar results */}
          <AnimatePresence>
            {showSearch && 
            <motion.div
            initial={{y:-20,opacity:0}}
            animate={{y:0,opacity:1}}
            exit={{y:-20,opacity:0}}
            transition={{type:'tween'}}
            className='max-h-[450px] overflow-scroll absolute top-20'
            ref={searchTabRef}>
            {searchData.map((item)=>
            (
              <SingleResult
              theme={theme}
              handleClick={handleClick}
              id={item.mal_id}
              key={item.mal_id}
              title={item.title}
              img={item.images.jpg.image_url}
              />
            ))}
            </motion.div>}
          </AnimatePresence>

          </div>


          {/* Navigation */}
          <div className='gap-x-8 md:flex items-center hidden'>
              <ul className='flex justify-around'>
                  <Link to='/favorites'>
                    <li>Favorites</li>
                  </Link>
                  <Link to='/top'>
                    <li>Top</li>
                  </Link>
              </ul>

          {/* Dark Mode */}
          <div 
          style={theme==='Light'?{background:'#212121'}:{}}
          className='relative cursor-pointer w-16 mx-auto flex items-center justify-between bg-white rounded-full p-[6px]' 
              onClick={changeTheme}>
                <BsSunFill className='text-yellow-400' size={20}/>
                <BsMoonFill className='text-gray-200' size={20} />
                <motion.div
                style={theme==='Light'?{background:'white'}:{background:'#212121'}}
                initial={{right:'4px'}}
                animate={position===true?{right:'4px'}:{left:'4px'}}
                transition={{type:'tween'}}
                className='z-10 w-6 h-6 rounded-full absolute'></motion.div>
              </div>
          </div>

          <div className='md:hidden '
            onClick={toggleMenu}>
            <AiOutlineMenu size={30} />
          </div>
        </div>
          
          {/* Menu */}
          <AnimatePresence>
          {showMenu && <motion.div
          style={theme==='Light'?{background:'white', color:'#212121'}:{background:'#212121', color:'white'}}
          initial={{x:'100%'}}
          animate={{x:0}}
          exit={{x:'100%'}}
          transition={{type: 'tween'}}
          className='shadow-xl block md:hidden fixed top-0 right-0 h-screen w-1/2'>
            <div className='h-20 flex items-center justify-end px-4'>
              <AiOutlineClose
              onClick={toggleMenu}
              size={30}/>
            </div>

            {/* Dark Mode in Menu */}
            <div 
            style={theme==='Light'?{background:'#212121'}:{}}
            className='relative cursor-pointer w-16 mx-auto flex items-center justify-between bg-white rounded-full p-[6px]' 
            onClick={changeTheme}>
                <BsSunFill className='text-yellow-400' size={20}/>
                <BsMoonFill className='text-gray-500' size={20} />
                <motion.div
                style={theme==='Light'?{background:'white'}:{background:'#212121'}}
                initial={{right:'4px'}}
                animate={position===true?{right:'4px'}:{left:'4px'}}
                transition={{type:'tween'}}
                className='z-10 w-6 h-6 rounded-full absolute'></motion.div>
              </div>
            <ul 
            onClick={toggleMenu}
            className='h-1/2 justify-evenly items-center flex flex-col'>
                  <li><NavLink to='/favorites'>Favorites</NavLink></li>
                  <li><NavLink to='/top'>Top</NavLink></li>
                  <li><NavLink to='/'>Home</NavLink></li>
              </ul>
          </motion.div>}
          </AnimatePresence>

      </div>
    </div>
  )
}

export default Navbar
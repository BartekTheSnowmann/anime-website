import Home from './components/Home'
import Navbar from './components/Navbar';
import useAxios from './hooks/UseAxios';
import {useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import SingleAnime from './pages/SingleAnime';
import Error from './pages/Error'
import TopAnime from './pages/TopAnime';
import Favorites from './pages/Favorites';
import { FavoriteProvider } from './context/FavoriteContext';
import { AnimatePresence } from 'framer-motion';

function App() {

  const [theme, SetTheme] = useState('Dark')

  const [search, setSearch] = useState('')
  const url = `https://api.jikan.moe/v4/anime?q=${search}`
  const {data} = useAxios(url)

  const location = useLocation()

  return (
    <div className={theme === 'Dark'? 'bg-[#212121] min-h-[100vh]' : 'bg-white min-h-[100vh]' }>
      <FavoriteProvider>
        <Navbar 
        searchData={data}
        search={search}
        setSearch={setSearch}
        SetTheme={SetTheme}
        theme={theme}
        />
        <AnimatePresence location={location}>
          <Routes>
            <Route path='/' element={<Home theme={theme} />} />
            <Route path='/singleanime/:type/:id' element={<SingleAnime theme={theme}/>}/>
            <Route path='*' element={<Error/>}/>
            <Route path='/top' element={<TopAnime theme={theme}/>}/>
            <Route path='/favorites' element={<Favorites theme={theme}/>}/>
          </Routes>
        </AnimatePresence>
      </FavoriteProvider>
    </div>
  );
}

export default App;

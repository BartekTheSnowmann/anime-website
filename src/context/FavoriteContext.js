import { useState, createContext } from "react";

const FavoriteContext = createContext()

export function FavoriteProvider({children})
{
    const [favoriteArray, setFavoriteArray] = useState([])

    return( 
        <FavoriteContext.Provider  value={{favoriteArray, setFavoriteArray}}>
                {children}
        </FavoriteContext.Provider>
    )
}
export default FavoriteContext
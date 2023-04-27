import React, {useEffect, useState} from 'react'
import axios from 'axios'


function useAxios(url) {
    
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true) 
    const [error, setError] = useState(false) 

    useEffect(()=>
    {
        axios.get(url).then((response)=>
        {
            setData(response.data.data)
            setLoading(false)
        }).catch((err)=>
        {
            if(err)
            {
                setError(true)
            }
            
        }).finally()
        {
            setLoading(true)
        }
    },[url])

    return {data, loading, error}
}

export default useAxios
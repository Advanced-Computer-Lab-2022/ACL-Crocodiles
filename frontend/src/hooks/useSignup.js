import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
    const[error,setError]=useState(null)
    const[isLoading,setIsLoading]=useState(null)
    const{dispatch} = useAuthContext()
    const signup = async (Username,Email,Password,Firstname,Lastname,Gender) =>{
        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/users/trainee',{method:'POST',headers:{'Content-Type':'application/json'},
        body:JSON.stringify({Username,Email,Password,Firstname,Lastname,Gender})
    })
    const json = await response.json()
    
    if(!response.ok){
        setIsLoading(false)
        setError(json.error)
    }
    if(response.ok){
        localStorage.setItem('user',JSON.stringify(json))
        dispatch({type: 'LOGIN', payload :json})
        setIsLoading(false)
    }

    }
    return{signup,isLoading,error}
}
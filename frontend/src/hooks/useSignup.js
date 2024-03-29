import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { useNavigate } from 'react-router-dom'
export const useSignup = () => {
    const[error,setError]=useState(null)
    const[isLoading,setIsLoading]=useState(null)
    const{dispatch} = useAuthContext()
    let navigate = useNavigate();
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
        navigate('/')
    }

    }
    return{signup,isLoading,error}
}
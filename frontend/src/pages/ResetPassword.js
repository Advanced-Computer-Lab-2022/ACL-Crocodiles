import { useState } from "react"
import {useNavigate} from 'react-router-dom'

const ResetPassword = () =>{
    const[Password,setPassword] = useState('')
    const[Confirm,setConfirm] = useState('')
    const[error,setError] = useState(null)
    const navigate = useNavigate()
    const handleClick = async (e) => {
        e.preventDefault()
        const user = {Password,Confirm}
        const response =  await fetch('/api/auth/resetpassword',{method:'POST',body:JSON.stringify(user),headers: {
            'content-type':'application/json'}})
        const json = await response.json()
        if(!response.ok){
            setError(json.error)    
            }
        if (response.ok){
            setPassword('')
            setConfirm('')
            setError(null)
            navigate('/signin')
               
    }
}

        
    
    return(
        <div>
        <h3>Forgot Password</h3>
        <label>Password:</label>
        <input type="password" onChange={(e) => setPassword(e.target.value)} value={Password}/>
        <label>Confirm Password:</label>
        <input type="password" onChange={(e) => setConfirm(e.target.value)} value={Confirm}/>
        <button onClick={handleClick}>Change Password</button>
        {error && <div className='error'>{error}</div>}
        </div>
)
    }
export default ResetPassword
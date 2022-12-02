import { useState } from "react"


const ForgotPassword = () =>{
    const[Email,setEmail] = useState('')
    const[error,setError] = useState(null)
    const handleClick = async (e) => {
        e.preventDefault()
        const user = {Email}
        const response =  await fetch('/api/auth/forgotpassword',{method:'POST',body:JSON.stringify(user),headers: {
            'content-type':'application/json'}})
        const json = await response.json()
        if(!response.ok){
            setError(json.error)    
            }
        if (response.ok){
            setEmail('')
            setError('')
            
               
    }
}
    return(
        <div>
        <h3>Forgot Password</h3>
        <label>Email:</label>
        <input type="email" onChange={(e) => setEmail(e.target.value)} value={Email}/>
        <button onClick={handleClick}>Change Password</button>
        {error && <div className='error'>{error}</div>}
        </div>
)
}
export default ForgotPassword
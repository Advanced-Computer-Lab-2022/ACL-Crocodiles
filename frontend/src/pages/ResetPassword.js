import { useState } from "react"

const ResetPassword = () =>{
    const[Password,setPassword] = useState('')
    const[error,setError] = useState(null)
    const handleClick = async (e) => {
        e.preventDefault()

        
    }
    return(
        <div>
        <h3>Forgot Password</h3>
        <label>Email:</label>
        <input type="email" onChange={(e) => setPassword(e.target.value)} value={Password}/>
        <button onClick={handleClick}>Change Password</button>
        {error && <div className='error'>{error}</div>}
        </div>
)
}
export default ResetPassword
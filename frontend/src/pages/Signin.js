import {useState} from 'react'
import { useLogin } from '../hooks/useLogin'


const Signin = () => {
    const[Email,setEmail] = useState('')
    const[Password,setPassword] = useState('')
    const {login,error,isLoading}= useLogin()
    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(Email,Password)
    }


    return(
        <form className="signin" onSubmit={handleSubmit}>
            <h3>Sign In</h3>
            <label>Email:</label>
            <input type="email" onChange={(e) => setEmail(e.target.value)} value={Email}/>
            <label>Password:</label>
            <input type="password" onChange={(e) => setPassword(e.target.value)} value={Password}/>
         
            <button disabled={isLoading}>Signin</button>
            <a href="/forgotpassword">Forgot Password?</a>
            {error && <div className='error'>{error}</div>}
        </form>
    )
}
export default Signin
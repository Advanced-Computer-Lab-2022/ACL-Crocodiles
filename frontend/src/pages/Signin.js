import {useState} from 'react'
import { useLogin } from '../hooks/useLogin'


const Signin = () => {
    const [Username,setUsername] = useState('')
    const[Password,setPassword] = useState('')
    const {login,error,isLoading}= useLogin()
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(Username,Password)
        await login(Username,Password)
    }


    return(
        <form className="signin" onSubmit={handleSubmit}>
            <h3>Sign In</h3>
            <label>Username:</label>
            <input onChange={(e) => setUsername(e.target.value)} value={Username}/>
            <label>Password:</label>
            <input type="password" onChange={(e) => setPassword(e.target.value)} value={Password}/>
         
            <button disabled={isLoading}>Signin</button>
            <a href="/forgotpassword">Forgot Password?</a>
            {error && <div className='error'>{error}</div>}
        </form>
    )
}
export default Signin
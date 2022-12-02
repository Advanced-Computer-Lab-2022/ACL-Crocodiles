import {useState} from 'react'
import { useSignup } from '../hooks/useSignup'


const Signup = () => {
    const[Email,setEmail] = useState('')
    const[Firstname,setFirstname] = useState('')
    const[Lastname,setLastname] = useState('')
    const[Password,setPassword] = useState('')
    const {signup,error,isLoading} = useSignup()
    const handleSubmit = async (e) => {
        e.preventDefault()

        await signup(Email,Password,Firstname,Lastname)
    }

    return(
        <form className="signup" onSubmit={handleSubmit}>
            <h3>Sign Up</h3>
            <label>Firstname:</label>
            <input type="text" onChange={(e) => setFirstname(e.target.value)} value={Firstname}/>
            <label>Lastname:</label>
            <input type="text" onChange={(e) => setLastname(e.target.value)} value={Lastname}/>
            <label>Email:</label>
            <input type="email" onChange={(e) => setEmail(e.target.value)} value={Email}/>
            <label>Password:</label>
            <input type="password" onChange={(e) => setPassword(e.target.value)} value={Password}/>
            <button disabled = {isLoading}>Signup</button>
            {error && <div className='error'>{error}</div>}
        </form>
    )
}
export default Signup
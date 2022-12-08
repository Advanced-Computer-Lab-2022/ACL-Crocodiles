import { useAuthContext } from "../hooks/useAuthContext";
import {useState} from 'react'

const Profile = () => {
    const {user} = useAuthContext()
    const[error,setError] = useState(null)

    const handleLogin = async (e) => {
        e.preventDefault()
        if(!user){
            setError('You must be logged in')
            return
        }
    }
     
    return (
        <div className="Profile">
            <a href="/changePassword" class="button">Change Password</a>
        </div>
        
    )
}
export default Profile
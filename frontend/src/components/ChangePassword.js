import {useState} from 'react'
import { useAuthContext } from "../hooks/useAuthContext";
const jwt =  require('jsonwebtoken')

const ChangePassword = () => {

    const[OldPassword,setOldPassword] = useState('')
    const[NewPassword1,setNewPassword1] = useState('')
    const[NewPassword2,setNewPassword2] = useState('')
    const[error,setError] = useState(null)
    const{user} = useAuthContext()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const verify = jwt.verify(user.token,process.env.SECRET);
        if (!verify)
        setError({error:'Invalid Secret'})
        const {Email} = jwt.decode(user.token);
    }

    return (
        <form className="signin" onSubmit={handleSubmit}>
            <h3>Change Password</h3>
            <label>Old Password:</label>
            <input type="password" onChange={(e) => setOldPassword(e.target.value)} value={OldPassword}/>
            <label>New Password:</label>
            <input type="password" onChange={(e) => setNewPassword1(e.target.value)} value={NewPassword1}/>
            <label>Confirm New Password:</label>
            <input type="password" onChange={(e) => setNewPassword2(e.target.value)} value={NewPassword2}/>

            <button>Change</button>
            {error && <div className='error'>{error}</div>}
        </form>
    )
}
export default ChangePassword
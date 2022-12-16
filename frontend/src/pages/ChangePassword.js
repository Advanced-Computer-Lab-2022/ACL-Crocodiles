import {useState} from 'react'
import { useAuthContext } from "../hooks/useAuthContext";
import jwt_decode from "jwt-decode";

const ChangePassword = () => {

    const[OldPassword,setOldPassword] = useState('')
    const[NewPassword1,setNewPassword1] = useState('')
    const[NewPassword2,setNewPassword2] = useState('')
    const[error,setError] = useState(null)
    const{user} = useAuthContext()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {Username} = jwt_decode(user.token);
        await changePass(Username,OldPassword,NewPassword1,NewPassword2)
    }
    const changePass = async (Username,OldPassword,NewPassword1,NewPassword2)  => {
        setError(null)

        const response = await fetch('/api/auth/changepassword',{method:'PUT',headers:{'Content-Type':'application/json',},
        body:JSON.stringify({Username,OldPassword,NewPassword1,NewPassword2})
        })
        const json = await response.json();
        if(!response){
            setError(json.error)
        }
        if(response){
            alert("Password Changed")
        }
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
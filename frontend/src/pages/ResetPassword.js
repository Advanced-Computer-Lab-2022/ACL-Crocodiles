import { useState } from "react"
import {useNavigate} from 'react-router-dom'
import { TextField,Alert,Button,Stack,Grid } from "@mui/material"

const ResetPassword = () =>{
    const[Password,setPassword] = useState('')
    const[Confirm,setConfirm] = useState('')
    const[error,setError] = useState(null)
    const[success,setSuccess]=useState(null)
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

const buttonstyle =  {background:"#a00407"}   
    
    return(
      
        <Grid  align="center" sx={{background:"white" ,height:400 , width:400 ,margin:"20px auto"}} >
            <Stack direction="column" spacing={3} alignItems='center'>
          
               
        <h3>Reset Password</h3>

       
         
          <TextField
          sx={{width:"75%",}}
            required
            id="outlined-required"
            type="password"
            label="New Password"
            onChange={(e) => setPassword(e.target.value)}
            value={Password}
            
            />
            <TextField
            sx={{width:"75%",}}
            required
            id="outlined-required"
            type="password"
            label="Confirm Password"
            onChange={(e) => setConfirm(e.target.value)}
            value={Confirm}
            
            />
             {error && <Alert severity="error"> {error}</Alert>}
             {success && <Alert severity="success"> {success}</Alert>}
       
            <Button style={buttonstyle} sx={{width:"75%" }} onClick={handleClick} variant="contained">Reset Password</Button>
            </Stack>
           
          </Grid>

        
)
    }
export default ResetPassword
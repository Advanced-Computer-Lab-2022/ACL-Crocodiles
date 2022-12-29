import { useState } from "react"
import { Grid,Avatar,TextField,Stack,Button,Link,Dialog,Alert} from "@mui/material"
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
const ForgotPassword = () =>{
    const[Email,setEmail] = useState('')
    const[error,setError] = useState(null)
    const[success,setSuccess] = useState(null)
    const handleClick = async (e) => {
        e.preventDefault()
        const user = {Email}
        const response =  await fetch('/api/auth/forgotpassword',{method:'POST',body:JSON.stringify(user),headers: {
            'content-type':'application/json'}})
        const json = await response.json()
        if(!response.ok){
            setError(json.error)
            setEmail('')
            setSuccess('')
            }
        if (response.ok){
            setEmail('')
            setError('')
            setSuccess("A mail has been sent to you")            
            }

}
const buttonstyle =  {background:"#a00407"}   
    return(
        <div>
        
        <Grid  align="center" sx={{background:"white" ,height:400 , width:400 ,margin:"20px auto"}} >
            <Stack direction="column" spacing={5} alignItems='center'>
                <Grid >
                <Stack direction="row" spacing={1} alignItems='center'>
        <h3>Forgot Password</h3>
            <Avatar sx={{ width: 20, height: 20, background:"#a00407"}}>
              <QuestionMarkIcon  ></QuestionMarkIcon>
            </Avatar>
            </Stack>
            </Grid>
         
          <TextField
          sx={{width:"75%",}}
            required
            id="outlined-required"
            label="Email"
            helperText="input your email"
            onChange={(e) => setEmail(e.target.value)}
            value={Email}
            
            />
             {error && <Alert severity="error"> {error}</Alert>}
             {success && <Alert severity="success"> {success}</Alert>}
       
            <Button style={buttonstyle}  sx={{color:"a00407",width:"75%" }} onClick={handleClick} variant="contained">Change Password</Button>
            </Stack>
            <Link href="/signin">Sign in</Link>
           
           
          </Grid>

        </div>
)
}
export default ForgotPassword
import {useState} from 'react'
import { useSignup } from '../hooks/useSignup'
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import PersonIcon from '@mui/icons-material/Person';
import Paper from '@mui/material/Paper';

const Signup = () => {
    const[Username,setUsername] = useState('')
    const[Email,setEmail] = useState('')
    const[Firstname,setFirstname] = useState('')
    const[Lastname,setLastname] = useState('')
    const[Password,setPassword] = useState('')
    const {signup,error,isLoading} = useSignup()
    let checkbox = true
    const handleSubmit = async (e) => {
        e.preventDefault()
       
        await signup(Username,Email,Password,Firstname,Lastname)
    }
    
    const PaperStyle={height:'100vh' ,width:500, margin:'20px auto',padding:10}
        return(
       <Grid>
        <Paper  elevation={10} style={PaperStyle}>

        </Paper>
       </Grid>
    )
}
export default Signup
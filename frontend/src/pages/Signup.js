import {useState} from 'react'
import { useSignup } from '../hooks/useSignup'
import Button from '@mui/material/Button';
import { Grid ,Alert} from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import PersonIcon from '@mui/icons-material/Person';
import Paper from '@mui/material/Paper';
import { TextField } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const Signup = () => {
    const[Username,setUsername] = useState('')
    const[Email,setEmail] = useState('')
    const[Firstname,setFirstname] = useState('')
    const[Lastname,setLastname] = useState('')
    const[Password,setPassword] = useState('')
    const[Gender,setGender] = useState('')
    const {signup,error,isLoading} = useSignup()
    let checkbox = true
    const handleSubmit = async (e) => {
        e.preventDefault()
       console.log(Username,Email,Password,Firstname,Lastname,Gender)
        await signup(Username,Email,Password,Firstname,Lastname,Gender)
    }
    
    const Paper1Style={height:'100vh' ,width:400,margin:'20px -200px',padding:10}
    const Paper2Style={height:'100vh' ,width:400,margin:'20px 200px',padding:10}
    const h4 ={margin:'4px'}
        return(
        
       <Grid container rowSpacing={0} >

        <Paper elevation={5} style={Paper2Style}>
            <h2>Why join us?</h2>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis voluptates possimus, eum omnis at esse facilis quis minus, amet sed nostrum error. Nobis labore maiores sint dolorem. Iste, nulla ex?
        </Paper>
        <Paper  elevation={5} style={Paper1Style}> <h2>Create an acount</h2>
        <Stack direction='column' spacing={2}> 
        <TextField
          required
          id="outlined-required"
          label="Firstname"
          onChange={(e) => setFirstname(e.target.value)}
          value={Firstname}
          fullWidth 
        />
        <TextField
          required
          id="outlined-required"
          label="Lastname"
          onChange={(e) => setLastname(e.target.value)}
          value={Lastname}
          fullWidth 
        />
        <TextField
          required
          id="outlined-required"
          label="Username"
          onChange={(e) => setUsername(e.target.value)}
          value={Username}
          fullWidth 
        />
         <TextField
          required
          id="outlined-required"
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={Email}
          fullWidth 
        />
        <TextField
          required
          id="outlined-required"
          type="password"
          label="password"
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
          value={Password}
          fullWidth 
        />
        <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={Gender}
        onChange={(e) => setGender(e.target.value)}
        >
        <h4 style={h4}>Gender:</h4>
        <Stack direction='row' >
        <FormControlLabel value="female" control={<Radio />} label="Female" />
        <FormControlLabel value="male" control={<Radio />} label="Male" />    
        </Stack>
        </RadioGroup>
      
        <Typography>By creating an account, I agree to the <Link href= '/termsandconditions'>Terms and conditions </Link>
        </Typography> 
        <Typography>Already have an acount  ? <Link href= '/signin'>Signin </Link>
        </Typography>
        <Button variant="contained"  fullWidth disabled = {isLoading} onClick={handleSubmit} >
         Sign Up
         </Button>
         {error && <Alert severity='error'>{error}</Alert>}
        </Stack>
        
        </Paper>
      
           
       
      
       </Grid>
    )
}
export default Signup
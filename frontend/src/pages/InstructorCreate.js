
import NewCourseForm from "../components/NewCourseForm"
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { TextField,Stack,Box,FormControl,InputLabel,MenuItem,Select, Alert } from "@mui/material";
//import ExamForm from "./ExamForm"
import EditForm from "../components/EditInstructor"
import Exam from "../components/Exam"
import { useAuthContext } from "../hooks/useAuthContext"
import { useEffect, useState } from 'react'


const InstructorCreate = () => {
    const [rating, setRating] = useState(null)
    const[Gender,setGender] = useState('')
    const[Firstname,setFirstname] = useState('')
    const[Lastname,setLastname] = useState('')
    const [error, setError] = useState(null)
    const { user } = useAuthContext()
    var Flag
    const [open, setOpen] = useState(false);
    const [OpenContract, setOpenContract] = useState(false);
    const theme = useTheme();
    const fullScreen  = useMediaQuery(theme.breakpoints.down('md'));
    var count = 0
useEffect(() => {
    if( user && user.flag==="true" && count === 0){
        console.log(count)
        count++
        setOpen(true)
    }

},[user])
const handleEdit =  async (e) => {
    e.preventDefault()
   
    const body = {Firstname,Lastname,Gender}
    const response = await fetch('/api/instructor/editinsinfo',{method:'POST',headers:{'Content-Type':'application/json','Authorization': `Bearer ${user.token}`,},
    body:JSON.stringify(body)
 })
 const json = await response.json()

 if(!response.ok){
     setError(json.error)
     alert(error)
     console.log(error)
     }
 if (response.ok){
   setOpen(false)
   setOpenContract(true)
     }
    
 }


 const handleAgree = async (e) => {
 e.preventDefault()
 setOpenContract(false)
 user.flag = "false"
 Flag = false 
 const response = await fetch('/api/instructor/setflag',{method:'POST',headers:{'Content-Type':'application/json','Authorization': `Bearer ${user.token}`,},
 body:JSON.stringify({Flag})
 })

 const json = await response.json()
 //localStorage.setItem('user',JSON.stringify(json))
  }


    return (
        <div>
        <div>
            <h1> Instructor Create</h1>
            <Dialog 
         
        fullWidth
        fullScreen={fullScreen}
        open={OpenContract}
        aria-labelledby="responsive-dialog-title">
        <DialogTitle>
        Contract Agreement
        </DialogTitle>
       <DialogContentText margin='10px '>
       by accepting this contract you are agreeing on Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, placeat culpa. Est quas magnam dicta, doloremque architecto nesciunt fuga autem quisquam dolorem consequuntur ad ratione necessitatibus magni! Ipsa, dolorem! Dolorum?.
       </DialogContentText>
       <DialogActions>
       <Button onClick={handleAgree} autoFocus>
            Agree
          </Button>
       </DialogActions>
    </Dialog>
      <Dialog
        fullWidth
        fullScreen={fullScreen}
        open={open}
        aria-labelledby="responsive-dialog-title"
      >
        
        <DialogContent >
        <Stack spacing = {1}>
       <h3>Please fill in the rest of your info</h3>
        <TextField
          required
          id="outlined-required"
          label="Firstname"
          fullWidth 
          onChange={(e) => setFirstname(e.target.value)}
          value={Firstname}
        />
        <TextField
          required
          id="outlined-required"
          label="Lastname"
          onChange={(e) => setLastname(e.target.value)}
          value={Lastname}
          fullWidth 
        />
   
      <FormControl size = 'small' fullWidth = 'false'>
        <InputLabel id="demo-simple-select-label">Gender</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label='Gender'
          onChange={(e) => setGender(e.target.value)}
          value={Gender}
        >
          <MenuItem value={'Male'}>Male</MenuItem>
          <MenuItem value={'Female'}>Female</MenuItem>
          <MenuItem value={''}></MenuItem>
        </Select>
      </FormControl>
      <Alert   icon={false} severity="error">
       {error}
      </Alert>    

      </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEdit} autoFocus>
            Edit info
          </Button>
        </DialogActions>
       
      </Dialog>
      
    </div>
            <NewCourseForm/>
        </div>
    )
}
export default InstructorCreate
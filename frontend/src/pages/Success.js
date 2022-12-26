import { Dialog, Typography,Stack,DialogTitle,DialogContent,DialogActions,Button,Alert } from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuthContext"

const Success = () => {
    const [Open,setOpen]=useState(true)
    const[error,setError]=useState(null)
    const{user}=useAuthContext()
    const navigate = useNavigate()
    const handlebuy = async () => {
        const response =  await fetch('/api/trainee/addcourse',{method:'POST',headers: {
            'Authorization': `Bearer ${user.token}`
            }})
        const json = await response.json()
        if(!response.ok){
            setError(json.error)
            console.log(error)   
            }
        if (response.ok){
            navigate('/Mycourses')
            setOpen(false)
    }
    }
    return(
        <Dialog 
        fullWidth
        open={Open}
        aria-labelledby="responsive-dialog-title">      
        <Stack >
        <DialogTitle marginBottom='-5px'>
         Success
        </DialogTitle>
        <DialogContent margin='5px '>
        <Alert>
        <Typography>Your purchase was successfull</Typography>
        </Alert>
        </DialogContent>
        <DialogActions>
        <Button onClick={handlebuy} autoFocus>
        Go to courses
        </Button>   
        </DialogActions>
        </Stack>
    </Dialog>
     )
 }
 
 export default Success
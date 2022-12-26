import { useAuthContext } from "../hooks/useAuthContext";
import { useState, useEffect } from 'react'
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import {
    autocompleteClasses,
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    Typography,
    Stack,
    TextField,
    Rating,
    Dialog,
    DialogContent, 
    DialogTitle,
    DialogContentText,
    DialogActions,
    Alert,
    Fade

} from '@mui/material';





const Profile = () => {
    const { user } = useAuthContext()
    const [Instructor, setInstructor] = useState(null)
    const[OldPassword,setOldPassword] = useState('')
    const[NewPassword1,setNewPassword1] = useState('')
    const[NewPassword2,setNewPassword2] = useState('')
    const[OldEmail,setOldEmail] = useState('')
    const[Open1,setOpen1] = useState(false)
    const[Open2,setOpen2] = useState(false)
    const[Open3,setOpen3] = useState(false)
    const[alertvisibilty,setAlertVisibility] = useState(false)
    const [error, setError] = useState(null)
    const [error1, setError1] = useState(null)
    const [error2, setError2] = useState(null)
    const [success,setSuccess] = useState('')
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const[Email,setEmail] = useState('')
    const[Biography,setBiography] = useState('')
    
    useEffect(() => {
       
        const fetchIns = async () => {
           
            const response = await fetch('/api/instructor/insdetails',{headers: {
                'Authorization': `Bearer ${user.token}`,
                'content-type': 'application/json'
                    }
                })
            const json = await response.json()
            if (response.ok) {
                setInstructor(json)
                console.log(json)
                setOldEmail(json.user.Email)
                
            }
            if (!response.ok) {
                setError(json.error)
            }
        }
        fetchIns()
        
       
    },)

    

    const handleOpenEmail = async (e) =>{
        setOpen1(true)
    }
    const handleOpenPass = async (e) =>{
        e.preventDefault()
        setOpen2(true)
    }
    const handleEmailBio = async (e) =>{
        
        const updated = {Email,Biography}

        console.log(JSON.stringify(updated))
        const response =  await fetch('/api/instructor/editbiographyoremail',{method:'put',body:JSON.stringify(updated),headers: {
            'Authorization': `Bearer ${user.token}`,
            'content-type':'application/json',       
        }
      })
      const json = await response.json()
    if(!response.ok){
        setError2(json.error)
        setEmail('')
        setBiography('')
       
       
    }
    if (response.ok){
        setEmail('')
        setBiography('')
        setOpen1(false)
       
        alert("Email changed")
        setOpen3(false)
       // setId('')
        setError(null)
       
    }
    }
    const handleOpenBio = async (e) => {
        e.preventDefault();
        setOpen3(true)
    }

    const handlePass = async (e) => {
        e.preventDefault();
        const Username = user.Username;
        await changePass(Username,OldPassword,NewPassword1,NewPassword2)
    }
        const changePass = async (Username,OldPassword,NewPassword1,NewPassword2)  => {

        const response = await fetch('/api/auth/changepassword',{method:'PUT',headers:{'Content-Type':'application/json',},
        body:JSON.stringify({Username,OldPassword,NewPassword1,NewPassword2})
        })
        const json = await response.json();
        if(!response.ok){
            setError1(json.error)
            
        } 
        if(response.ok){
            setOpen2(false)
            setAlertVisibility(true)
            setSuccess('Password Changed')

        }
    }

    const cardstyle = { width: 600, margin: '20px auto', height:600 }
    const buttonstyle = { maxWidth: '150px', maxHeight: '30px', minWidth: '30px', minHeight: '30px', fontSize: '10px' ,margin:'25px '}
    const textfield = {  margin: '20px auto' }
    const buttonstyle2 = { maxWidth: '150px', maxHeight: '30px', minWidth: '30px', minHeight: '30px', fontSize: '10px' ,margin:'12px auto  '}


    return (

        
        <div>

        

            <Dialog 
                fullWidth
                fullScreen={fullScreen}
                open={Open2}
                aria-labelledby="responsive-dialog-title">
                <Stack spacing={3}>
                <DialogTitle marginBottom='-5px'>
                 Change Password
                 </DialogTitle>
                <DialogContent margin='5px '>
                <Stack spacing={1} >

                <TextField 
                id="standard-password-input"
                label="Old Password"
                type="password"
                variant="standard"
                required
                onChange={(e) => setOldPassword(e.target.value)}
                value={OldPassword}
                />
                <TextField
                id="standard-password-input"
                label="New Password"
                type="password"
                variant="standard"
                required
                onChange={(e) => setNewPassword1(e.target.value)}
                value={NewPassword1}
                fullWidth 
                /> 
                <TextField
                id="standard-password-input"
                label="Confrim Password"
                type="password"
                variant="standard"
                required
                onChange={(e) => setNewPassword2(e.target.value)}
                value={NewPassword2}
                fullWidth 
                />


               
                
                {error1 && <Alert severity="error">{error1}</Alert>}
                </Stack>
                </DialogContent>
                <DialogActions>
                <Button onClick={handlePass} autoFocus>
                Confirm
                </Button>
                </DialogActions>
                </Stack>
            </Dialog>
         
            <Dialog 
                fullWidth
                fullScreen={fullScreen}
                open={Open1}
                aria-labelledby="responsive-dialog-title">
                <Stack >
                <DialogTitle marginBottom='-5px'>
                 Change Email
                </DialogTitle>

                <DialogContent margin='5px '>
                <TextField 
                id="standard-password-input"
                label="New Email"
                type="Email"
                variant="standard"
                required
                onChange={(e) => setEmail(e.target.value)}
                />
               
                 {error2 && <Alert severity="error">{error2}</Alert>}
        
                </DialogContent>
                <DialogActions>
                <Button onClick={handleEmailBio} autoFocus>
                Confirm
                </Button>
               
                </DialogActions>
                </Stack>
            </Dialog>
            
            <Dialog 
                fullWidth
                fullScreen={fullScreen}
                open={Open3}
                aria-labelledby="responsive-dialog-title">      
                <Stack >
                <DialogTitle marginBottom='-5px'>
                 Edit Bio
                </DialogTitle>
                <DialogContent margin='5px '>
                <TextField 
                id="standard-password-input"
                multiline
                type="text"
                required
                fullWidth
                onChange={(e) => setBiography(e.target.value)}
                />

                </DialogContent>
                <DialogActions>
                <Button onClick={handleEmailBio} autoFocus>
                Confirm
                </Button>   
                </DialogActions>
                </Stack>
            </Dialog>
            
            <Card style={cardstyle}>
                <CardContent>
                    <Box
                        sx={{
                            alignItems: 'center',
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        <Avatar
                          
                            sx={{
                                height: 64,
                                mb: 2,
                                width: 64
                            }}
                           
                        />
                        <Rating name="read-only" value={Instructor && Instructor.instructorDetails.Rating} readOnly />
                        <Typography
                            color="textPrimary"
                            gutterBottom
                            variant="h5"
                        >
                        
                        </Typography>
                        <Typography
                            color="textSecondary"
                            variant="h6"
                        >
                        {Instructor && Instructor.instructorDetails.Firstname} {Instructor && Instructor.instructorDetails.Lastname}
                       
                        </Typography>
                   
                    </Box>
                </CardContent>
                <Divider />
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        '& button': { m: 2 }

                    }}
                >

                    <Stack   direction="column" spacing={1}>
                        <Stack direction="row"  >
                            <TextField
                              
                               inputProps sx={{width: { sm: 200, md: 300 },
                               "& .MuiInputBase-root": {
                                   height: 45
                               }}}
                               
                                value =  {OldEmail}
                                id="outlined-password-input"
                                type= "text"
                                helperText = 'Type email'
                                style={textfield}

                            // autoComplete="current-password"
                            />
                            <Button
                                style={buttonstyle}
                                color="primary"
                                variant="contained"
                               onClick={handleOpenEmail}

                            >
                            Change Email
                            </Button>

                        </Stack>

                        <Stack direction="row">

                            <TextField
                                inputProps sx={{width: {  sm: 200, md: 300 },
                                "& .MuiInputBase-root": {
                                    height: 45
                                }}}
                                disabled
                                defaultValue="Hellasdfghjkl"
                                id="outlined-password-input"

                                type="password"

                            // autoComplete="current-password"
                            />

                            <Button

                                style={buttonstyle2}
                                color="primary"
                                variant="contained"
                                onClick={handleOpenPass}
                            >
                                Change Password
                            </Button>

                            </Stack>
                            <TextField
                            id="outlined-multiline-flexible"
                            multiline
                            maxRows={8}
                            value={Instructor && Instructor.instructorDetails.Biography } 
                            onChange={(e) => setBiography(e.target.value)}
                            fullWidth
                            />
                            <Button
                            style={buttonstyle2}
                            color="primary"
                            variant="contained"
                            onClick={handleOpenBio}
                            >
                            Change Password
                            </Button>
                            </Stack>                    
                        </Box>
                    </Card>
                    
                    
                </div>

          
            /*<div className="Profile">
                <a href="/changePassword" class="button">Change Password</a>
            </div>*/

    )
}

export default Profile
import { useAuthContext } from "../hooks/useAuthContext";
import { useState, useEffect } from 'react'
import { useNavigate } from 'react'
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
    TextField
} from '@mui/material';





const Profile = () => {
    const { user } = useAuthContext()
    const [Instructor, setInstructor] = useState(null)
    const [error, setError] = useState(null)

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
                
            }
            if (!response.ok) {
                setError(error)
            }
        }
        fetchIns()
    },[])
    const cardstyle = { width: 400, margin: '20px auto' }
    // const buttonstyle = { maxWidth: '150px', maxHeight: '30px', minWidth: '30px', minHeight: '30px', fontSize: '8px' }



    return (

        
        <div>
          
            
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
                        <Typography
                            color="textPrimary"
                            gutterBottom
                            variant="h5"
                        >
                        
                        </Typography>
                        <Typography
                            color="textSecondary"
                            variant="body2"
                        >
                        {Instructor && Instructor.instructorDetails.Firstname} {Instructor && Instructor.instructorDetails.Lastname}
                        </Typography>
                        <Typography
                            color="textSecondary"
                            variant="h6"
                        >
                           
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

                    <Stack direction="column" >
                        <Stack direction="row"  >
                            <TextField
    
                                value={Instructor && Instructor.user.Email}
                                id="outlined-password-input|"
                                type= "email"

                            // autoComplete="current-password"
                            />
                            <Button
                                // style={buttonstyle}
                                color="primary"
                                variant="contained"


                            >
                                Change Email
                            </Button>

                        </Stack>

                        <Stack direction="row">

                            <TextField
                                disabled
                                defualtvalue="Hellasdfghjklsasdfghjklsdfghjkl"
                                id="outlined-password-input"
                                label="Password"
                                type="password"

                            // autoComplete="current-password"
                            />

                            <Button
                                color="primary"
                                variant="contained"
                            >
                                Change Password
                            </Button>

                        </Stack>

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
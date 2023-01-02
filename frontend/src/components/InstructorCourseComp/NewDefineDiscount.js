import { Paper, Typography, Stack, TextField, Button,Alert } from "@mui/material";
import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useParams } from "react-router-dom";

const NewDefineDiscount = () => {
    const {user} = useAuthContext()
    const [Discount, setDiscount] = useState(0);
    const [EndDate, setEndDate] = useState(''+Date.now());
    const [success, setSuccess] = useState('');
    const [Error, setError] = useState(null);
    const {courseid} = useParams()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!user){
            setError('You must be logged in')
            return
        }
        const discountint = parseInt(Discount)
        const enddate = EndDate+'T00:00:00.000Z'
        const promo = {discountint,enddate}
        console.log(JSON.stringify(promo))
        const response =  await fetch('/api/instructor/definediscount/'+ courseid,{method:'POST',body:JSON.stringify(promo),
        headers: {
            'content-type':'application/json',
            'Authorization': `Bearer ${user.token}`

        },
        
        })
        const json = await response.json()
        if(!response.ok){
            setError(json.error)
            setSuccess('')
        }
        if(response.ok){
            console.log("success "+json)
            setDiscount('')
            setEndDate('')
            setSuccess('Promotion defined sucessfully ')
            setError(null)
        }
    }
    return (
        <Paper
            elevation={4} style={{padding:20 ,width:280, margin: '16px auto', maxHeight:'55vh', borderRadius:'16px'}}
            >
                <Stack spacing={2}>
        <Typography variant="h3">
            Define Discount
        </Typography>
            <TextField label="Discount Percentage" type="number" min="0" max="100" onChange={(e) => setDiscount(e.target.value)} value={Discount} />
            <TextField label="Discount Expiry Date" type="date" onChange={(e) => setEndDate(e.target.value)} value={EndDate}/>
            <Button variant="contained" onClick={handleSubmit}>Submit</Button>
            {success && <Alert severity="success">{success}</Alert>}
            {Error && <Alert severity="error">{Error}</Alert>}
        </Stack>
        </Paper>
    );
}
export default NewDefineDiscount
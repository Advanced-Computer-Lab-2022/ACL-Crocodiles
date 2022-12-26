import { Alert, Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Stack from "@mui/material/Stack";

const AdminPromoAll = () => {
    const todayDate = Date.now();
    const [Discount, setDiscount] = useState('');
    const [EndDate, setEndDate] = useState(''+todayDate);
    const [Status, setStatus] = useState('');
    const [success, setSuccess] = useState(false);
    const [Error, setError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const discount = parseInt(Discount);
        const enddate = EndDate + 'T00:00:00.000Z';
        const response = await fetch('/api/admin/setpromotionallcourses', {
            method: 'POST',
            body: JSON.stringify({discount, enddate}),
            headers: {
                'content-type': 'application/json',
            },
        })
        const json = await response.json()
        if (!response.ok) {
            setError(true)
            setSuccess(false)
            setStatus('Error happened')
        }
        if (response.ok) {
            console.log("success " + json)
            setDiscount('')
            setEndDate(todayDate)
            setStatus('Promotion defined sucessfully ')
            setError(false)
            setSuccess(true)
        }
    }

    return (
        <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h4">Define Promotion on all courses</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Stack spacing={2}>
            <TextField label="Discount Percentage" type="number" min="0" max="100" onChange={(e) => setDiscount(e.target.value)} value={Discount} />
            <TextField label="Discount Expiry Date" type="date" onChange={(e) => setEndDate(e.target.value)} value={EndDate}/>
            <Button variant="contained" onClick={handleSubmit}>Submit</Button>
            {Error && <Alert severity="error">{Status}</Alert>}
            {success && <Alert severity="success">{Status}</Alert>}
        </Stack>
        </AccordionDetails>
      </Accordion>
      
    </div>
        
    )
}

export default AdminPromoAll
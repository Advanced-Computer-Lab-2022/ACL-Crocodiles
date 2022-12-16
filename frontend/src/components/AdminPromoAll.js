import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { Button, TextField } from "@mui/material";

const AdminPromoAll = () => {
    const [Discount, setDiscount] = useState('');
    const [EndDate, setEndDate] = useState('');
    const [Status, setStatus] = useState('');
    const [Error, setError] = useState(null);

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
            setError(json.error)
            setStatus('Error happened')
        }
        if (response.ok) {
            console.log("success " + json)
            setDiscount('')
            setEndDate('')
            setStatus('Promotion defined sucessfully ')
            setError(null)
        }
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <Typography variant="h3">Define Promotion On All Courses</Typography>
            <TextField label="Discount Percentage" type="number" min="0" max="100" onChange={(e) => setDiscount(e.target.value)} value={Discount} />
            <br />
            <TextField label="Discount Expiry Date" type="date" onChange={(e) => setEndDate(e.target.value)} value={EndDate} />
            <Button variant="contained" onClick={handleSubmit}>Submit</Button>
        </Box>
    )
}

export default AdminPromoAll
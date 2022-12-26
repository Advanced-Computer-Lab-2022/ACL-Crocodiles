import { CardContent, Card, CardHeader, Typography, CardActions, Checkbox, Box } from "@mui/material"
import { useState } from "react"

const AdminPromoCourse = ({course, onSelect}) => {
    const [selected, setSelected] = useState(false)
    const newPrice = course.Price-(course.Price*course.Discount/100)
    
    const onSelectIn = () => {
        const dir = !selected
        setSelected(dir)
        console.log(course.Title + " " + dir)
        onSelect(course._id, dir)
    }
    return (
        <Card sx={{border: 2}}>
        <CardHeader title={course.Title} subheader="Author: "/>
        <CardContent >
            <Typography variant="body2" color="text.secondary">
                {course.Summary}
            </Typography>
        </CardContent>
        <CardActions>
            <Box sx={{display:'flex', justifyContent:'space-between', alignItems:'center', width:'100%'}}>
                
            {course.Discount > 0 ? <Typography variant="body2" >
                Price: <s>{course.Price}</s> {newPrice} </Typography>:
                <Typography variant="body2" >
                Price: {course.Price}
                </Typography>
                }
            <Checkbox checked={selected} onChange={() => onSelectIn()}/>
            </Box>
        </CardActions>
        </Card>
    )
}
export default AdminPromoCourse
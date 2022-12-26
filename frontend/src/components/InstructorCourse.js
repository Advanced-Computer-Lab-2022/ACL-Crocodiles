import { Box, Container, Stack } from "@mui/material";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useAuthContext} from "../hooks/useAuthContext";
import InstCourseDetails from "./InstructorCourseComp/InstCourseDetails";
import InstCourseVideo from "./InstructorCourseComp/InstCourseVideo";
import NewDefineDiscount from "./InstructorCourseComp/NewDefineDiscount";
import InstSubtitles from "./InstructorCourseComp/InstSubtitles";

const InstructorCourse = () => {
    const [course, setCourse] = useState(null);
    const [error, setError] = useState(null);
    const {user} = useAuthContext();
    const {courseid} = useParams();
    useEffect(() => {
        const getCourse = async () => {
            console.log('courseid', courseid);
            const response = await fetch('/api/Instructor/getcourse/' + courseid, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
                })
            const json = await response.json();
            if (!response.ok) {
                console.log(json.error);
                setError(json.error);
            }
            if (response.ok) {
                console.log('course', json);
                setCourse(json);
                setError(null);
            }
        }
            getCourse();
    },[user]);
        

    return (
        <Box sx={{
              margin: "-20px",
              maxWidth: "100%",
            }}>
        {course && <InstCourseDetails Course={course}/>}
        <Stack direction="row" spacing={2}>
        <Stack direction="column" spacing={2}>
        {course && <InstCourseVideo Video={course.PreviewVideo}/>}
        {course && <InstSubtitles Subtitles={course.Subtitle}/>}
        </Stack>
        {course && <NewDefineDiscount/>}
        </Stack>
        </Box>
    );
}
export default InstructorCourse;
import { Box, Stack, Typography, TextField, Button, Alert } from "@mui/material"
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material"
import { useState, useEffect } from "react"
import { useAuthContext } from "../../hooks/useAuthContext"
import AddIcon from '@mui/icons-material/Add';
import { useParams } from "react-router-dom";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { width } from "@mui/system";
import Exam from "../Exam"
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const InstSubtitles = ({ Subtitles }) => {
    const { user } = useAuthContext();
    const [subtitles, setSubtitles] = useState(null);
    const [subtitleTitle, setSubtitleTitle] = useState("");
    const [subtitleHours, setSubtitleHours] = useState(0);
    const [newAddFlag, setNewAddFlag] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const { courseid } = useParams()
    const [Open, setOpen] = useState(false);
    const [QuestionHeader, setQuestionHeader] = useState('')
    const [Answer1, setAnswer1] = useState('')
    const [Answer2, setAnswer2] = useState('')
    const [Answer3, setAnswer3] = useState('')
    const [Answer4, setAnswer4] = useState('')
    const [correctAnswer, setcorrectAnswer] = useState('')
    const [error1, setError1] = useState(null)



    const addQuestion = async (e) => {
        e.preventDefault()

        const question = { QuestionHeader, Answer1, Answer2, Answer3, Answer4, correctAnswer }
        console.log(JSON.stringify(question))
        const response = await fetch('/api/instructor/createquestion', {
            method: 'POST', body: JSON.stringify(question), headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${user.token}`

            }
        })
        const json = await response.json()
        if (!response.ok) {
            setError1(json.error)
        }
        if (response.ok) {
            setQuestionHeader('')
            setAnswer1('')
            setAnswer1('')
            setAnswer2('')
            setAnswer3('')
            setAnswer4('')
            setcorrectAnswer('')
            setError1(null)
            console.log('new question added', json)
        }

    }

    useEffect(() => {
        const fetchSubtitles = async () => {
            const response = await fetch('/api/Instructor/getmysubtitles/' + courseid, {
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
                console.log('newwsss subtitles', json);
                setSubtitles(json);
                setError(null);
            }
        }
        fetchSubtitles();
    }, [newAddFlag])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/Instructor/createsubtitle/' + courseid, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({
                subtitle: subtitleTitle,
                subHours: parseInt(subtitleHours),
            })
        })
        const json = await response.json();
        if (!response.ok) {
            console.log(json.error);
            setError(json.error);
            setSuccess(null);
        }
        if (response.ok) {
            console.log('subtitle', json);
            //setSubtitles(subtitles.push(json._id));
            setNewAddFlag(!newAddFlag);
            setSuccess("Subtitle Added Successfully");
            setError(null);
        }
    }

    const dialogClose = () => {
        setOpen(false);
    }

    //async function handleExam(value) {
    const handleExam = async (value) => {

        const response = await fetch('/api/instructor/createexam', {
            method: 'POST', headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${user.token}`

            }, body: JSON.stringify({ subtitleId: value })

        })

        setOpen(true);
    }

    return (
        <>
            <Box
                sx={{
                    margin: "30px",
                    padding: "10px",
                }}
            >
                <Typography variant="h3" >Subtitles: </Typography>
                <Stack direction="column" spacing={1} sx={{ width: "75%", padding: "15px" }}>
                    {subtitles && subtitles.map(subtitle => (
                        <Accordion
                            sx={{ borderRadius: "20px" }}>
                            <AccordionSummary
                                expandIcon={<ExpandMore />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography variant="h5" >{subtitle.Title}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography variant="h5" >{subtitle.Hours}</Typography>
                                <Button onClick={handleExam(subtitle._id)} sx={{ width: 'fit-content' }}>+ Add Exam</Button>
                                {/* {Open && <Exam dialogClose={dialogClose} />} */}
                            </AccordionDetails>


                        </Accordion>
                    ))}
                    {/* <Accordion
            >
            <AccordionSummary
            expandIcon={<AddIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            >
                <Typography variant="h3">Add a Subtitle</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Stack direction="column" spacing={1} >
                <Typography variant="h5">Title: </Typography>
                <TextField
                value={subtitleTitle}
                onChange={(e) => setSubtitleTitle(e.target.value)}
                label="Subtitle Title"
                type="text"
                />
                <Typography variant="h5">Hours: </Typography>
                <TextField
                value={subtitleHours}
                onChange={(e) => setSubtitleHours(e.target.value)}
                label="Subtitle Hours"
                type="number"
                />
                <Button variant="contained" color="primary" onClick={handleSubmit}>Add</Button>
                {error && <Alert severity="error">{error}</Alert>}
                {success && <Alert severity="success">{success}</Alert>}
            </Stack>
            </AccordionDetails>
        </Accordion> */}
                </Stack>
            </Box>

            <Dialog
                fullWidth
                // fullScreen={fullScreen}
                open={Open}
                aria-labelledby="responsive-dialog-title">
                <Stack spacing={3}>
                    <DialogTitle marginBottom='-5px'>
                        Add Exam Questions
                    </DialogTitle>
                    <DialogContent margin='5px '>
                        <Stack spacing={1} >

                            <TextField
                                id="standard-password-input"
                                label="Question Header"
                                type="text"
                                variant="standard"
                                required
                                onChange={(e) => setQuestionHeader(e.target.value)}
                                value={QuestionHeader}
                            />
                            <TextField
                                id="standard-password-input"
                                label="Answer 1"
                                type="text"
                                variant="standard"
                                required
                                onChange={(e) => setAnswer1(e.target.value)}
                                value={Answer1}
                                fullWidth
                            />
                            <TextField
                                id="standard-password-input"
                                label="Answer 2"
                                type="text"
                                variant="standard"
                                required
                                onChange={(e) => setAnswer2(e.target.value)}
                                value={Answer2}
                                fullWidth
                            />
                            <TextField
                                id="standard-password-input"
                                label="Answer 3"
                                type="text"
                                variant="standard"
                                required
                                onChange={(e) => setAnswer3(e.target.value)}
                                value={Answer3}
                                fullWidth
                            />

                            <TextField
                                id="standard-password-input"
                                label="Answer 4"
                                type="text"
                                variant="standard"
                                required
                                onChange={(e) => setAnswer4(e.target.value)}
                                value={Answer4}
                                fullWidth
                            />
                            <TextField
                                id="standard-password-input"
                                label="Correct Answer"
                                type="text"
                                variant="standard"
                                required
                                onChange={(e) => setcorrectAnswer(e.target.value)}
                                value={correctAnswer}
                                fullWidth
                            />

                            {error1 && <Alert severity="error">{error1}</Alert>}
                        </Stack>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={addQuestion}>Next Question</Button>
                        <Button onClick={dialogClose}>
                            Confirm
                        </Button>
                    </DialogActions>
                </Stack>
            </Dialog>
        </>
    )
}
export default InstSubtitles
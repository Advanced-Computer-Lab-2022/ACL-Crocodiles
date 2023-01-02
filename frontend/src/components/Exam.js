import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuthContext";
import { Button, TextField, Dialog, DialogActions, DialogContent, Stack, Alert, DialogTitle } from '@mui/material';



const Exam = ({ dialogClose }) => {

    const [QuestionHeader, setQuestionHeader] = useState('')
    const [Answer1, setAnswer1] = useState('')
    const [Answer2, setAnswer2] = useState('')
    const [Answer3, setAnswer3] = useState('')
    const [Answer4, setAnswer4] = useState('')
    const [correctAnswer, setcorrectAnswer] = useState('')
    const [error, setError] = useState(null)
    const { user } = useAuthContext()


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
            setError(json.error)
        }
        if (response.ok) {
            setQuestionHeader('')
            setAnswer1('')
            setAnswer1('')
            setAnswer2('')
            setAnswer3('')
            setAnswer4('')
            setcorrectAnswer('')
            setError(null)
            console.log('new question added', json)
        }

    }

    // let navigate = useNavigate()
    // async function handleSubmit() {
    //     navigate('/instructor')
    // }

    return (

        <Dialog
            fullWidth
            // fullScreen={fullScreen}
            //open={Open}
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

                        {error && <Alert severity="error">{error}</Alert>}
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={addQuestion}>Next Question</Button>
                    <Button onClick={dialogClose} autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Stack>
        </Dialog>




    )
}

export default Exam




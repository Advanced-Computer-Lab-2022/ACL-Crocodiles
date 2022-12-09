import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuthContext";

const Exam = () => {

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

    let navigate = useNavigate()
    async function handleSubmit() {
        navigate('/instructor')
    }

    return (
        <form className="createexam" >
            <h3>Create a new Exam</h3>
            <label>Question</label>
            <input
                type="text"
                onChange={(e) => setQuestionHeader(e.target.value)}
                value={QuestionHeader}
            />
            <label>First Answer:</label>
            <input
                type="text"
                onChange={(e) => setAnswer1(e.target.value)}
                value={Answer1}
            />
            <label>Second Answer:</label>
            <input
                type="text"
                onChange={(e) => setAnswer2(e.target.value)}
                value={Answer2}
            />
            <label>Third Answer:</label>
            <input
                type="text"
                onChange={(e) => setAnswer3(e.target.value)}
                value={Answer3}
            />
            <label>Fourth Answer:</label>
            <input
                type="text"
                onChange={(e) => setAnswer4(e.target.value)}
                value={Answer4}
            />
            <label>Correct Answer:</label>
            <input
                type="text"
                onChange={(e) => setcorrectAnswer(e.target.value)}
                value={correctAnswer}
            />

            <button onClick={addQuestion}>Add Question</button>
            {error && <div className="error">{error}</div>}

            <button onClick={handleSubmit}>Create Exam</button>
            {error && <div className="error">{error}</div>}



        </form>

    )
}

export default Exam




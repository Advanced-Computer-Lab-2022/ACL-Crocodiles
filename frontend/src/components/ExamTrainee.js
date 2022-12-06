import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useParams } from "react-router-dom"

const ExamTrainee = () => {
    const [Exam, setExam] = useState(null)
    const [Questions, setQuestions] = useState([])
    const [error, setError] = useState(null)
    const { user } = useAuthContext()
    const { examid } = useParams()


    useEffect(() => {


        const fetchExam = async () => {
            //const response = await fetch('/api/trainee/page/viewExams/' + course._id, {
            const response = await fetch('/api/trainee/page/viewExam/' + examid, {
                method: 'GET', headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${user.token}`

                }
            })


            const json = await response.json()
            if (!response.ok) {
                setError(json.error)
            }
            if (response.ok) {
                setExam(json)
                setQuestions(json.Questions)
                setError(null)
            }



        }
        fetchExam()

        console.log(Questions)

    }, [user])
    //console.log(Questions.Questions[0].QuestionHeader)


    // function onlyOne(checkbox) {
    //     var checkboxes = document.getElementsByName('check')
    //     checkboxes.forEach((item) => {
    //         if (item !== checkbox) item.checked = false
    //     })
    // }

    function onlyOne(b) {

        var x = document.getElementsByName('check');
        var i;

        for (i = 0; i < x.length; i++) {
            if (x[i].value != b) x[i].checked = false;
        }
    }


    return (
        <div>
            {Questions && Questions.map((Question) =>
                <div>
                    <form>
                        <h1>{Question.QuestionHeader}</h1>
                        <input name="check" id="answer1" type="checkbox" value={Question.Answer1} onClick={onlyOne(Question.Answer1)}></input>
                        <label for="answer1">{Question.Answer1}</label>
                        <input name="check" id="answer2" type="checkbox" value={Question.Answer2} onClick={onlyOne(Question.Answer2)}></input>
                        <label for="answer2">{Question.Answer2}</label>
                        <input name="check" id="answer3" type="checkbox" value={Question.Answer3} onClick={onlyOne(Question.Answer3)}></input>
                        <label for="answer3">{Question.Answer3}</label>
                        <input name="check" id="answer4" type="checkbox" value={Question.Answer4} onClick={onlyOne(Question.Answer4)}></input>
                        <label for="answer4">{Question.Answer4}</label>
                    </form>
                </div>)}
        </div>
    )
}

export default ExamTrainee
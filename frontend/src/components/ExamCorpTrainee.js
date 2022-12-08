import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useParams } from "react-router-dom"
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';

const ExamCorpTrainee = () => {
    const [Exam, setExam] = useState(null)
    const [Questions, setQuestions] = useState([])
    const [error, setError] = useState(null)
    const { user } = useAuthContext()
    const { examid } = useParams()
    const [value, setValue] = useState('');
    const [answers, setAnswers] = useState(['','','','']);
    const [notSelected,setNotSelected] = useState([]);
    const [errorSubmit,setErrorSubmit] = useState([]);
  
    const handleChange = (event) =>{
        const arr = event.target.value.split(",");
        const questionIndex = arr[0];
        const answerIndex = arr[1];
        const modifiedAnswers = answers;
        modifiedAnswers[questionIndex]=answerIndex;
        setAnswers([...modifiedAnswers])
        const t = notSelected;
        t[questionIndex] = false;
        setNotSelected([...t])
    }

    const handleClick = () =>{
          let canSubmit=true;
        for(let i=0; i<notSelected.length;i++){
            if(notSelected[i]==true){
      
            canSubmit=false;
         
            }
        }
        setErrorSubmit([...notSelected])
        if(canSubmit==true){
            const addAssignment = async () => {
                const response = await fetch('/api/corptrainee/page/addAssignment/', {
                    method: 'PATCH', headers: {
                        'content-type': 'application/json',
                
    
                    },
                    body:  JSON.stringify({
                        Examid: examid,
                        Answers: answers})
                       
                    
                })
                const json = await response.json()
                if(!response.ok)
                     setError(json.error)    
      
        }
        addAssignment();
    }
    }
    useEffect(() => {
      
      
        const fetchExam = async () => {
            
            const response = await fetch('/api/corptrainee/page/viewExam/' + examid, {
                method: 'GET', headers: {
                    'content-type': 'application/json',
            

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
                const temp0 = [];
                const temp1 = [];
                for(let i=0;i<json.Questions.length;i++){
                    temp0.push(true);
                    temp1.push(false);
                }
                setNotSelected(temp0)
                setErrorSubmit(temp1)
           
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



    return (
        <div>
            {Questions && Questions.map((Question,i) =>
                <div>              
                        <FormControl    error={errorSubmit[i]}>
      <FormLabel id="demo-radio-buttons-group-label">{Question.QuestionHeader}</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
 
        name="radio-buttons-group"
        onChange={handleChange}
      >
       
        <FormControlLabel value={i+',1'} control={<Radio />} label={Question.Answer1} />
        <FormControlLabel value={i+',2'} control={<Radio />} label={Question.Answer2} />
        <FormControlLabel value={i+',3'} control={<Radio />} label={Question.Answer3} />
        <FormControlLabel value={i+',4'} control={<Radio />} label={Question.Answer4} />
      </RadioGroup>
    </FormControl>
        
                </div>)}
                {error&& <div className="error">{error}</div>}
                <Button sx={{ mt: 1, mr: 1 }} type="submit" variant="outlined" size="large"  onClick={handleClick}>
          Submit
        </Button>

        </div>
    )
}

export default ExamCorpTrainee
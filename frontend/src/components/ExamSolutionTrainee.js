import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useParams } from "react-router-dom"
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';

const ExamTrainee = () => {
    console.log('up')
    const [Exam, setExam] = useState(null)
    const [Questions, setQuestions] = useState([])
    const [Answer, setAnswer] = useState([])
    const [error, setError] = useState(null)
    const { user } = useAuthContext()
    const { examid } = useParams()
    const [value, setValue] = useState('');
    const [answers, setAnswers] = useState(['','','','']);
    const [notSelected,setNotSelected] = useState([]);
    const [errorSubmit,setErrorSubmit] = useState([]);
    const [control,setControl]= useState([{color:"default",colorsx:"", checked:false},{color:"default",colorsx:"", checked:false},{color:"default",colorsx:"", checked:false},{color:"default",colorsx:"", checked:false},{color:"default",colorsx:"", checked:false},{color:"default",colorsx:"", checked:false},{color:"default",colorsx:"", checked:false},{color:"default",colorsx:"", checked:false},{color:"default",colorsx:"", checked:false},{color:"default",colorsx:"", checked:false},{color:"default",colorsx:"", checked:false},{color:"default",colorsx:"", checked:false},{color:"default",colorsx:"", checked:false},{color:"default",colorsx:"", checked:false},{color:"default",colorsx:"", checked:false},{color:"default",colorsx:"", checked:false}])
    const t = [];
    let Q=null;
    useEffect( () => {
        console.log('effect')
      
        const fetchExam = async () => {

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
                Q=[...json.Questions]
                setQuestions([...json.Questions])
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
        const fetchAnswer= async () => {
            const response = await fetch('/api/trainee/page/getAssignment/' , {
                method: 'POST', headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${user.token}`

                },
                body:  JSON.stringify({
                    Examid: examid})
            })


            const json = await response.json()
            if (!response.ok) {
                setError(json.error)
            }
            if (response.ok) {
                setAnswer(json.Answer)
                console.log(json.Answer)
                setError(null)

                const a = json.Answer;
                const t = [];
                console.log(Questions)
                console.log(Q)
                for(let i=0; i<a.length;i++){
                    if(Questions[i].correctAnswer==a[i]){
                        for(let j=1; j<=4; j++){
                            if((j+"")==a[i]){
                                t.push({color:"success",  colorsx:"",checked:true})
                            }
                            else
                                t.push({color:"default",colorsx:"", checked:false})

                        }
                    }
                    else{
                        for(let j=1; j<=4; j++){
                            if((j+"")==Questions[i].correctAnswer){
                                t.push({color:"success",colorsx:"", checked:true})
                            }
                            else{
                                if((j+"")==a[i]){
                                    t.push({color:"default", colorsx:"red", checked:true})
                                }
                                else
                                t.push({color:"default",colorsx:"",checked:false});
                            }
                                

                        }
                    }
                }
                console.log(t)
                setControl([...t]);


            }



        }
        fetchExam()
        fetchAnswer();
        setValue('2')
        
    
  
    }, )



    return (
        <div>
            {Questions && Questions.map((Question,i) =>
                <div>              
                        <FormControl    error={errorSubmit[i]}>
      <FormLabel id="demo-radio-buttons-group-label">{Question.QuestionHeader}</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
 
        name="radio-buttons-group"
      >

        <FormControlLabel value={i+',1'} control={<Radio color={control[(i*4)].color}    sx={{color: control[(i*4)].colorsx,'&.Mui-checked': {color:control[(i*4)].colorsx, }, }} />} label={Question.Answer1}  checked={control[(i*4)].checked} />
        <FormControlLabel value={i+',2'} control={<Radio  color={control[(i*4)+1].color}   sx={{color: control[(i*4)+1].colorsx,'&.Mui-checked': {color: control[(i*4)+1].colorsx, }, }} />} label={Question.Answer2}  checked={control[(i*4)+1].checked} />
        <FormControlLabel value={i+',3'} control={<Radio color={control[(i*4)+2].color}       sx={{color: control[(i*4)+2].colorsx,'&.Mui-checked': {color: control[(i*4)+2].colorsx, }, }} />} label={Question.Answer3}  checked={control[(i*4)+2].checked} />
        <FormControlLabel value={i+',4'} control={<Radio color={control[(i*4)+3].color}   sx={{color: control[(i*4)+3].colorsx,'&.Mui-checked': {color: control[(i*4)+3].colorsx, }, }} />} label={Question.Answer4}  checked={control[(i*4)+3].checked} />
        
      </RadioGroup>
    </FormControl>
        
                </div>)}
          
     {error&& <div className="error">{error}</div>}
        </div>
    )
}

export default ExamTrainee
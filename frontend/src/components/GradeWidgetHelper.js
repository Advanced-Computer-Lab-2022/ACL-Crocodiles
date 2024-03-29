import React from 'react'
import { useEffect, useState } from 'react'
import { useAuthContext } from "../hooks/useAuthContext"

import GradeWidget from '../components/GradeWidget'

const GradeWidgetHelper = ({ExamId, type}) => {
    const { user } = useAuthContext()
    const [grade,setGrade] = useState(0)
    const [percentage,setPercentage] = useState(null)
    
  useEffect(() => {
    if(user.Type=="Trainee"){
    const fetchGrade = async () => {

         await fetch('/api/trainee/page/calculateGrade/' , {
            method: 'POST', headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${user.token}`

            },
            body:JSON.stringify({
                Examid: ExamId
            })
        }).then((res) => {
            return res.json()
        }).then(data => {
            setGrade(data.Grade);
            setPercentage(data.Percentage);
      
        })

    }
    fetchGrade();
  }
  else{
    const fetchGrade = async () => {

      await fetch('/api/corpTrainee/page/calculateGrade/' , {
         method: 'POST', headers: {
             'content-type': 'application/json',
             'Authorization': `Bearer ${user.token}`

         },
         body:JSON.stringify({
             Examid: ExamId
         })
     }).then((res) => {
         return res.json()
     }).then(data => {
         setGrade(data.Grade);
         setPercentage(data.Percentage);
   
     })

 }
 fetchGrade();
  }
  },[user] )


  return (
<div><GradeWidget per={percentage} />

</div>
  )
}

export default GradeWidgetHelper
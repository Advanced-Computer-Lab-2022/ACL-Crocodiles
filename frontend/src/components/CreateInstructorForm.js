import React, { useState } from "react";
import Popup from 'reactjs-popup';

const CreateInstructorForm = () => {
    const[Username,setUsername] = useState('')
    const[Password,setPassword] = useState('')
    const[error,setError] = useState(null)
 
   // const[InstructorID,setId] = useState('')

    const handleSubmit = async (e) =>{
        e.preventDefault()
        const instructor = {Username,Password}
        console.log(JSON.stringify(instructor))
        const response =  await fetch('/api/admin/createinstructor',{method:'POST',body:JSON.stringify(instructor),headers: {
            'content-type':'application/json'
            
        }
      })
      const json = await response.json()
    if(!response.ok){
        setError(json.error)    
    }
    if (response.ok){
        setUsername('')
        setPassword('')
    
       // setId('')
        setError(null)
       
        console.log('Created new instructor', json)
    }
    }
    

    return(
        <form  className="createinstructor" onSubmit={handleSubmit}>
            <h3>Create new Instructor</h3>
            <label>Username:</label>
            <input
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                value={Username}
            />
            <label>Password:</label>
            <input
                type="text"
                onChange={(e) => setPassword(e.target.value)}
                value={Password}
            />
            <button>Create new instructor</button>
            {error && <div className="error">{error}</div>}
        </form>

    )
}

export default CreateInstructorForm 
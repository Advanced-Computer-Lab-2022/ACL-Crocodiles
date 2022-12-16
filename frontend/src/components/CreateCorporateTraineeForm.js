import React, { useState } from "react";


const CreateCorporateTraineeForm = () => {
    const[Username,setUsername] = useState('')
    const[Email,setEmail] = useState('')
    const[Password,setPassword] = useState('')
    const[error,setError] = useState(null)
   // const[InstructorID,setId] = useState('')

    const handleSubmit = async (e) =>{
        e.preventDefault()
        const trainee = {Username,Email,Password}
        console.log(JSON.stringify(trainee))
        const response =  await fetch('/api/admin/createcorporatetrainee',{method:'POST',body:JSON.stringify(trainee),headers: {
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
        setEmail('')
       // setId('')
        setError(null)
        console.log('Created new CorporateTrainee', json)
    }
    }
    

    return(
        <form  className="createCorporateTrainee" onSubmit={handleSubmit}>
            <h3>Create new Corporate Trainee</h3>
            <label>Username:</label>
            <input
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                value={Username}
            />
             <label>Email:</label>
            <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={Email}
            />
            <label>Password:</label>
            <input
                type="text"
                onChange={(e) => setPassword(e.target.value)}
                value={Password}
            />
            <button>Create new Corporate Trainee</button>
            {error && <div className="error">{error}</div>}
        </form>

    )
}

export default CreateCorporateTraineeForm 
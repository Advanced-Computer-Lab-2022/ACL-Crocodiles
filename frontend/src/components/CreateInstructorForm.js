import React, { useState } from "react";


const CreateInstructorForm = () => {
    const[Username,setUsername] = useState('')
    const[Password,setPassword] = useState('')
    const[error,setError] = useState(null)
    const[Email,setEmail] = useState('')
   // const[InstructorID,setId] = useState('')

    const handleSubmit = async (e) =>{
        e.preventDefault()
        const instructor = {Username,Email,Password}
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
        setEmail('')
    
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
             <label>Email:</label>
            <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={Email}
            />
            <label>Password:</label>
            <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={Password}
            />
            <button>Create new instructor</button>
            {error && <div className="error">{error}</div>}
        </form>

    )
}

export default CreateInstructorForm 
import React, { useState } from "react";


const CreateAdminForm = () => {
    const[Username,setUsername] = useState('')
    const[Email,setEmail] = useState('')
    const[Password,setPassword] = useState('')
    const[error,setError] = useState(null)
   // const[InstructorID,setId] = useState('')

    const handleSubmit = async (e) =>{
        e.preventDefault()
        const admin = {Username,Email,Password}
        console.log(JSON.stringify(admin))
        const response =  await fetch('/api/admin/createadmin',{method:'POST',body:JSON.stringify(admin),headers: {
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
        console.log('Created new admin', json)
    }
    }
    

    return(
        <form  className="createadmin" onSubmit={handleSubmit}>
            <h3>Create new Admin</h3>
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
            <button>Create new admin</button>
            {error && <div className="error">{error}</div>}
        </form>

    )
}

export default CreateAdminForm 
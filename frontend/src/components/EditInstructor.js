import React, { useState } from "react";


const EditInstructor = () => {
    const[Email,setEmail] = useState('')
    const[Biography,setBiography] = useState('')
    const[error,setError] = useState(null)
   // const[InstructorID,setId] = useState('')

    const handleSubmit = async (e) =>{
        e.preventDefault()
        const updated = {Email,Biography}
        console.log(JSON.stringify(updated))
        const response =  await fetch('/api/instructor/editbiographyoremail',{method:'PUT',body:JSON.stringify(updated),headers: {
            'content-type':'application/json'
            
        }
      })
      const json = await response.json()
    if(!response.ok){
        setError(json.error)    
    }
    if (response.ok){
        setEmail('')
        setBiography('')
    
       // setId('')
        setError(null)
    }
    }
    

    return(
        <form  className="editinfo" onSubmit={handleSubmit}>
            <h3>Edit info</h3>
            <label>Edit Email</label>
            <input
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                value={Email}
            />
            <label>Edit Biography</label>
            <input
                type="text"
                onChange={(e) => setBiography(e.target.value)}
                value={Biography}
            />
            <button>edit</button>
            {error && <div className="error">{error}</div>}
        </form>

    )
}

export default EditInstructor


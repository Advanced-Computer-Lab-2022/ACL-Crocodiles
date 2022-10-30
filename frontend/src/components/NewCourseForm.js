import React, { useState } from "react";


const NewCourseForm = () => {
    const[Title,setTitle] = useState('')
    const[Subject,setSubject] = useState('')
    const[Hours,setHours] = useState('')
    const[Price,setPrice] = useState('')
   // const [id, setID] = useState('')
    const[error,setError] = useState(null)
   // const[InstructorID,setId] = useState('')

    const handleSubmit = async (e) =>{
        e.preventDefault()

        const course = {Title,Subject,Hours,Price}
        console.log(JSON.stringify(course))
        const response =  await fetch('/api/instructor/createcourse',{method:'POST',body:JSON.stringify(course),headers: {
            'content-type':'application/json'
            
        }
      })
      const json = await response.json()
    if(!response.ok){
        setError(json.error)    
    }
    if (response.ok){
        setTitle('')
        setSubject('')
        setHours('')
        setPrice('')
        //setID('')
       // setId('')
        setError(null)
        console.log('new course added', json)
    }
    }
    

    return(
        <form  className="createcourse" onSubmit={handleSubmit}>
            <h3>Add a new Course</h3>
            <label>Course title:</label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={Title}
            />
            <label>Course Subject:</label>
            <input
                type="text"
                onChange={(e) => setSubject(e.target.value)}
                value={Subject}
            />
            <label>Course Hours:</label>
            <input
                type="number"
                onChange={(e) => setHours(e.target.value)}
                value={Hours}
            />
            <label>Course Price:</label>
            <input
                type="number"
                onChange={(e) => setPrice(e.target.value)}
                value={Price}
            />
            {/* <label>Instructor ID:</label>
            <input
                type="text"
                onChange={(e) => setID(e.target.value)}
                value={id}
            /> */}
            <button>Create Course</button>
            {error && <div className="error">{error}</div>}
        </form>

    )
}

export default NewCourseForm 
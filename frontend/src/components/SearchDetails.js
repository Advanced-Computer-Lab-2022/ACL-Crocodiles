import {useState} from 'react'
import Subtitle from './Subtitle'


const SearchDetails = ({ course, currency}) => {
    const [hidden,setHidden] = useState(true)
    const [Subs,setSubs] = useState('')

    async function handle(e){
        setHidden(s => !s)
        console.log(course.Subtitle)
        if(course.Subtitle && course.Subtitle.length!=0 ){
        let a = {
            IDs: course.Subtitle
        }
        const SubIDs = JSON.stringify(a)
    
        const response =  await fetch('/api/trainee/subtitles',{method:'POST',body:SubIDs,headers: {
            'content-type':'application/json'
            
         }})

         const json = await response.json()
         if (response.ok){
            setSubs(json)
        }
    }
}
    return(
        <div className="search-details">
            <h4>{course.Title}</h4>
            <p><strong>Subject:</strong>{course.Subject}</p>    
            <p><strong>Hours:</strong>{course.Hours}</p>
           
            {!hidden? <div id="Details" >
            {course.Price!=0?<p><strong>Price:</strong>{course.Price} {currency}</p>: null }
            {course.Price==0? <><p class="same"><strong>Price: </strong></p><p style={{ color: 'green' }} class="same">FREE</p></>: null }
            <p><strong>Discount:</strong>{course.Discount}</p>
             {Subs && Subs.map((subtitle) =>(
             subtitle? <Subtitle subtitle={subtitle}/>:null
    ))}
            </div>:null}
            <button onClick={handle}>View more</button>
           
        </div>
    )
}

export default SearchDetails
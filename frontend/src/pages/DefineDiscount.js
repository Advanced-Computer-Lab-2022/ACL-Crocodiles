import { useAuthContext } from "../hooks/useAuthContext"
import {useEffect,useState} from 'react'
import { useParams } from "react-router-dom"

const DefineDiscount = () => {
    const {user} = useAuthContext()
    const [discount,setDiscount] = useState(null)
    const [endDate,setEndDate]=useState(null)
    const [error,setError]=useState(null)
    const {courseid} = useParams()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!user){
            setError('You must be logged in')
            return
        }
        const discountint = parseInt(discount)
        const enddate = endDate+'T00:00:00.000'
        const promo = {discountint,enddate}
        console.log(JSON.stringify(promo))
        const response =  await fetch('/api/instructor/definediscount/'+ courseid,{method:'POST',body:JSON.stringify(promo),
        headers: {
            'content-type':'application/json',
            'Authorization': `Bearer ${user.token}`

        },
        
        })
        const json = await response.json()
        if(!response.ok){
            setError(json.error)
        }
        else{
            console.log("success "+json)
        }
    }


return(
    <div className="defdisc">
        <h1>Define Promotion</h1>
        <label>Discount Percentage</label>
        <input 
        type="number" 
        min="0" 
        max="100" 
        onChange={(e) => setDiscount(e.target.value)}
        value={discount}
        />
        <label>Discount Expiry Date</label>
        <input 
        type="date" 
        onChange={(e) => setEndDate(e.target.value)}
        value={endDate}
        />
        <button onClick={handleSubmit}>Submit</button>
    </div>
)
}

export default DefineDiscount
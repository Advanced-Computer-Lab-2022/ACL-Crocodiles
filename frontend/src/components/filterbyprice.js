import React, { useState } from "react";
import PriceDetails from '../components/PriceDetails'


const FilterCourses = () => {

    const [priceMin, setMin] = useState(0)
    const [priceMax, setMax] = useState(0)
    const [courses, setCourses] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const body = { priceMin, priceMax }
        const response = await fetch('/api/instructor/filterbyprice', {
            method: 'POST', body: JSON.stringify(body), headers: {
                'content-type': 'application/json'
            }
        })
        const json = await response.json()
        if (!response.ok) {
            setError(json.error)
        }
        if (response.ok) {
            setCourses(json)
            setMin(0)
            setMax(0)
            setError(null)
        }




    }


    return (<form className="searchcourse" onSubmit={handleSubmit}>
        <h3>Filter Courses</h3>
        <h5>Minimum Price</h5>
        <input
            type="number"
            onChange={(e) => setMin(e.target.value)}
            value={priceMin}
        />
         <h5>Maximum Price</h5>
        <input
            type="number"
            onChange={(e) => setMax(e.target.value)}
            value={priceMax}
        />

        <button>Filter</button>
        {error && <div className="error">{error}</div>}
        {courses && courses.map((course) => (
            <PriceDetails key={course._id} course={course} />
        ))}
    </form>)

 


}

export default FilterCourses


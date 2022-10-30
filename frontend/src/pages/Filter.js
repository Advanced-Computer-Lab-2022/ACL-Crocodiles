import FilterByPrice from '../components/filterbyprice'
import FilterBySR from '../components/FilterBySR'
const Course = () => {

    return (
        <div className="filter">
            <div className="filterprice">
                <FilterByPrice />
                <FilterBySR />
            </div>
        </div>
    )
}

export default Course
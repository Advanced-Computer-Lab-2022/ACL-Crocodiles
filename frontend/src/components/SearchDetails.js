const SearchDetails = ({ course }) => {
    return(
        <div className="search-details">
            <h4>{course.Title}</h4>
            <p><strong>Subject:</strong>{course.Subject}</p>    
            <p><strong>Hours:</strong>{course.Hours}</p>
        </div>
    )
}

export default SearchDetails
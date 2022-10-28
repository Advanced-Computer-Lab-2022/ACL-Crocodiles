const PriceDetails = ({ course }) => {
    return (
        <div className="search-details">
            <h4>{course.Title}</h4>
            <p><strong>Subject:</strong>{course.Subject}</p>
            <p><strong>Hours:</strong>{course.Hours}</p>
            <p><strong>Price:</strong>{course.Price}</p>
            <p><strong>Rating:</strong>{course.rating}</p>
        </div>
    )
}

export default PriceDetails
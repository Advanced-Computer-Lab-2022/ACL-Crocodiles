const SearchDetails = ({ course }) => {
    return(
        
        <div className="search-details">
            <h4>{course.Title}</h4>
            <p><strong>Subject:</strong>{course.Subject}</p>    
            <p><strong>Hours:</strong>{course.Hours}</p>
            <span className="viewmore">
            <p><strong>Price:</strong>{course.Price}</p> 
            <p><strong>Discount:</strong>{course.Discount}</p> 
            <p><strong>Subtitles:</strong>{course.Subtitle}</p>
            </span>
            <button className="more" onClick="viewMore()" >More Details</button>
        </div>
    )
    function viewMore(){
        console.log("karim")
        var moreText = document.getElementById("viewmore");
        var btnText = document.getElementById("more");
      
        if (btnText.innerHTML = "More Details") {
          btnText.innerHTML = "Less Details ";
          moreText.style.display = "none";
        } else {
          btnText.innerHTML = "less Details";
          moreText.style.display = "inline"
          }
        }
}

export default SearchDetails
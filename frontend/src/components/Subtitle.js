

const Subtitle = ({ subtitle }) => {
    return(
        <div className="subtitle-details">
            <h4>{subtitle.Title}</h4>
            
            <p><strong>Title:</strong> {subtitle.Title}</p>
            <p><strong>Hours:</strong> {subtitle.Hours}</p>
            <p><strong>Exercise:</strong> {subtitle.Exercise}</p>
        </div>
    )
}

export default Subtitle
import {Link} from 'react-router-dom'

const Navbar = () => {

    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>Coursera</h1>
                </Link>
                <Link to="/admin">
                    <h2>Admin controlls</h2>
                </Link>
                <Link to="/Instructor">
                    <h2>Instructor controlls</h2>
                </Link>
                <Link to="/trainee">
                    <h2>Trainee</h2>
                </Link>
                <Link to="/corpTrainee">
                    <h2>Corporate Trainee</h2>
                </Link>
                <Link to="/guest">
                    <h2>Guest</h2>
                </Link>
                

            </div>
        </header>
    )
}
export default Navbar
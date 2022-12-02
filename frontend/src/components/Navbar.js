import {Link} from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
const Navbar = () => {
    const { logout } = useLogout()
    const { user }= useAuthContext()
    const handleClick = () => {
       logout()
    }

    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>Msh Coursera</h1>
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
                <Link to="/CorpTrainee">
                    <h2>Corporate Trainee</h2>
                </Link>
                <Link to="/guest">
                    <h2>Guest</h2>
                </Link>
                <Link to="/profile">
                    <h2>Profile</h2>
                </Link>
                <nav>
                   {user && (
                   <div>
                    <span>{user.Email}</span>
                    <button onClick={handleClick}>logout</button>
                    </div>)}
                    {!user && (<div>     
                    <Link to="/signin">Signin</Link>
                    <Link to="/signup">Signup</Link>
                    </div>)}
                    
                </nav>
                

            </div>
        </header>
    )
}
export default Navbar
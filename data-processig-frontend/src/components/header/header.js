import logo from "../../assets/logo.png";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

const Header = () => {
    const { user } = useAuthContext()

    const { logout } = useLogout()
    
    const handleClick = () => {
        logout()
    }

    return(
        <header>
            <div className="header-links">
                <a href="/profile">My Profile</a>
                <a href="userOverview">Users overview</a>
            </div>
            <a href="/"><img className="header-logo" src={logo} /></a>
            <div className="header-buttons">
                {/* {!user && <a href="/login" className="login-button">Log in</a>} */}
                {user && <button className="logout-button" onClick={handleClick}>Log out</button>}
            </div>
        </header>
    );
}

export default Header;
import { useAuthContext } from "../hooks/useAuthContext";

const Footer = () => {
    const { user } = useAuthContext();

    return(
        <footer>
            {user && <p>Logged in as: { user.role }</p>}
            {!user && <p>Logged in as: not logged in</p>}
        </footer>
    );
};

export default Footer;
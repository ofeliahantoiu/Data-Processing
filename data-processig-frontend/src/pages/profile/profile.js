import { useEffect, useState } from "react";
import Footer from "../../components/footer/footer";
import { useAuthContext } from "../../components/hooks/useAuthContext";

const Profile = () => {
    const [email, setEmail] = useState('');
    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');
    const [role, setRole] = useState('');

    const [error, setError] = useState(null);

    const { user } = useAuthContext();

    useEffect(() => {
        const fetchProfile = async () => {
            const response = await fetch(`http://localhost:3000/admin/profile/${user.id}`, {
                method: 'GET',
                headers: {'Authorization': `Bearer ${user.token}`},
            })
            const json = await response.json()

            if (!response.ok) {
                setError(json.error);
            }

            if (response.ok) {
                setEmail(json.profile.email);
                setFName(json.profile.first_name);
                setLName(json.profile.last_name);
                setRole(json.profile.user_type);
            }
        }

        if (user) {
            fetchProfile()
        }
    }, [user])

    return(
        <div className="profile-container">
            <h1>MY PROFILE</h1>
            <div className="profile-details">
                <div className="profile-subtitles">
                    <p>Username</p>
                    <p>First Name</p>
                    <p>Last Name</p>
                    <p>Role</p>
                </div>
                <div className="profile-data">
                    <p>{ email }</p>
                    <p>{ fName }</p>
                    <p>{ lName }</p>
                    <p>{ role }</p>
                    {error && <p>{error}</p>}
                </div>
            </div>
        </div>
    );
};

export default Profile;
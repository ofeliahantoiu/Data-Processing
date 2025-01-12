import logo from "../../assets/bigLogo.png";
import { useState } from "react";
import { useLogin } from "../../components/hooks/useLogin";

const Login = ()  => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, error, isLoading } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await login(email, password);
    }

    return (
        <div className="login-container">
            <img id="logo" src={logo} height="133" width="440.04"/>
            <form onSubmit={handleSubmit}>
                <div className="form-line">
                    <label for="username">Email</label>
                    <input
                    type="text"
                    className="login-input"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    />
                </div>
                <div className="form-line">
                    <label for="password">Password</label>
                    <input
                    type="password"
                    className="login-input"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    />
                </div>
                <button type="submit" id="login-button">Login</button>
                {error && <div className="login-error">{ error }</div>}
            </form>
        </div>
    );
}

export default Login;
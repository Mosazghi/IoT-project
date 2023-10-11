import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
    return (
        <div>
            <h1>LOGIN PAGE</h1>
            <LoginForm />
            <Link to="/user/register" className="underline">Ny bruker?</Link>
        </div>
    );
};

export default LoginPage;

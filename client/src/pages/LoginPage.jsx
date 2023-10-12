import { Link } from "react-router-dom";
import Form from "../components/Form";

const LoginPage = () => {
    return (
        <div>
            <h1>LOGIN PAGE</h1>
            <Form path="login" />
            <Link to="/register" className="underline">
                Ny bruker?
            </Link>
        </div>
    );
};

export default LoginPage;

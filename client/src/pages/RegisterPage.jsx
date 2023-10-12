import { Link } from "react-router-dom";
import Form from "../components/Form";

const RegisterPage = () => {
    return (
        <div>
            <h1>REGISTER PAGE</h1>
            <Form path="register"/>
            <Link to="/" className="underline">
                Allerede bruker?
            </Link>
        </div>
    );
};

export default RegisterPage;

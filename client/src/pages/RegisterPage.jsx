import { Link } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";

const RegisterPage = () => {
    return (
        <div>
            <h1>REGISTER PAGE</h1>
            <RegisterForm />
            <Link to="/user/login" className="underline">
                Allerede bruker?
            </Link>
        </div>
    );
};

export default RegisterPage;

import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import cookies from "../utils/cookies";

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [admin, setAdmin] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const configuration = {
            method: "post",
            url: "/user/register",
            data: {
                username,
                password,
            },
        };

        axios(configuration)
            .then((res) => {
                cookies.set("TOKEN", res.data.token, {
                    path: "/",
                });
                console.log(res.data);
                navigate("/user/dashboard");
            })
            .catch(() => {
                console.log("error");
                throw new Error();
            });
    };

    console.log({ username, password });
    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <div className="navn-wrapper">
                <label htmlFor="navn">Navn:</label>
                <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border-2"
                    type="text"
                    id="navn"
                    name="username"
                />
            </div>
            <div className="pass-wrapper">
                <label htmlFor="pass">Passord:</label>
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border-2"
                    type="password"
                    id="pass"
                    name="password"
                />
            </div>
            <button
                onClick={(e) => handleSubmit(e)}
                className="bg-red-500 shadow-md border border-b-gray-700"
                type="submit"
            >
                Submit form
            </button>
        </form>
    );
};

export default LoginForm;

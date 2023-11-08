import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import cookies from "../utils/cookies";
import RegisterCheckmark from "./RegisterCheckmark";

const Form = ({ path }) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [admin, setAdmin] = useState(false);
    const [error, setError] = useState("");

    const checkMark = path === "register" ? true : false;
    const navigatePath = path === "register" ? "/" : "/dashboard";

    // Håndterer submit av formen
    const handleSubmit = (e) => {
        e.preventDefault();

        const configuration = {
            method: "post",
            url: `/user/${path}`,
            data: {
                username,
                password,
                admin,
            },
        };
        axios(configuration)
            .then((res) => {
                cookies.set("TOKEN", res.data.token, {
                    path: "/",
                });

                // I tilfelle en error så vises den på siden
                setError(res.data.message);
                // Navigerer til dashboard (eller login)
                navigate(navigatePath);
            })
            .catch((e) => {
                setError(e.response.data.message);
                return new Error();
            });
    };

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <div className="m-auto">
                <div>
                    <div className="flex justify-center">
                        <p className="font-bold text-5xl"> {checkMark ? "SIGN UP" : "LOGIN"}</p>
                    </div>
                    <div>
                        <p className="text-black mt-10">Username</p>
                    </div>
                    <input
                        className="border-2 w-80 h-10 rounded-2xl shadow-inner pl-2 mt-2"
                        value={username}
                        name="username"
                        type="text"
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    ></input>

                    <div>
                        <p className="text-black mt-3">Password</p>
                    </div>

                    <input
                        className="border-2 w-80 h-10 rounded-2xl shadow-inner  pl-2 mt-2"
                        value={password}
                        name="password"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    ></input>
                </div>
                {checkMark && <RegisterCheckmark isAdmin={admin} setAdmin={setAdmin} />}
                <div className="mt-2 flex items-center gap-3 justify-center">
                    <button className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white w-20 h-10 rounded-3xl  shadow-lg shadow-orange-300/50">
                        {checkMark ? "REGISTER" : "LOGIN"}
                    </button>
                    <Link to={path === "login" ? "/register" : "/"} className="underline">
                        {path === "login" ? "New user?" : "Already an user?"}
                    </Link>
                </div>

                {error && <p className="text-red-500 text-center mt-2">{error}</p>}
            </div>
        </form>
    );
};

export default Form;

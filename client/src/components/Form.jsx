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

    // Håndterer submit av formen{/* */}
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

                // I tilfelle en error så vises den på siden{/* */}
                setError(res.data.message);
                // Navigerer til dashboard (eller login){/* */}
                navigate(navigatePath);
            })
            .catch((e) => {
                setError(e.response.data.message);
                return new Error();
            });
    };

    // Returnerer en form som enten viser login eller register{/* */}
    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <div className="flex">
                <div className="m-auto">
                    <div className=" bg-white w-96 h-80 rounded-3xl shadow-md relative ">
                        <div className="flex row-auto">
                            <div className="grid row-2 justify-center">
                                <div className="flex justify-center">
                                    <div className="absolute -top-12">
                                        <h1 className="font-bold text-7xl text-shadow-sm text-cyan-500">
                                            {checkMark ? "SIGN UP" : "LOGIN"}
                                        </h1>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-black mt-10">Username</p>
                                </div>
                                <input
                                    className="border-2 w-72 h-10 rounded-2xl shadow-inner pl-2 mt-2" //input feltet for brukernavn{/* */}
                                    value={username}
                                    name="username"
                                    type="text"
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                ></input>
                            </div>
                            <div className="grid row-2 justify-center">
                                <div>
                                    <p className="text-black mt-3">Password</p>
                                </div>
                                <input
                                    className="border-2 w-72 h-10 rounded-2xl shadow-inner  pl-2 mt-2" //input feltet for passord{/* */}
                                    value={password}
                                    name="password"
                                    type="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                ></input>
                            </div>
                        </div>
                        <div className="mt-2 flex items-center gap-3 justify-center">
                            {/*knappene for å logge inn og registrere seg*/}
                            {checkMark && <RegisterCheckmark isAdmin={admin} setAdmin={setAdmin} />}{" "}
                            {/*registrer admin eller ansatt*/}
                            <button className="< bg-cyan-500 shadow-lg shadow-cyan-500/50 hover:bg-cyan-400 text-white w-20 h-10 rounded-2xl ">
                                {checkMark ? "REGISTER" : "LOGIN"}
                            </button>
                            <Link to={path === "login" ? "/register" : "/"} className="underline">
                                {path === "login" ? "New user?" : "Already a user?"}
                            </Link>
                        </div>
                        {error && <p className="text-red-500 text-center mt-2">{error}</p>} {/*viser feilmelding*/}
                    </div>
                </div>
            </div>
        </form>
    );
};

export default Form;

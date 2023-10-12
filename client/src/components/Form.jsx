import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import cookies from "../utils/cookies";
import RegisterCheckmark from "./RegisterCheckmark";

const Form = ({ path }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const checkMark = path === "register" ? true : false;

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const configuration = {
            method: "post",
            url: `/user/${path}`,
            data: {
                username,
                password,
                isAdmin,
            },
        };

        axios(configuration)
            .then((res) => {
                cookies.set("TOKEN", res.data.token, {
                    path: "/",
                });
                console.log(res.data);
                navigate("/dashboard");
            })
            .catch(() => {
                console.log("error");
                return new Error();
            });
    };

    console.log({ username, password }, isAdmin, path);

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <div className="flex h-screen">
                <div className="m-auto">
                    <div>
                        <div className="flex justify-center">
                            <p className="font-bold text-5xl"> {checkMark ? "REGISTER" : "LOGIN"}</p>
                        </div>
                        <div>
                            <p className="text-black mt-10">Username</p>
                        </div>
                        <input
                            className="border-2 w-96 h-10 rounded-2xl shadow-inner pl-2 mt-2"
                            value={username}
                            name="username"
                            onChange={(e) => setUsername(e.target.value)}
                        ></input>

                        <div>
                            <p className="text-black mt-3">Password</p>
                        </div>

                        <input
                            className="border-2 w-96 h-10 rounded-2xl shadow-inner  pl-2 mt-2"
                            value={password}
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                        ></input>
                    </div>
                    {checkMark && <RegisterCheckmark isAdmin={isAdmin} setAdmin={setIsAdmin} />}
                    <div className="mt-2 flex justify-center">
                        <button className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white w-20 h-10 rounded-3xl  shadow-xl">
                            {checkMark ? "REGISTER" : "LOGIN"}
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default Form;

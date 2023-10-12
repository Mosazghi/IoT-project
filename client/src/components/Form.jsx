import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import cookies from "../utils/cookies";
import AdminCheckMark from "./AdminCheckmark";

const Form = (path) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [admin, setAdmin] = useState(false);
    const url = path == "login" ? "login" : "signup";
    
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();

        const configuration = {
            method: "post",
            url: `/user/${url}`,
            data: {
                username,
                password,
                admin
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
                return new Error();
            });
    };

    console.log({ username, password, admin });
    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            {/*
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
            */}
            <div className="flex h-screen">
                <div className="m-auto">
                    <div>
                        <div className="flex justify-center">
                            <p className="font-bold text-5xl">SIGN UP</p>
                        </div>
                        <div>
                            <p className="text-black mt-10">Username</p>
                        </div>
                        <input className="border-2 w-96 h-10 rounded-2xl shadow-inner pl-2 mt-2"
                        value={username} 
                        name="username" 
                        onChange={(e) => setUsername(e.target.value)}>
                        </input>

                        <div>
                            <p className="text-black mt-3">Password</p>
                        </div>

                        <input className="border-2 w-96 h-10 rounded-2xl shadow-inner  pl-2 mt-2"
                        value={password} 
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}>
                        </input>
                    </div>
                    
                    AdminCheckMark();
                    {path === "register" && <AdminCheckMark/>
                    }
                    
                    <div className="mt-2 flex justify-center">
                        <button
                            className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white w-20 h-10 rounded-3xl shadow-xl"
                        >SIGN UP
                        </button>
                    </div>
                    

                </div>
            </div>
        </form>
    );
};

export default Form;

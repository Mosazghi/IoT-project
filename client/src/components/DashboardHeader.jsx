import { useState } from "react";
import { FaDatabase, FaDiagramNext, FaDiagramSuccessor, FaPowerOff, FaQrcode, FaUserLarge } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import cookies from "../utils/cookies";

{/* Kode for header, øverste boksen på dashboard page*/}

const DashboardHeader = ({ user, toggleSwitch, showData }) => {
    const [showUser, setShowUser] = useState(false);
    const navigate = useNavigate();

    {/*Funksjon for å logge ut brukeren */}

    const handleLogout = () => {
        cookies.remove("TOKEN", { path: "/" });
        navigate("/");
    };

    const handleShowUser = () => { 
        toggleSwitch();
    };

    return (
        <div className="w-full pt-2">
            {/* Header boks */}
            <header className="bg-white transition-all flex flex-row drop-shadow-md  p-3 justify-between items-start items-center mb-5 rounded-3xl  ">
                <h1 className="ms-5 text-xl md:text-5xl xl:text-7xl font-bold ">DASHBOARD</h1>{/*Overskrift*/}
                <div className="flex justify-items-end gap-2">
                    {/* Iconer top jøyre */}
                    <div>

                    { user.admin && (
                            <button 
                            onClick={handleShowUser} 
                            className="w-12 h-12 bg-slate-200 shadow-inner hover:bg-cyan-500 rounded-full grid justify-items-center content-center"
                            > {/* Change the icon based on the state */}
                            {showData? <FaQrcode className="text-2xl text-white"/> : <FaDatabase className="text-2xl text-white"/>}
                            </button>
                    )}
                    </div>
                    <div className="flex justify-center flex-col">
                        <button
                            onClick={() => setShowUser(!showUser)}
                            onTouchMove={() => setShowUser(!showUser)} 
                            className="w-12 h-12 bg-slate-200 shadow-inner hover:bg-cyan-500 rounded-full grid justify-items-center content-center"
                        >
                            <FaUserLarge className="text-2xl text-white" />
                        </button>
                        {showUser ? <h4 className="text-center">{user.name}</h4> : null}
                    </div>
                    <div>
                         {/*knappen som logger ut blir send til login */}
                        <button
                            onClick={handleLogout}
                            className="w-12 h-12 bg-slate-200 shadow-inner hover:bg-cyan-500 rounded-full grid justify-items-center content-center"
                        >
                            <FaPowerOff className="text-2xl text-white" />
                        </button>
                    </div>
                </div>
            </header>
        </div>
    );
};

export default DashboardHeader;

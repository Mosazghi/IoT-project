import React, { useState } from "react";
import { FaUserLarge } from "react-icons/fa6";

export default function IconContent() {
    const [show, setShow] = useState(false);
    return (
        <div>
            <button
                onClick={() => setShow(!show)}
                className="w-12 h-12 bg-slate-200 hover:bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-full grid justify-items-center content-center"
                > 
                <FaUserLarge className="text-2xl text-white" />
            </button>
            {show ? <h1>Hallo</h1> : null}
        </div>
    );
}


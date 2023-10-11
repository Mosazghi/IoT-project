import { useEffect, useState } from "react";

function Home() {
    const [data, setData] = useState();
    const urlWithProxy = "/api";

    useEffect(() => {
        let ignore = false;

        async function getCourses() {
            const res = await fetch("/api");
            const data = await res.json();
            if (!ignore) {
                setData(data.message);
            }
        }
        getCourses();
        return () => {
            ignore = true;
        };
    }, []);

    console.log("datao", data);
    return (
        <>
            <h1 className="text-red-800 text-7xl">Mottatt data : {data}</h1>
        </>
    );
}

export default Home;

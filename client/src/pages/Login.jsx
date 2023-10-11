import { useEffect, useState } from "react";

const Login = () => {
    const [data, setData] = useState();

    useEffect(() => {
        let ignore = false;

        async function getCourses() {
            const res = await fetch("/test");
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
    return <h1>DATA {data}</h1>;
};

export default Login;

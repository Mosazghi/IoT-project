import { Fragment } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
    return (
        <Router>
            <Layout>
                <Fragment>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route
                            path="/user/*"
                            element={
                                <Routes>
                                    <Route path="login" element={<LoginPage />} />
                                    <Route path="register" element={<RegisterPage />} />
                                </Routes>
                            }
                        />
                    </Routes>
                </Fragment>
            </Layout>
        </Router>
    );
}

export default App;

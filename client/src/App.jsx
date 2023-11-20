import { Fragment } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import NoPage from "./pages/NoPage";
import RegisterPage from "./pages/RegisterPage";
import TestPage from "./pages/TestPage";
import ProtectedRoute from "./utils/ProtectedRoute";

// Her blir alle sidene importert og satt opp med 'react-router-dom'
function App() {
    console.log("App");
    return (
        <Router>
            <Layout>
                <Fragment>
                    <Routes>
                        <Route path="/" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/dashboard" element={<ProtectedRoute />}>
                            <Route path="/dashboard" element={<DashboardPage />} />
                        </Route>
                        <Route path="/TestPage" element={<TestPage />} />
                        <Route path="*" element={<NoPage />} />
                    </Routes>
                </Fragment>
            </Layout>
        </Router>
    );
}

export default App;

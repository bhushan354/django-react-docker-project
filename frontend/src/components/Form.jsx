import { useState } from 'react';
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Form({ route, method }) {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await api.post(route, { username, password });
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/");
            } else {
                navigate("/login");
            }
        } catch (error) {
            alert("Authentication failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="d-flex justify-content-center align-items-center vh-100 text-white"
            style={{
                background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
            }}
        >
            <form
                onSubmit={handleSubmit}
                className="bg-dark p-5 rounded shadow"
                style={{ minWidth: "320px", maxWidth: "400px", width: "100%" }}
            >
                <h2 className="text-center mb-4 text-capitalize">{method}</h2>

                <div className="mb-3">
                    <label htmlFor="username" className="form-label text-light">Username</label>
                    <input
                        id="username"
                        type="text"
                        className="form-control bg-dark text-light border-secondary"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="form-label text-light">Password</label>
                    <input
                        id="password"
                        type="password"
                        className="form-control bg-dark text-light border-secondary"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-light w-100"
                    disabled={loading}
                >
                    {loading ? "Processing..." : method}
                </button>

                <p className="mt-3 text-center">
                    {method === "login" ? (
                        <>Not a user? <a href="/register">Register here</a></>
                    ) : (
                        <>Already a user? <a href="/login">Login here</a></>
                    )}
                </p>

            </form>
        </div>
    );
}

export default Form;

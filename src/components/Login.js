import "./Login.scss";
import { useState, useEffect } from 'react';
import { loginApi } from "../services/UserServices";
import { toast } from 'react-toastify';
import { set } from "lodash";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isShowPassword, setIsShowPassword] = useState(false);

    const [loadingAPi, setLoadingAPi] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            toast.error("Email/Password is required!");
            return;
        }
        setLoadingAPi(true);
        let res = await loginApi(email, password)
        console.log(">>> check res: ", res);
        if (res && res.token) {
            localStorage.setItem("token", res.token);
            navigate("/");
        } else {
            if (res && res.status === 400) {
                toast.error(res.data.error);
            }
        }
        setLoadingAPi(false);
    }

    useEffect(() => {
        let token = localStorage.getItem("token");
        if (token) {
            navigate("/");
        }
    }, [])

    return (
        <>
            <div className="login-container col-12 col-sm-4">
                <div className="title">Login</div>
                <div className="text">Email or Username (eve.holt@reqres.in) </div>
                <input
                    type="text"
                    placeholder="Email or Username..."
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
                <div className="input-2">
                    <input
                        type={isShowPassword === true ? "text" : "password"}
                        placeholder="Password..."
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    <i className={isShowPassword === true ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}

                        onClick={() => setIsShowPassword(!isShowPassword)}
                    />
                </div>

                <button className={email && password ? "active" : ""}
                    // disabled={true}
                    onClick={() => handleLogin()}
                >
                    {loadingAPi && <i className="fa-solid fa-sync fa-spin"></i>}
                    &nbsp;Login
                </button>
                <div className="back">
                    <i className="fa-solid fa-angles-left"></i>Go back
                </div>
            </div>
        </>
    )
}
export default Login;
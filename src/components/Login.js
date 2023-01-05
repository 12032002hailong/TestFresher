import "./Login.scss";
import { useState } from 'react';
import { loginApi } from "../services/UserServices";
import { toast } from 'react-toastify';

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isShowPassword, setIsShowPassword] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            toast.error("Email/Password is required!");
            return;
        }

        let res = await loginApi(email, password)
        if (res && res.token) {
            localStorage.setItem("token", res.token);
        }

        console.log(">>>check res :", res);
    }

    return (
        <>
            <div className="login-container col-12 col-sm-4">
                <div className="title">Login</div>
                <div className="text">Email or Username</div>
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
                >Login</button>
                <div className="back">
                    <i className="fa-solid fa-angles-left"></i>Go back
                </div>
            </div>
        </>
    )
}
export default Login;
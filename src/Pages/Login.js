import React,{useState} from "react";
import styled from "styled-components";
import Nav from "../components/Nav";
import { Link, useHistory } from "react-router-dom";
import { useGlobalContext } from "../Context/Context";
import axios from "axios";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState([]);

    const { isAuth,setAuthenticated, logout } = useGlobalContext();
    const history = useHistory();

    const handleLogin = async(e) => {
        e.preventDefault();
        console.log(email, password);
        try {
            setLoading(true);
            const result = await axios.post("api/auth/login",{email,password});
            setLoading(false);
            setAuthenticated(result.data.user,result.data.token);
            localStorage.setItem("user",JSON.stringify(result.data));
            history.push("/");
        } catch (error) {
            if(error.response?.status===401){
            setError(error.response.data.errors);
            }
            setLoading(false);
        }
    }


    return (
        <>
            <Nav />
            {isAuth ? (
                <button onClick={() => logout()}>Logout</button>
            ) : (
                <Wrapper>
                    <form action="/login" onSubmit={handleLogin}>
                        <h3>Login</h3>
                        <div className="form__control">
                            <label htmlFor="email ">Email</label>
                            <br />
                            <input 
                            type="email" 
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="form__control">
                            <label htmlFor="password">Password</label>
                            <br />
                            <input 
                            type="text" 
                            name="password" 
                            onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="form__control">
                        {error[0] && <p className="form__error">{error[0].msg}</p>}
                            <input
                                type="submit"
                                value={loading ? "Loading..." : "Login"}
                                className="submit"
                            />
                        </div>
                        <p>
                            Don't have an account?
                            <Link to="/signup">signup</Link>
                        </p>
                    </form>
                </Wrapper>
            )}
        </>
    );
}

const Wrapper = styled.section`
    width: 100%;
    height: 91vh;
    padding:2rem 1rem;
    text-align: center;
    background: var(--grey-color);

    form {
        background: white;
        padding: 1.75rem;
        margin: auto;
        display: block;
        max-width: 500px;
        box-shadow: 0px 0px 18px 0px rgba(0, 0, 0, 0.1);
    }

    .form__control {
        text-align: left;
        width: 100%;
        margin-bottom: 1rem;
    }

    .form__control label {
        color: rgba(0, 0, 0, 0.7);
    }

    .form__control input {
        padding: 0.5rem;
        width: 100%;
        margin-top: 0.5rem;
        outline: none;
        border: 1px solid rgba(0, 0, 0, 0.2);
    }

    .submit {
        background: var(--primary-color);
        color: #fff;
        border: none;
        font-size: 15px;
        cursor: pointer;
    }

    form h3 {
        color: rgba(0, 0, 0, 0.6);
    }

    p {
        color: rgba(0, 0, 0, 0.6);
    }

    a {
        text-decoration: none;
        color: blue;
        opacity: 0.8;
    }
`;

export default Login;

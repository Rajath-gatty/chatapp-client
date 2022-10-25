import {useState} from "react";
import styled from "styled-components";
import Nav from "../components/Nav";
import { Link } from "react-router-dom";
import axios from "axios";
import {useHistory} from "react-router-dom";

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username,setUsername] = useState("");
    const [name,setName] = useState("");
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState([]);

    const history = useHistory();

    const handleSubmit = async(e) => {
        e.preventDefault();
            try {
                const body = {
                    name,
                    email,
                    username,
                    password,
                }
                setLoading(true);
                const res = await axios.post("http://localhost:8080/api/auth/signup",body);
                setLoading(false);
                if(res.status===200){
                    history.replace("/login");
                }
            } catch (error) {
                if(error.response.status===422) {
                   setError(error.response.data.errors);
                }
                console.log(error);
                setLoading(false);
            }
    }

    return (
        <>
            <Nav/>
            <Wrapper>
                <form action="/signup" onSubmit={handleSubmit}>
                    <h3>Sign up</h3>
                    <div className="form__control">
                        <label htmlFor="name">Name</label> <br />
                        <input 
                        type="text" 
                        name="name" 
                        onChange={(e) => setName(e.target.value)}
                        />
                        <p className="form__error">{error.find((err) => err.param === "name")?.msg}</p>
                    </div>
                    <div className="form__control">
                        <label htmlFor="name">Username</label> <br />
                        <input 
                        type="text" 
                        name="username" 
                        onChange={(e) => setUsername(e.target.value)}
                        />
                       <p className="form__error">{error.find((err) => err.param === "username")?.msg}</p>
                    </div>
                    <div className="form__control">
                        <label htmlFor="email ">Email</label>
                        <br />
                        <input 
                        type="email" 
                        name="email" 
                        onChange={(e) => setEmail(e.target.value)}
                        />
                        <p className="form__error">{error.find((err) => err.param === "email")?.msg}</p>
                    </div>
                    <div className="form__control">
                        <label htmlFor="password">Password</label>
                        <br />
                        <input 
                        type="text" 
                        name="password" 
                        onChange={(e) => setPassword(e.target.value)}
                        />
                        <p className="form__error">{error.find((err) => err.param === "password")?.msg}</p>
                    </div>
                    <div className="form__control">
                        <button type="submit" className="submit">{loading?'Loading...':'Signup'}</button>
                    </div>
                    <p>
                        Have an account? <Link to="/login">login</Link>
                    </p>
                </form>
            </Wrapper>
        </>
    );
}

const Wrapper = styled.section`
    width: 100%;
    height: 91vh;
    margin: auto;
    text-align: center;
    background: var(--grey-color);
    padding: 2rem 1rem;

    form {
        background: white;
        padding: 1.75rem;
        display: block;
        max-width:500px;
        margin:auto;
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
        padding: 0.5rem;
        width: 100%;
        margin-top: 0.5rem;
        outline: none;
        border: 1px solid rgba(0, 0, 0, 0.2);
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

export default Signup;

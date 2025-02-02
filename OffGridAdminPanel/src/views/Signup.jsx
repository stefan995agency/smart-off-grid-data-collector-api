import {Link} from "react-router-dom"
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";
import {useRef, useState} from "react";


export default function Signup(){

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();

    const {setUser, setToken} = useStateContext();
    const [errors, setErrors] = useState(null);

    const onSubmit = (ev) => {
        ev.preventDefault()
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value
        } 
        axiosClient.post('/register', payload)
        .then(({data})=> {
            setUser(data.user)
            setToken(data.token)

        })
        .catch(error => {
            const response = error.response;
            if(response && response.status === 422){
                console.log(response.data.error);
                setErrors(response.data.errors)
            }
        })
    }

    return(
        <div className="login-signup-form animated fadeInDown">
        <div className="form">
            <form onSubmit={onSubmit}>
                <h1 className="title">
                    Create Your account
                </h1>
                {errors && <div className="alert">
                    {Object.keys(errors).map(key => (
                        <p key={key}>{errors[key][0]}</p>
                    ))}
                    </div>}
                <input ref={nameRef} placeholder="Full name" />
                <input ref={emailRef} type="email" placeholder="Email address" />
                <input ref={passwordRef} type="password" placeholder="Password" />
                <input ref={passwordConfirmationRef} type="password" placeholder="Password Confirmation" />
                <button className="btn btn-block">Sign up</button>
                <p className="message">
                    Already Registered? <Link to="/login">Sign in</Link>
                </p>
            </form>
        </div>
        </div>
    )
}
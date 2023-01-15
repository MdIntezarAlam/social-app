import React, { useState } from 'react'
import '../../styles/login.css'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../redux/action/User'


const Login = () => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
 




    const loginformHandler = (e) => {
        e.preventDefault()
        console.log("email, password", email, password)

        //ab dispatch kar dena hai action main email and pass
        dispatch(loginUser(email, password))
    }


    return (
        <div className='login'>
            <form className='login-form' onSubmit={loginformHandler}>
                <h1>Login</h1>
                <input type="email" required autoComplete='off' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" required autoComplete='off' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <Link to="/forgot/password">
                    <p className='forget'>Forgot Password?</p>
                </Link>
                <button type='submit' className='login-btn'>Login</button>
                <Link to="/register ">
                    <p className='newUser'>New User?</p>
                </Link>
            </form>
        </div>
    )
}

export default Login
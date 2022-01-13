import React from 'react'
import { useState,useEffect } from 'react'
import './login.scss'
import {useDispatch} from 'react-redux'
import { login } from '../../redux/actions/authAction'
import { useAlert } from 'react-alert'
import { useSelector } from 'react-redux'
import { useNavigate} from 'react-router-dom'

const Login = () => {
    const navigate= useNavigate();
    const alert = useAlert()
    const dispatch = useDispatch()
    const initialState = {email:'',password:''}
    const [userData, setUserData] =useState(initialState)
    const {email,password}=userData;
    const {notify,auth} = useSelector(state => state)

    useEffect(() => {
        if(auth.user || auth.userProfile){
            if(notify.success){
                alert.success('success')
            }
            else{
                alert.success('Already logged in.')
            }
            navigate('/')
        }
        if(notify.error){
            if(notify.error != 'jwt malformed')
            alert.error(notify.error)
        }
    }, [notify,auth])
    
    const handleChange=(e)=>{
        const{name,value}=e.target
        setUserData({...userData,[name]:value})
    }

    const handleSubmit=(e)=>{
            e.preventDefault();
            dispatch(login(userData))
    }

    return (
        <div className="login">
            <div className="container">
                <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div className="card border-0 shadow rounded-3 my-5">
                            <div className="card-body p-4 p-sm-5">
                                <div className="img d-flex justify-content-center align-items-center">
                                <img src="assets/images/logo.svg" alt="" />
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-floating mb-3">
                                        <input type="email" className="form-control" id="floatingInput" onChange={handleChange} value={email} name='email' placeholder="name@example.com"/>
                                            <label htmlFor="floatingInput">Email address</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input type="password" className="form-control" id="floatingPassword" onChange={handleChange} value={password} name='password' placeholder="Password"/>
                                            <label htmlFor="floatingPassword">Password</label>
                                    </div>

                                    <div className="form-check mb-3">
                                        <input className="form-check-input" type="checkbox" value="" id="rememberPasswordCheck"/>
                                            <label className="form-check-label" htmlFor="rememberPasswordCheck">
                                                Remember password
                                            </label>
                                    </div>
                                    <div className="d-grid">
                                        <button className="btn btn-primary btn-login text-uppercase fw-bold" type="submit">Sign
                                            in</button>
                                    </div>
                                    <hr className="my-4"/>
                                        <div className="d-grid ">
                                            <button className="btn btn-google btn-login text-uppercase fw-bold" onClick={()=>navigate('/register')}>
                                                <i className="fab fa-google me-2"></i> Register
                                            </button>
                                        </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login

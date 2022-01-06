import React, { useEffect,useState } from 'react'
import { useAlert } from 'react-alert'
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate} from 'react-router-dom'
import { register } from '../../redux/actions/authAction'

const Register = () => {
    const {auth,notify} =useSelector(state=>state)
    const dispatch = useDispatch();
    const alert=useAlert();
    const navigate=useNavigate()
    const initialState = {email:'',password:''}
    const [userData, setUserData] =useState(initialState)
    const {name,email,password}=userData;

    useEffect(()=>{
        if(auth.success) navigate('/')
        if(notify.success){
            navigate('/')
        }
        if(notify.error){
            if(notify.error != 'jwt malformed')
            alert.error(notify.error)
        }
    },[auth.success,notify.success,notify.error])

    const handleChange=(e)=>{
        const{name,value}=e.target
        setUserData({...userData,[name]:value})
    }

    const handleSubmit=(e)=>{
            e.preventDefault();
            dispatch(register(userData))
            
    }
    return (
        <div>
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
                                        <input type="name" className="form-control" id="floatingInput" onChange={handleChange} value={name} name='name' placeholder="Name"/>
                                            <label htmlFor="floatingInput">Name</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input type="email" className="form-control" id="floatingInput" onChange={handleChange} value={email} name='email' placeholder="name@example.com"/>
                                            <label htmlFor="floatingInput">Email Address</label>
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
                                            <button className="btn btn-google btn-login text-uppercase fw-bold" type="submit">
                                                <i className="fab fa-google me-2"></i> Sign in with UniKa
                                            </button>
                                        </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default Register

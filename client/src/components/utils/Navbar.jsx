import React, { useEffect,useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../redux/actions/authAction'
import { Link } from 'react-router-dom'
import './navbar.scss'
const Navbar = () => {
    const { auth } = useSelector(state => state)
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);
    const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
    const dispatch = useDispatch()
    const handleClick = () => {
        dispatch(logout())
    }

    return (
        <div className='nav'>
            <nav class="navbar navbar-expand-lg navbar-light ">
                <div className="container">
                    <Link to={'/'}><img src="assets/images/logosm.svg" height={'60px'} width={'70px'} alt="" /></Link>
                    
                    <button className="navbar-toggler  mr-2" type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbar" aria-expanded={!isNavCollapsed ? true : false} onClick={handleNavCollapse}>
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse  justify-content-end`} id="navbar" >
                        <ul className="navbar-nav  mt-2 mt-lg-0 align-items-center">
                            <li className="nav-item ">
                                <a className="nav-link" href="#">Events </a>
                            </li>
                            {auth.user || auth.userProfile ? (
                                <>
                                <li className="nav-item dropdown d-none d-lg-block">
                                    <a className="nav-item nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <img  src="assets/images/avatar.png" height={'30px'} alt="anon" />
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-end " aria-labelledby="navbarDropdown">
                                        <li><Link className='dropdown-item' to="/profile">Profile</Link></li>
                                        <li><button className="dropdown-item" onClick={handleClick}>Logout</button></li>
                                    </ul>
                                </li>
                                <li className='d-block d-lg-none'><Link className='nav-link nav-item' to="/profile">Profile</Link></li>
                                <li className="nav-item d-block d-lg-none"><button className="btn " onClick={handleClick}>Logout</button></li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item ">
                                        <Link className='nav-link' to="/login">Login</Link>
                                    </li>
                                    <li className="nav-item ">
                                        <Link className='nav-link' to="/register">Register</Link>
                                    </li>
                                </>
                            )

                            }

                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar

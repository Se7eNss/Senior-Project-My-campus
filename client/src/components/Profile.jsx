import React from 'react'
import './profile.scss'
import Event from './profile/Event'
import Navbar from './utils/Navbar'
import { useSelector, useDispatch } from 'react-redux'
const Profile = () => {
    const { auth} = useSelector(state => state)
    return (
        <>
        <Navbar/>
        <div className='profile' >
            <div className="container">
                <div className="profile-top">
                    <div className="row">
                        <div className="col-xl-3 col-lg-3  ">
                            <div className="wrapper ">
                                <img src="assets/images/pp.jpg" alt="" />
                            </div>
                        </div>
                        <div className="col-xl-9 col-lg-9 mt-lg-3 mt-5 text-center text-lg-start">
                            <div className="name">{auth.user.name} <button className='btn '><i class="fas fa-cog"></i>Edit</button></div>
                            <div className="event">Joined Event: {auth.user.comments.length} <div className="badge text-black bg-success"> Score:100</div> </div>
                            <div className="email">oguzhanseven18@gmail.com <div className="badge text-black bg-warning"> Joined:2019</div></div>
                        </div>
                    </div>
                </div>
                <div className="events">
                    <div className="row">
                    <Event/>
                    <Event/>
                    <Event/>
                    <Event/>
                    <Event/>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Profile

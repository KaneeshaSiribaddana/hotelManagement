import React, { useEffect, useState } from "react";
import logo from '../img/logo.png'
import { Link } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import HotelImg from "../assets/images/hotel.jpg";
import Cookies from "js-cookie";


export default function Navigation() {

    const [loggedIn, setLoggedIn] = useState(false);


    const sHome = {
        backgroundImage: `url(${HotelImg})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeate: 'no-repeat',
        height: 400,
    };
    //get user name from currentUser
    const user = JSON.parse(localStorage.getItem('currentUser'))

    function logout() {
        //remove user from local storage 
        localStorage.removeItem('currentUser')
        //redirect to login page
        window.location.href = '/login'
    }

    useEffect(() => {
        // Check if the userId cookie is present
        const userId = Cookies.get("userId");
        if (userId) {
            // User is authenticated, setLoggedIn to true
            setLoggedIn(true);
        } else {
            // User is not authenticated, setLoggedIn to false
            setLoggedIn(false);
        }
    }, []);



    return (
        <div>

            <nav class="navbar navbar-expand-lg navbar-light bg-light mb-3">
                <a className="navbar-brand " href="/" >
                    <img className="logo img-fluid" width="70" src={logo} alt="" />
                    RIVER'S EDGE
                </a>

                <div class="collapse navbar-collapse mx-5 px-5" id="navbarNav" style={{ marginRight: '150px' }}>
                    <ul class="navbar-nav px-5">
                        <li className="nav-item mr-4 ">
                            <a className="nav-link" href="/"><span className="navBarDown">Home</span></a>
                        </li>
                        <li className="nav-item mr-4 ">
                            <a className="nav-link" href="/"><span className="navBarDown">Rooms</span></a>
                        </li>
                        <li className="nav-item mr-4 ">
                            <a className="nav-link" href="#"><span className="navBarDown">Packages</span></a>
                        </li>
                        <li className="nav-item mr-4 ">
                            <a className="nav-link" href="#"><span className="navBarDown">Events</span></a>
                        </li>
                        <li className="nav-item mr-4 ">
                            <a className="nav-link" href="#"><span className="navBarDown">Services</span></a>
                        </li>
                    </ul>
                </div>
                {loggedIn ? (
                    <Link className='pt-2' to="/userprofile">
                        <button className='btn btn-primary mx-5' style={{ backgroundColor: '#6E260E', borderColor: '#6E260E' }}>Profile</button>
                    </Link>
                ) : (
                    <Link className='pt-2' to="/signup">
                        <button className='btn btn-primary mx-5' style={{ backgroundColor: '#6E260E', borderColor: '#6E260E' }}>Signup</button>
                    </Link>
                )}
                <Link to="/managers"><button className='btn btn-primary mx-4' style={{ backgroundColor: '#6E260E', borderColor: '#6E260E' }}>Manager</button></Link>
            </nav>

        </div>
    );
}



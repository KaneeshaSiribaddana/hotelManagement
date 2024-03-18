import React from "react";
import './profile.css';
import ProfileImage from './60111.jpg'

export default function Profile() {
    return (
        <div className="containerProfile" style={{ background: 'linear-gradient(90deg, rgba(86,23,23,1) 16%, rgba(252,176,69,1) 100%)' }}>
            <div className="box-profile">
                <h1 className="text-light">Profile</h1>
                <img className="profile-pic" src={ProfileImage} alt="Profile Image" />
                <h3>Pradeep Dissanayake</h3>
                <p>PdInventory@riversedge.com</p>
                <p>+94 77 712 2322</p>
                <button type="button" disabled>Inventory Manager</button>

                <div className="profile-bottom">
                </div>
            </div>
        </div>
    );
}
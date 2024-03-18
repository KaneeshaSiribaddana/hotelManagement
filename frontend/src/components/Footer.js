import React from "react";
import logo1 from '../img/logo3.png'
import phone from '../img/phoneIcon.png'
import location from '../img/locationIcon.png'


export default function Footer() {
    return (
    
    <div className="row col-md-12 footer Container bg-dark py-5 mt-3">

        <div className="col-md-4" >
            <img src={logo1} alt="" className="footerLogo"/>
        </div>
        
        <div className="col-md-2 text-light">
            <div className="footerDiv"><h3  className = "footerTitle">CONTACT</h3></div>
            <div className="footerDiv"><a className = "footera" href="#">Reservation</a><br /></div>
            <div className="footerDiv"><a className = "footera" href="#">Team of use</a><br /></div>
            <div className="footerDiv" ><a className = "footera" href="#">Front office</a><br /></div>
            <div className="footerDiv"><a className = "footera" href="#">Privacy policies</a></div>
        </div>

        <div className="col-md-2 text-light" >
            <div className="footerDiv"><h3  className = "footerTitle">ABOUT US</h3></div>
            <div className="footerDiv"><a className = "footera" href="#">Feedback</a><br /></div>
            <div className="footerDiv"><a className = "footera" href="#">Our history</a><br /></div>
            <div className="footerDiv" ><a className = "footera" href="#">Partners</a><br /></div>
            <div className="footerDiv"><a className = "footera" href="#">Our dishes</a></div>
        </div>

        <div className="col-md-2 text-light" >
            <div className="footerDiv"><h3  className = "footerTitle">HELP</h3></div>
            <div className="footerDiv"><a className = "footera" href="#">Cookies Policy</a><br /></div>
            <div className="footerDiv"><a className = "footera" href="#">Service Guarantee</a><br /></div>
        </div>

        <div className="col-md-2" >

            <div className="footerCall">
                <img src={phone} alt="" className="footerLogo " style={{width:'30px'}}/>
                <span className="text-light">+9411 121 4564</span>
            </div>

            <div className="footerLocation mt-5">
                <img src={location} alt="" className="footerLogo" style={{width:'30px'}}/>
                <span className="text-light">Weligama,Mathara</span>
                
            </div>
            
        </div>

    </div>
    
    );
}

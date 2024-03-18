import React from "react";
import EmployeeImg from "../../assets/images/employee.jpg"
import { Outlet, Link } from "react-router-dom";
import Navigation from "../Navigation";
import Footer from "../Footer";

const bgEmployee = {
    backgroundImage: `url(${EmployeeImg})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeate: 'no-repeat',
    height: 'auto'
}
export default function Employee() {
    return (
        <div>
            <Navigation />
            <div className="container my-3 px-3">
                <div className="row">
                    <div className="col-12">
                        <h1 className="mt-5 text-center text-light">Employee Directory</h1>
                        <div className="row p-3 bg-light" style={{ borderRadius: 20 }}>
                            <div className="col-6" >
                                <div style={bgEmployee}>
                                    <img src={EmployeeImg} className="img-fluid" style={{ borderRadius: 20 }} />
                                </div>
                            </div>
                            <div className="col-6 py-5 d-flex justify-content-center">
                                <div className="row">
                                    <div className="col-7 py-4">
                                        <Link to="/employeelist"><button className="btn col-12 btn-primary" style={{ backgroundColor: '#6E260E', borderColor: '#6E260E' }}>Employee List</button></Link>
                                    </div>
                                    <div className="col-7 py-4">
                                        <button className="btn col-12 btn-primary" style={{ backgroundColor: '#6E260E', borderColor: '#6E260E' }}>Employee Payroll</button>
                                    </div>
                                    <div className="col-7 py-4">
                                        <button className="btn col-12 btn-primary" style={{ backgroundColor: '#6E260E', borderColor: '#6E260E' }}>Employee Leave</button>
                                    </div>
                                    <div className="col-7 py-4">
                                        <button className="btn col-12 btn-primary" style={{ backgroundColor: '#6E260E', borderColor: '#6E260E' }}>Employee Attendance</button>
                                    </div>
                                    <div className="col-7 py-4">
                                        <button className="btn col-12 btn-primary" style={{ backgroundColor: '#6E260E', borderColor: '#6E260E' }}>Employee Annoncements</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
            <Footer />
        </div>

    );
}
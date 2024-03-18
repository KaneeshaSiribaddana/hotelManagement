import React from "react";
import { Link } from "react-router-dom";
import Navigation from "./Navigation";
import Footer from "./Footer";

export default function Managers() {
    return (
        <div>
            <Navigation />
            <div className="container my-5">
                <div className="">
                    <div className="row d-flex justify-content-center">
                        <ul class="list-group col-6">
                            <li class="list-group-item d-flex justify-content-center"><Link to="/viewallsuppliers">
                                <button className="btn btn-primary mt-2" style={{ backgroundColor: '#6E260E', borderColor: '#6E260E' }}>Suppliers</button>
                            </Link>
                            </li>
                            <li class="list-group-item d-flex justify-content-center">
                                <Link to="/userlist">
                                    <button className="btn btn-primary mt-2" style={{ backgroundColor: '#6E260E', borderColor: '#6E260E' }}>Customers</button>
                                </Link>
                            </li>
                            <li class="list-group-item d-flex justify-content-center">
                                <Link to="/purchaseorders">
                                    <button className="btn btn-primary mt-2" style={{ backgroundColor: '#6E260E', borderColor: '#6E260E' }}>Orders</button>
                                </Link>
                            </li>
                            <li class="list-group-item d-flex justify-content-center">
                                <Link to="/employee">
                                    <button className="btn btn-primary mt-2 " style={{ backgroundColor: '#6E260E', borderColor: '#6E260E' }}>Employee</button>
                                </Link>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    );
}
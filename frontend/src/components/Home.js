import { useState, useEffect } from 'react';
import Navigation from './Navigation';
import Footer from './Footer';
import { Link } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import HotelImg from "../assets/images/hotel.jpg";
import Cookies from "js-cookie";

const sHome = {
    backgroundImage: `url(${HotelImg})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeate: 'no-repeat',
    height: 400,
};

export default function Home() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [show, setShow] = useState(false);
    const [feedbackData, setFeedbackData] = useState({
        email: "",
        message: "",
    });

    const handleClose = () => {
        setShow(false);
        setFeedbackData({
            email: "",
            message: "",
        });
    };

    const handleShow = () => setShow(true);

    useEffect(() => {
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFeedbackData({
            ...feedbackData,
            [name]: value,
        });
    };

    const handleSubmitFeedback = async (e) => {
        e.preventDefault();

        // Get the user ID from the cookie
        const userId = Cookies.get("userId");

        if (userId) {
            // Include the user's ID when sending feedback
            feedbackData.userId = userId;

            try {
                const response = await fetch("http://localhost:8070/feedback/add", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(feedbackData),
                });

                if (response.ok) {
                    console.log("Feedback submitted successfully!");
                    // Close the modal after successful submission
                    handleClose();
                } else {
                    console.error("Failed to submit feedback");
                }
            } catch (error) {
                console.error("Error submitting feedback:", error);
            }
        }
    };

    return (
        <div className="container-fluid">
            <Navigation/>
            <div style={sHome}>
                
            </div>
            <div className="row">
                <div className="col-12 d-flex justify-content-center">
                    <button className="btn btn-primary mt-2"style={{backgroundColor:'#6E260E',borderColor:'#6E260E'}}> Request Menu</button>
                </div>
                <div className="col-12 d-flex justify-content-center">
                    <button className="btn btn-primary mt-2"style={{backgroundColor:'#6E260E',borderColor:'#6E260E'}}> Special Event</button>
                </div>
                <div className="col-12 mt-3 d-flex justify-content-center">
                    <div className="container">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Check In Date </th>
                                    <th scope="col">Check Out Date</th>
                                    <th scope="col">Feedback</th>
                                    <th scope="col">Total Bill</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>2022.12.06</th>
                                    <td>2022.12.15</td>
                                    <td><button onClick={handleShow} className="btn btn-success">Feedback</button></td>
                                    <td><button className='btn btn-secondary'>Bill</button></td>
                                </tr>
                                <tr>
                                    <th>2022.12.06</th>
                                    <td>2022.12.15</td>
                                    <td><button onClick={handleShow} className="btn btn-success">Feedback</button></td>
                                    <td><button className='btn btn-secondary' >Bill</button></td>
                                </tr>
                                <tr>
                                    <th>2022.12.06</th>
                                    <td>2022.12.15</td>
                                    <td><button onClick={handleShow} className="btn btn-success">Feedback</button></td>
                                    <td><button className='btn btn-secondary'>Bill</button></td>
                                </tr>
                                <tr>
                                    <th>2022.12.06</th>
                                    <td>2022.12.15</td>
                                    <td><button onClick={handleShow} className="btn btn-success">Feedback</button></td>
                                    <td><button className='btn btn-secondary'>Bill</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header>
                        <Modal.Title>Feedback</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div class="form-group">
                                <label for="exampleFormControlInput1">Email address</label>
                                <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                            </div>
                            <div class="form-group">
                                <label for="exampleFormControlTextarea1">Message</label>
                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-secondary" variant="secondary" onClick={handleClose}>
                            Close
                        </button>
                        <button className="btn btn-primary" variant="primary" onClick={handleClose}>
                            Submit
                        </button>
                    </Modal.Footer>
                </Modal>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Feedback</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmitFeedback}>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlInput1">Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                id="exampleFormControlInput1"
                                placeholder="name@example.com"
                                name="email"
                                value={feedbackData.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlTextarea1">Message</label>
                            <textarea
                                className="form-control"
                                id="exampleFormControlTextarea1"
                                rows="3"
                                name="message"
                                value={feedbackData.message}
                                onChange={handleInputChange}
                                required
                            ></textarea>
                        </div>
                        <Modal.Footer>
                            <button className="btn btn-secondary" variant="secondary" onClick={handleClose}>
                                Close
                            </button>
                            <button type="submit" className="btn btn-primary" variant="primary">
                                Submit
                            </button>
                        </Modal.Footer>

                    </form>
                </Modal.Body>
            </Modal>
            <Footer/>
        </div>
    );
}

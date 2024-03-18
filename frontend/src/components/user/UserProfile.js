import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Cookies from "js-cookie";
import Navigation from "../Navigation";
import Footer from "../Footer";

const styles = {
    container: {
        fontFamily: "Poppins",
        display: "grid",
        placeItems: "center",
        height: "100vh",
        background: "#efe2ff", // Updated background color
    },
    formContainer: {
        backgroundColor: "#ffffffa1",
        backdropFilter: "blur(10px)",
        border: "2px solid #ffffff6d",
        width: "760px",
        borderRadius: "10px",
        boxShadow: "3px 3px 11px 1.5px #0000002b",
        fontFamily: "Poppins",
        padding: "10px",
        height: "max-content",

        display: "grid",
        gridTemplateColumns: "50% 50%",
    },
    heading: {
        padding: "20px",
        color: "#25007c", // Updated color
        fontSize: "2.1rem",
        fontWeight: 800,
        gridColumn: "1/span 2",
    },
    imgContainer: {
        overflow: "hidden",
        borderRadius: "10px",
        background:
            "url(https://e0.pxfuel.com/wallpapers/714/653/desktop-wallpaper-river-forest-sunset-landscape-art-q-samsung-galaxy-s6-s7-edge-note-lg-g4-background-blue-sunset-art.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "bottom",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        padding: "10px",
    },
    name: {
        display: "grid",
        gridTemplateColumns: "repeat(2, 50%)",
    },
    listItem: {
        listStyleType: "none",
        display: "flex",
        flexDirection: "column",
        padding: "0px 5px",
        textAlign: "left",
    },
    label: {
        fontSize: "0.8rem",
        fontWeight: 600,
        width: "100%",
        padding: "5px 15px",
        color: "#25007c", // Updated color
    },
    input: {
        padding: "10px",
        borderRadius: "8px",
        border: "none",
        backgroundColor: "#ffffff6d",
        width: "100%",
        outline: "none",
        color: "#25007c", // Updated color
        marginBottom: "10px",
    },
    inputFocused: {
        border: "1px solid #25007c", // Updated color
    },
    select: {
        width: "100%",
    },
    phoneInput: {
        flex: 1,
        width: "100%",
    },
    subscribe: {
        display: "flex",
        flexDirection: "row",
        padding: "10px",
        alignItems: "center",
    },
    checkBoxCont: {
        width: "25px",
        borderRadius: "5px",
        height: "25px",
        position: "relative",
        border: "1px solid #25007c", // Updated color
        transitionDuration: "0.2s",
    },
    checkBoxContHover: {
        backgroundColor: "#25007c", // Updated color
    },
    tickLine: {
        backgroundColor: "#25007c", // Updated color
        borderRadius: "20px",
        height: "3px",
        position: "absolute",
        width: "20px",
        transitionDuration: "0.3s",
        border: "none",
    },
    tickLine1: {
        transform: "rotate(-45deg)",
        top: "10px",
        left: "5px",
        opacity: 0,
        width: "18px",
        animation: "1s car linear infinite",
    },
    tickLine2: {
        transform: "rotate(50deg)",
        top: "12px",
        width: "8px",
        opacity: 0,
        left: "2px",
    },
    subscribeLabel: {
        padding: "10px",
        width: "fit-content",
    },
    button: {
        width: "fit-content",
        borderRadius: "5px",
        padding: "10px 20px",
        fontSize: "1.1rem",
        color: "white",
        backgroundColor: "#25007c",
        border: "none",
        cursor: "pointer",
        margin: "auto",
    },
};

export default function UserProfile() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const navigate = useNavigate(); // Initialize navigate hook
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        address: "",
        contact: "",
        password: "",
    });


    useEffect(() => {
        // Fetch user data based on the userId cookie
        const userId = Cookies.get("userId");
        if (userId) {
            fetch(`http://localhost:8070/user/get/${userId}`)
                .then((response) => response.json())
                .then((data) => {
                    // Populate the form data with fetched data
                    setFormData({
                        firstname: data.firstname || "",
                        lastname: data.lastname || "",
                        email: data.email || "",
                        address: data.address || "",
                        contact: data.contact || "",
                        password: data.password || "",
                    });
                })
                .catch((error) => {
                    console.error("Error fetching user data:", error);
                });
        }
    }, []);

    const handleRemoveAccount = async () => {
        // Get the user ID from the cookie
        const userId = Cookies.get("userId");

        if (userId) {
            try {
                const response = await fetch(`http://localhost:8070/user/delete/${userId}`, {
                    method: "DELETE",
                });

                if (response.ok) {
                    console.log("Account deleted successfully!");
                    // Redirect to the login page after deleting the account
                    navigate("/login");
                } else {
                    console.error("Failed to delete account");
                }
            } catch (error) {
                console.error("Error deleting account:", error);
            }
        }
    };

    return (
        <div>
            <Navigation />
            <div style={styles.container}>
                <div style={styles.formContainer}>
                    <div style={styles.imgContainer}></div>
                    <div style={styles.form}>
                        <h1 style={styles.heading}>User Profile</h1>
                        <div style={styles.name}>
                            <li style={styles.listItem}>
                                <span style={styles.label}>First Name:</span>
                                <span style={styles.input}>{formData.firstname}</span>
                            </li>
                            <li style={styles.listItem}>
                                <span style={styles.label}>Last Name:</span>
                                <span style={styles.input}>{formData.lastname}</span>
                            </li>
                        </div>
                        <li style={styles.listItem}>
                            <span style={styles.label}>Email:</span>
                            <span style={styles.input}>{formData.email}</span>
                        </li>
                        <li style={styles.listItem}>
                            <span style={styles.label}>Address:</span>
                            <span style={styles.input}>{formData.address}</span>
                        </li>
                        <div>
                            <li style={styles.listItem}>
                                <span style={styles.label}>Phone No:</span>
                                <span style={styles.input}>{formData.contact}</span>
                            </li>
                        </div>
                        <Link to="/editprofile" className="mb-3" style={styles.button}>
                            Edit Profile
                        </Link>
                        <button className="btn btn-danger" onClick={handleShow}>
                            Remove Account
                        </button>
                    </div>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header>
                            <Modal.Title>Confirm Remove</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div>Are you confirming the remove?</div>
                        </Modal.Body>
                        <Modal.Footer>
                            <button className="btn btn-secondary" variant="secondary" onClick={handleClose}>
                                Close
                            </button>
                            <button
                                className="btn btn-danger"
                                variant="danger"
                                onClick={handleRemoveAccount}
                            >
                                Remove
                            </button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
            <Footer />
        </div>

    );
}

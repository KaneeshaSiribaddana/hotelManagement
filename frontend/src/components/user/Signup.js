import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import './signup.css';
import Navigation from "../Navigation";
import Footer from "../Footer";

const styles = {
  container: {
    fontFamily: 'Poppins',
    display: 'grid',
    placeItems: 'center',
    height: '100vh',
    background: '#efe2ff', // Updated background color
  },
  formContainer: {
    backgroundColor: '#ffffffa1',
    backdropFilter: 'blur(10px)',
    border: '2px solid #ffffff6d',
    width: '760px',
    borderRadius: '10px',
    boxShadow: '3px 3px 11px 1.5px #0000002b',
    fontFamily: 'Poppins',
    padding: '10px',
    height: 'max-content',

    display: 'grid',
    gridTemplateColumns: '50% 50%',
  },
  heading: {
    padding: '20px',
    color: '#A52A2A',
    fontSize: '2.1rem',
    fontWeight: 800,
    gridColumn: '1/span 2',
  },
  imgContainer: {
    overflow: 'hidden',
    borderRadius: '10px',
    background: 'url(https://e0.pxfuel.com/wallpapers/714/653/desktop-wallpaper-river-forest-sunset-landscape-art-q-samsung-galaxy-s6-s7-edge-note-lg-g4-background-blue-sunset-art.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'bottom',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    padding: '10px',
  },
  name: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 50%)',
  },
  listItem: {
    listStyleType: 'none',
    display: 'flex',
    flexDirection: 'column',
    padding: '0px 5px',
    textAlign: 'left',
  },
  label: {
    fontSize: '0.8rem',
    fontWeight: 600,
    width: '100%',
    padding: '5px 15px',
    color: '#A52A2A',
  },
  input: {
    padding: '10px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#ffffff6d',
    width: '100%',
    outline: 'none',
    color: '#25007c', // Updated color
    marginBottom: '10px',
  },
  inputFocused: {
    border: '1px solid #25007c', // Updated color
  },
  select: {
    width: '100%',
  },
  phone: {
    display: 'grid',
    gridTemplateColumns: '35% 65%',
  },
  phoneInput: {
    flex: 1,
    width: '100%',
  },
  subscribe: {
    display: 'flex',
    flexDirection: 'row',
    padding: '10px',
    alignItems: 'center',
  },
  checkBoxCont: {
    width: '25px',
    borderRadius: '5px',
    height: '25px',
    position: 'relative',
    border: '1px solid #25007c',
    transitionDuration: '0.2s',
  },
  checkBoxContHover: {
    backgroundColor: '#25007c',
  },
  tickLine: {
    backgroundColor: '#25007c', // Updated color
    borderRadius: '20px',
    height: '3px',
    position: 'absolute',
    width: '20px',
    transitionDuration: '0.3s',
    border: 'none',
  },
  tickLine1: {
    transform: 'rotate(-45deg)',
    top: '10px',
    left: '5px',
    opacity: 0,
    width: '18px',
    animation: '1s car linear infinite',
  },
  tickLine2: {
    transform: 'rotate(50deg)',
    top: '12px',
    width: '8px',
    opacity: 0,
    left: '2px',
  },
  subscribeLabel: {
    padding: '10px',
    width: 'fit-content',
  },
  button: {
    width: 'fit-content',
    borderRadius: '5px',
    padding: '10px 20px',
    fontSize: '1.1rem',
    color: 'white',
    backgroundColor: '#A52A2A',
    border: 'none',
    cursor: 'pointer',
    margin: 'auto',
  },
};

export default function Signup() {
  const navigate = useNavigate(); // Initialize useNavigate

  // Define state variables to store form input values
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    address: "",
    contact: "",
    password: "",
    confirmPassword: "",
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the password meets complexity requirements
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      alert("Password must contain at least one capital letter, one number, and be at least 8 characters long");
      return;
    }

    // Check if the confirmPassword matches the password
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Create a POST request to send form data to the backend
    try {
      const response = await fetch("http://localhost:8070/user/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data); // Log the response from the backend (e.g., "User added")

        // Navigate to the login page upon successful signup
        navigate("/login");
      } else {
        alert("This email is already Registered");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };


  return (
    <div>
      <Navigation />
      <div style={styles.container}>
        <div style={styles.formContainer}>
          <div style={styles.imgContainer}></div>
          <form id="Form" style={styles.form} onSubmit={handleSubmit}>
            <h1 style={styles.heading}>Sign Up</h1>
            <div style={styles.name}>
              <li style={styles.listItem}>
                <label style={styles.label}>First Name:</label>
                <input
                  type="text"
                  name="firstname"
                  placeholder="First"
                  style={styles.input}
                  onChange={handleInputChange}
                />
              </li>
              <li style={styles.listItem}>
                <label style={styles.label}>Last Name:</label>
                <input
                  type="text"
                  name="lastname"
                  placeholder="Last"
                  style={styles.input}
                  onChange={handleInputChange}
                />
              </li>
            </div>
            <li style={styles.listItem}>
              <label style={styles.label}>Email:</label>
              <input
                type="email"
                name="email"
                placeholder="email"
                style={styles.input}
                onChange={handleInputChange}
              />
            </li>
            <li style={styles.listItem}>
              <label style={styles.label}>Address:</label>
              <input
                type="text"
                name="address"
                placeholder=""
                style={styles.input}
                onChange={handleInputChange}
              />
            </li>
            <div>
              <li style={styles.listItem}>
                <label style={styles.label}>Phone No:</label>
                <input
                  type="number"
                  name="contact"
                  placeholder=""
                  style={styles.input}
                  onChange={handleInputChange}
                />
              </li>
            </div>
            <div style={styles.password}>
              <li style={styles.listItem}>
                <label style={styles.label}>Password:</label>
                <input
                  type="password"
                  name="password"
                  style={styles.input}
                  onChange={handleInputChange}
                />
              </li>
              <li style={styles.listItem}>
                <label style={styles.label}>Confirm Password:</label>
                <input
                  type="password"
                  name="confirmPassword"
                  style={styles.input}
                  onChange={handleInputChange}
                />
              </li>
            </div>
            <a className="mt-1 mb-2 link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover">
              <Link to='/login'>Already have an Account?</Link>
            </a>
            <button type="submit" style={styles.button}>
              Sign Up
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>

  );
}

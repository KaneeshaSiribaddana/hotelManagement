import React, { useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
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

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // State for displaying the alert
  const [alertMessage, setAlertMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8070/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Login successful, get the userId from the response and set it as a cookie
        const data = await response.json();
        if (data.userId) {
          Cookies.set("userId", data.userId, { expires: 7 }); // Set a cookie that expires in 7 days
        }

        // Redirect to the home page
        window.location.href = "/";
      } else {
        // Display an alert for failed login
        setAlertMessage("Invalid email or password. Please try again.");
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
          <form style={styles.form} onSubmit={handleSubmit}>
            <h1 style={styles.heading}>SignIn</h1>
            <li style={styles.listItem}>
              <label style={styles.label}>Email:</label>
              <input
                type="email"
                name="email"
                placeholder="johndoe123@gmail.com"
                style={styles.input}
                onChange={handleInputChange}
              />
            </li>
            <div className="">
              <li style={styles.listItem}>
                <label style={styles.label}>Password:</label>
                <input
                  type="password"
                  name="password"
                  style={styles.input}
                  onChange={handleInputChange}
                />
              </li>
            </div>
            {/* Display the alert message */}
            {alertMessage && (
              <div style={{ color: "red", marginBottom: "10px" }}>
                {alertMessage}
              </div>
            )}
            <a className="mt-1 mb-2 link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover">
              <Link to="/signup"> New to Riversedge? </Link>
            </a>
            <button type="submit" style={styles.button}>
              SignIn
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>

  );
}

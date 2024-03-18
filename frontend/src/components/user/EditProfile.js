import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

export default function EditProfile() {
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get the user ID from the cookie
    const userId = Cookies.get("userId");

    if (userId) {
      try {
        const response = await fetch(`http://localhost:8070/user/update/${userId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          console.log("Profile updated successfully!");
          // Redirect to the homepage after a successful update
          navigate("/");
        } else {
          console.error("Failed to update profile");
        }
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    }
  };

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
          <form onSubmit={handleSubmit} style={styles.form}>
            <h1 style={styles.heading}>Edit Profile</h1>
            <div style={styles.name}>
              <li style={styles.listItem}>
                <label style={styles.label}>First Name:</label>
                <input
                  type="text"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleInputChange}
                  style={styles.input}
                />
              </li>
              <li style={styles.listItem}>
                <label style={styles.label}>Last Name:</label>
                <input
                  type="text"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleInputChange}
                  style={styles.input}
                />
              </li>
            </div>
            <li style={styles.listItem}>
              <label style={styles.label}>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                style={styles.input}
              />
            </li>
            <li style={styles.listItem}>
              <label style={styles.label}>Address:</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                style={styles.input}
              />
            </li>
            <div>
              <li style={styles.listItem}>
                <label style={styles.label}>Phone No:</label>
                <input
                  type="text"
                  name="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                  style={styles.input}
                />
              </li>
            </div>
            <div style={styles.password}>
              <li style={styles.listItem}>
                <label style={styles.label}>Password:</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  style={styles.input}
                />
              </li>
            </div>
            <button type="submit" style={styles.button}>
              Update Profile
            </button>
          </form>
        </div>
      </div>
      <Footer/>
    </div>

  );
}
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Navigation from '../Navigation';
import Footer from '../Footer';

export default function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate(); // Add this line to get the navigate function

  const [employee, setEmployee] = useState({
    fname: '',
    lname: '',
    position: '',
    gender: 'male', // Set a default gender if needed
    age: '',
    contact: '',
  });

  useEffect(() => {
    // Fetch employee data by ID and populate the inputs
    async function fetchEmployeeData() {
      try {
        const response = await fetch(`http://localhost:8070/employee/get/${id}`);
        if (response.ok) {
          const data = await response.json();
          setEmployee(data); // Set the retrieved data in the state
        } else {
          console.error('Failed to fetch employee data');
        }
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    }

    fetchEmployeeData();
  }, [id]);

  const handleUpdateEmployee = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8070/employee/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employee),
      });

      if (response.ok) {
        navigate('/employeelist'); // Use navigate to redirect to "/employeelist" on successful update
      } else {
        console.error('Failed to update employee');
      }
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  return (
    <div>
      <Navigation />
      <div className='container-fluid pt-5' style={{ background: '' }}>
        <div className='container p-5 mt-5 bg-body-secondary' style={{ borderRadius: 20 }}>
          <h1 className='mt-3 text-center'>Edit Employee</h1>
          <div className='container'>
            <form onSubmit={handleUpdateEmployee}> {/* Use onSubmit to handle form submission */}
              <div className='row'>
                <div className='col-12'>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1"> Employee ID</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      value={id} // Display the employee ID
                      placeholder="Enter First Name"
                      readOnly
                    />
                  </div>
                </div>
                <div className='col-6'>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1"> First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter First Name"
                      value={employee.fname} // Set value from state
                      onChange={(e) => setEmployee({ ...employee, fname: e.target.value })} // Update state on change
                      required // Add required attribute
                    />
                  </div>
                </div>
                <div className='col-6'>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1"> Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter Last Name"
                      value={employee.lname} // Set value from state
                      onChange={(e) => setEmployee({ ...employee, lname: e.target.value })} // Update state on change
                      required // Add required attribute
                    />
                  </div>
                </div>
              </div>
              <div className='row mt-2'>
                <div className='col-6'>
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Position</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="Enter Position"
                      value={employee.position} // Set value from state
                      onChange={(e) => setEmployee({ ...employee, position: e.target.value })} // Update state on change
                      required // Add required attribute
                    />
                  </div>
                </div>
                <div className='col-6'>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1"> Gender</label>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="exampleRadios"
                        id="exampleRadios1"
                        value="male"
                        checked={employee.gender === 'male'} // Set checked based on state
                        onChange={() => setEmployee({ ...employee, gender: 'male' })} // Update state on change
                      />
                      <label className="form-check-label" htmlFor="exampleRadios1">
                        Male
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="exampleRadios"
                        id="exampleRadios2"
                        value="female"
                        checked={employee.gender === 'female'} // Set checked based on state
                        onChange={() => setEmployee({ ...employee, gender: 'female' })} // Update state on change
                      />
                      <label className="form-check-label" htmlFor="exampleRadios2">
                        Female
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-6'>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1"> Age</label>
                    <input
                      type="number"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter Age"
                      value={employee.age} // Set value from state
                      onChange={(e) => setEmployee({ ...employee, age: e.target.value })} // Update state on change
                      required // Add required attribute
                    />
                  </div>
                </div>
                <div className='col-6'>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Phone Number</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter Phone Number"
                      value={employee.contact} // Set value from state
                      onChange={(e) => setEmployee({ ...employee, contact: e.target.value })} // Update state on change
                      required // Add required attribute
                    />
                  </div>
                </div>
              </div>
              <div className='d-flex justify-content-center'>
                <button type="submit" className="btn col-3 mt-3 mb-5 btn-primary" style={{ backgroundColor: '#6E260E', borderColor: '#6E260E' }}>Update</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>

  );
}

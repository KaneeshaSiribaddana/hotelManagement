import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navigation from '../Navigation';
import Footer from '../Footer';

export default function ViewEmployee() {
  const { id } = useParams();
  const [employee, setEmployee] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch employee data from the API
    fetch(`http://localhost:8070/employee/get/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch employee data');
        }
        return response.json();
      })
      .then((data) => {
        setEmployee(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Navigation />
      <div className="container-fluid pt-5" style={{ background: '' }}>
        <div className="container p-5 mt-5 bg-body-secondary" style={{ borderRadius: 20 }}>
          <h1 className="mt-3 text-center">Employee</h1>
          <h3 className="mt-3 text-center">{`${employee.fname} ${employee.lname}`}</h3>
          <div className="container">
            <form>
              <div className="row">
                <div className="col-12">
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1"> Employee ID</label>
                    <div className="bg-light px-5 pt-1" style={{ borderRadius: 20 }}>
                      <p>{employee._id}</p>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1"> First Name</label>
                    <div className="bg-light px-5 pt-1" style={{ borderRadius: 20 }}>
                      <p>{employee.fname}</p>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1"> Last Name</label>
                    <div className="bg-light px-5 pt-1" style={{ borderRadius: 20 }}>
                      <p>{employee.lname}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-6">
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Position</label>
                    <div className="bg-light px-5 pt-1" style={{ borderRadius: 20 }}>
                      <p>{employee.position}</p>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1"> Gender</label>
                    <div className="bg-light px-5 pt-1" style={{ borderRadius: 20 }}>
                      <p>{employee.gender}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1"> Age</label>
                    <div className="bg-light px-5 pt-1" style={{ borderRadius: 20 }}>
                      <p>{employee.age}</p>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Phone Number</label>
                    <div className="bg-light px-5 pt-1" style={{ borderRadius: 20 }}>
                      <p>{employee.contact}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-center">
                <button type="submit" className="btn col-3 mt-3 mb-5 btn-primary" style={{ backgroundColor: '#6E260E', borderColor: '#6E260E' }}>
                  Edit
                </button>
                <button type="submit" className="btn col-3 mt-3 mx-2  mb-5 btn-danger">
                  Remove
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>

  );
}

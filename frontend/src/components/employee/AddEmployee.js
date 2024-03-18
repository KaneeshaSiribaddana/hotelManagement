import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../Navigation';
import Footer from '../Footer';

export default function AddEmployee() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    position: '',
    gender: 'male',
    age: '',
    contact: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8070/employee/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Employee added successfully!');
        navigate('/employeelist');
      } else {
        console.error('Failed to add employee');
        // Handle the error or display an error message to the user.
      }
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div>
      <Navigation />
      <div className='container-fluid pt-5' style={{ background: '' }}>
        <div className='container p-5 mt-5 bg-body-secondary' style={{ borderRadius: 20 }}>
          <h1 className='mt-3 text-center'>Add Employee</h1>
          <div className='container'>
            <form onSubmit={handleSubmit}>
              <div className='row'>
                <div className='col-6'>
                  <div className='form-group'>
                    <label htmlFor='fname'>First Name</label>
                    <input
                      type='text'
                      name='fname'
                      value={formData.fname}
                      onChange={handleInputChange}
                      className='form-control'
                      id='fname'
                      placeholder='Enter First Name'
                      required // Required attribute
                    />
                  </div>
                </div>
                <div className='col-6'>
                  <div className='form-group'>
                    <label htmlFor='lname'>Last Name</label>
                    <input
                      type='text'
                      name='lname'
                      value={formData.lname}
                      onChange={handleInputChange}
                      className='form-control'
                      id='lname'
                      placeholder='Enter Last Name'
                      required // Required attribute
                    />
                  </div>
                </div>
              </div>
              <div className='row mt-2'>
                <div className='col-6'>
                  <div className='form-group'>
                    <label htmlFor='position'>Position</label>
                    <input
                      type='text'
                      name='position'
                      value={formData.position}
                      onChange={handleInputChange}
                      className='form-control'
                      id='position'
                      placeholder='Enter Position'
                      required // Required attribute
                    />
                  </div>
                </div>
                <div className='col-6'>
                  <div className='form-group'>
                    <label>Gender</label>
                    <div className='form-check'>
                      <input
                        className='form-check-input'
                        type='radio'
                        name='gender'
                        id='male'
                        value='male'
                        checked={formData.gender === 'male'}
                        onChange={handleInputChange}
                      />
                      <label className='form-check-label' htmlFor='male'>
                        Male
                      </label>
                    </div>
                    <div className='form-check'>
                      <input
                        className='form-check-input'
                        type='radio'
                        name='gender'
                        id='female'
                        value='female'
                        checked={formData.gender === 'female'}
                        onChange={handleInputChange}
                      />
                      <label className='form-check-label' htmlFor='female'>
                        Female
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-6'>
                  <div className='form-group'>
                    <label htmlFor='age'>Age</label>
                    <input
                      type='number'
                      name='age'
                      value={formData.age}
                      onChange={handleInputChange}
                      className='form-control'
                      id='age'
                      placeholder='Enter Age'
                      required // Required attribute
                    />
                  </div>
                </div>
                <div className='col-6'>
                  <div className='form-group'>
                    <label htmlFor='contact'>Contact Number</label>
                    <input
                      type='text'
                      name='contact'
                      value={formData.contact}
                      onChange={handleInputChange}
                      className='form-control'
                      id='contact'
                      placeholder='Enter Contact Number'
                      required // Required attribute
                    />
                  </div>
                </div>
              </div>
              <div className='d-flex justify-content-center'>
                <button type='submit' className='btn col-3 mt-3 mb-5 btn-primary'>
                  Submit
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

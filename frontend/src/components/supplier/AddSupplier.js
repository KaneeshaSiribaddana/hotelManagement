import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../Navigation';
import Footer from '../Footer';

export default function AddSupplier() {
    const [formData, setFormData] = useState({
        name: '',
        contact: '',
        address: '',
        products: '',
    });
    const [status, setStatus] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8070/supplier/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus('Supplier added successfully');
                navigate('/viewallsuppliers');
            } else {
                setStatus('Failed to add supplier');
            }
        } catch (error) {
            setStatus('Failed to connect to the server');
        }
    };

    return (
        <div>
            <Navigation />
            <div className='container-fluid text-light m-5 mr-5' style={{ background: '	#C0C0C0', borderRadius: 20 }}>
                <div className='container p-5'>
                    <h1 className='mt-3'>Add Supplier</h1>
                    <div className='container'>

                        <form onSubmit={handleSubmit}>
                            <div className='row'>
                                <div className='col-6'>
                                    <div className="form-group">
                                        <label htmlFor="name">Name</label>
                                        <input type="text" className="form-control" id="name" aria-describedby="emailHelp" placeholder="Enter Full Name" onChange={handleChange} />
                                    </div>
                                </div>
                                <div className='col-6'>
                                    <div className="form-group">
                                        <label htmlFor="contact">Contact Number</label>
                                        <input type="number" className="form-control" id="contact" placeholder="Enter Contact Number" onChange={handleChange} />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group mt-2">
                                <label htmlFor="address">Address</label>
                                <input type="text" className="form-control" id="address" placeholder="Enter Address" onChange={handleChange} />
                            </div>
                            <div className="form-group mt-2">
                                <label htmlFor="products">Products</label>
                                <input type="text" className="form-control" id="products" placeholder="Enter Products by ','" onChange={handleChange} />
                            </div>
                            <button type="submit" className="btn col-3 mt-3 mb-5 btn-primary" style={{ backgroundColor: '	#6E260E' }}>Submit</button>
                        </form>
                        {status && <p>{status}</p>}
                    </div>
                </div>
            </div>
            <Footer />
        </div>

    );
}

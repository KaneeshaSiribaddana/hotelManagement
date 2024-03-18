import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navigation from '../Navigation';
import Footer from '../Footer';

export default function EditSupplier() {
    const [formData, setFormData] = useState({
        name: '',
        contact: '',
        address: '',
        products: '',
    });
    const [status, setStatus] = useState('');
    const navigate = useNavigate();
    const { id } = useParams(); // Get the supplier ID from the URL parameter

    useEffect(() => {
        // Fetch supplier data based on the ID
        fetch(`http://localhost:8070/supplier/get/${id}`)
            .then(async (response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json(); // Parse the response to JSON
                // Populate the form fields with the fetched data
                setFormData(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [id]);

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
            const response = await fetch(`http://localhost:8070/supplier/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus('Supplier Updated successfully');
                navigate('/viewallsuppliers');
            } else {
                setStatus('Failed to update supplier');
            }
        } catch (error) {
            setStatus('Failed to connect to the server');
        }
    };

    return (
        <div>
            <Navigation />
            <div className="container-fluid text-light" style={{ background: '	#C0C0C0' }}>
                <div className="container p-5">
                    <h1 className="mt-3">Edit Supplier</h1>
                    <div className="container">
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-6">
                                    <div className="form-group">
                                        <label htmlFor="name">Name</label>
                                        <input type="text" className="form-control" id="name" value={formData.name} aria-describedby="emailHelp" placeholder="Enter Full Name" onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group">
                                        <label htmlFor="contact">Contact Number</label>
                                        <input type="number" className="form-control" id="contact" value={formData.contact} placeholder="Enter Contact Number" onChange={handleChange} />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group mt-2">
                                <label htmlFor="address">Address</label>
                                <input type="text" className="form-control" id="address" value={formData.address} placeholder="Enter Address" onChange={handleChange} />
                            </div>
                            <div className="form-group mt-2">
                                <label htmlFor="products">Products</label>
                                <input type="text" className="form-control" id="products" value={formData.products} placeholder="Enter Products by ','" onChange={handleChange} />
                            </div>
                            <button type="submit" className="btn col-3 mt-3 mb-5 btn-primary" style={{ backgroundColor: '	#6E260E' }}>Update</button>
                        </form>
                        {status && <p>{status}</p>}
                    </div>
                </div>
            </div>
            <Footer />
        </div>

    );
}

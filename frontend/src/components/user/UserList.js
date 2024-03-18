import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from 'react-bootstrap/Modal';
import { Link, useNavigate } from 'react-router-dom';
import { faMagnifyingGlass, faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { PDFDocument, rgb } from 'pdf-lib';

export default function UserList() {
    const [searchQuery, setSearchQuery] = useState('');
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const pdfBlobRef = useRef(null);
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [filteredUsers, setFilteredUsers] = useState([]); // Added filteredUsers state

    const handleClose = () => setShow(false);
    const handleShow = (userId) => {
        setSelectedUserId(userId);
        setShow(true);
    };

    useEffect(() => {
        fetch('http://localhost:8070/user/')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                return response.json();
            })
            .then((data) => {
                setUsers(data);
                setFilteredUsers(data); // Initialize filteredUsers with all users
            })
            .catch((err) => {
                setError(err.message);
            });
    }, []);

    useEffect(() => {
        if (pdfBlobRef.current) {
            const pdfUrl = URL.createObjectURL(pdfBlobRef.current);
            window.open(pdfUrl);
        }
    }, [pdfBlobRef]);

    const createPdf = async (userData) => {
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([600, 400]);

        page.drawText('Report of Users', {
            x: 50,
            y: 350,
            size: 16,
            color: rgb(0, 0, 0),
        });
        let y = 320;
        userData.forEach((data) => {
            Object.entries(data).forEach(([key, value]) => {
                page.drawText(`${key}: ${value}`, {
                    x: 50,
                    y: y,
                    size: 8,
                    color: rgb(0, 0, 0),
                });
                y -= 20;
            });
            y -= 10; // Add extra spacing between user data
        });

        const pdfBytes = await pdfDoc.save();
        const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });

        const pdfUrl = URL.createObjectURL(pdfBlob);

        pdfBlobRef.current = pdfBlob;

        window.open(pdfUrl);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);

        if (e.target.value === "") {
            // Reset the filtered users to the original users when the search input is empty
            setFilteredUsers(users);
        } else {
            const searchValue = e.target.value.toLowerCase();
            const filtered = users.filter((user) =>
                user.firstname.toLowerCase().includes(searchValue) ||
                user.lastname.toLowerCase().includes(searchValue)
            );
            setFilteredUsers(filtered);
        }
    };

    const navigateToEditUser = (userId) => {
        navigate(`/edituser/${userId}`);
    };

    const removeUser = () => {
        fetch(`http://localhost:8070/user/delete/${selectedUserId}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to delete user');
                }
                const updatedUsers = users.filter(
                    (user) => user._id !== selectedUserId
                );
                setUsers(updatedUsers);
                setFilteredUsers(updatedUsers); // Update filteredUsers after successful deletion
                handleClose();
            })
            .catch((err) => {
                setError(err.message);
            });
    };

    return (
        <div className="container">
            <div className="row mt-5 py-5">
                <div className="col-12 mt-3">
                    <div className="row">
                        <div className="col-8">
                            <h3 className='text-light'>All Users</h3>
                        </div>
                    </div>
                    <div className="col-3">
                        <form action="">
                            <div className="p-1 bg-light d-flex rounded rounded-pill shadow-sm mb-4">
                                <div className="input-group">
                                    <input
                                        type="search"
                                        placeholder="Search User"
                                        aria-describedby="button-addon1"
                                        className="form-control border-0 bg-light"
                                        value={searchQuery}
                                        onChange={handleSearchChange}
                                    />
                                    <div className="input-group-append">
                                        <button
                                            id="button-addon1"
                                            type="submit"
                                            className="btn btn-link text-secondaey"
                                        >
                                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="col-3">
                    <button
                        className="btn btn-warning mb-5 col-12"
                        onClick={() => createPdf(filteredUsers)}
                    >
                        Generate PDF
                    </button>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Address</th>
                            <th scope="col">Contact</th>
                            <th scope="col"></th>
                            <th scope="col"></th>

                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user, index) => (
                            <tr key={index}>
                                <td>{user.firstname + ' ' + user.lastname}</td>
                                <td>{user.email}</td>
                                <td>{user.address}</td>
                                <td>{user.contact}</td>
                                <td className="text-danger pt-3">
                                    <button
                                        className="btn"
                                        onClick={() => handleShow(user._id)}
                                    >
                                        <FontAwesomeIcon
                                            className="text-danger"
                                            icon={faTrash}
                                            style={{ fontSize: 25 }}
                                        />
                                    </button>
                                </td>
                                <td>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {error && <div className="alert alert-danger">{error}</div>}
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
                            onClick={removeUser}
                        >
                            Remove
                        </button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
}

import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from 'react-bootstrap/Modal';
import { Link, useNavigate } from 'react-router-dom';
import { faMagnifyingGlass, faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { PDFDocument, rgb } from 'pdf-lib';
import Navigation from '../Navigation';
import Footer from '../Footer';

export default function ViewAllSuppliers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [suppliers, setSuppliers] = useState([]);
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
  const [error, setError] = useState(null);
  const pdfBlobRef = useRef(null);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [selectedSupplierId, setSelectedSupplierId] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = (supplierId) => {
    setSelectedSupplierId(supplierId); // Store the selected supplier ID
    setShow(true);
  };

  useEffect(() => {
    fetch('http://localhost:8070/supplier/')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then((data) => {
        setSuppliers(data);
        setFilteredSuppliers(data); // Initialize filtered suppliers with all suppliers
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

  const createPdf = async (supplierData) => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 400]);

    page.drawText('Report of Suppliers', {
      x: 50,
      y: 350,
      size: 18,
      color: rgb(0, 0, 0),
    });
    let y = 320;
    supplierData.forEach((data) => {
      Object.entries(data).forEach(([key, value]) => {
        page.drawText(`${key}: ${value}`, {
          x: 50,
          y: y,
          size: 9,
          color: rgb(0, 0, 0),
        });
        y -= 20;
      });
    });

    const pdfBytes = await pdfDoc.save();
    const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });

    const pdfUrl = URL.createObjectURL(pdfBlob);

    pdfBlobRef.current = pdfBlob;

    window.open(pdfUrl);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query === "") {
      setFilteredSuppliers([...suppliers]); // Show all suppliers if the search query is empty
    } else {
      const filtered = suppliers.filter((supplier) =>
        supplier.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredSuppliers(filtered); // Update filtered suppliers based on the search query
    }
  };

  const navigateToEditSupplier = (supplierId) => {
    navigate(`/editsupplier/${supplierId}`);
  };

  const removeSupplier = () => {
    // Send a request to delete the supplier with the selectedSupplierId
    fetch(`http://localhost:8070/supplier/delete/${selectedSupplierId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete supplier');
        }
        // Update the suppliers list after successful deletion
        const updatedSuppliers = suppliers.filter(
          (supplier) => supplier._id !== selectedSupplierId
        );
        setSuppliers(updatedSuppliers);
        setFilteredSuppliers(updatedSuppliers); // Update filtered suppliers as well
        handleClose();
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div>
      <Navigation />
      <div className="container ">
        <div className="row mt-5 py-5 px-2 rounded" style={{ backgroundColor: '	#C0C0C0', }}>
          <div className="col-12 mt-3" >
            <div className="row">
              <div className="col-8">
                <h3>All Suppliers</h3>
              </div>
              <div className="col-3">
                <Link to="/addsupplier">
                  <button className="btn btn-primary col-12" style={{ backgroundColor: '#6E260E', borderColor: '#6E260E' }}>Add +</button>
                </Link>
              </div>
              <div className="col-1">
                <button
                  className="btn btn-secondary col-12"
                  onClick={() => createPdf(filteredSuppliers)}
                >
                  Generate PDF
                </button>
              </div>
            </div>
            <div className="col-3 ">
              <form action="">
                <div className="p-1 bg-light d-flex rounded rounded-pill shadow-sm mb-4">
                  <div className="input-group">
                    <input
                      type="search"
                      placeholder="Search Supplier"
                      aria-describedby="button-addon1"
                      className="form-control border-0 bg-light"
                      value={searchQuery}
                      onChange={handleSearchChange}
                    />
                    <div className="input-group-append">
                      <button
                        id="button-addon1"
                        type="submit"
                        className="btn btn-link text-primary"
                      >
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Address</th>
                <th scope="col">Contact</th>
                <th scope="col">Products</th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {filteredSuppliers.map((supplier, index) => (
                <tr key={index}>
                  <td>{supplier.name}</td>
                  <td>{supplier.address}</td>
                  <td>{supplier.contact}</td>
                  <td>{supplier.products}</td>
                  <td className="text-danger pt-3">
                    <button
                      className="btn"
                      onClick={() => handleShow(supplier._id)}
                    >
                      <FontAwesomeIcon
                        className="text-danger"
                        icon={faTrash}
                        style={{ fontSize: 25 }}
                      />
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => navigateToEditSupplier(supplier._id)}
                      className="btn btn-link text-success mt-2"
                    >
                      <FontAwesomeIcon icon={faPenToSquare} style={{ fontSize: 25 }} />
                    </button>
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
              <button className="btn btn-secondary" variant="secondary" style={{ backgroundColor: '	#6E260E' }} onClick={handleClose}>
                Close
              </button>
              <button
                className="btn btn-danger"
                variant="danger"
                onClick={removeSupplier}
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

import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from 'react-router-dom';
import {
  faMagnifyingGlass,
  faTrash,
  faUserPlus,
  faFilePdf,
  faPenToSquare,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { PDFDocument, rgb } from "pdf-lib";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Navigation from "../Navigation";
import Footer from "../Footer";

export default function EmployeeList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [employeeToRemove, setEmployeeToRemove] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchEmployees() {
      try {
        const response = await fetch("http://localhost:8070/employee");
        if (response.ok) {
          const data = await response.json();
          setEmployees(data);
          setFilteredEmployees(data);
        } else {
          console.error("Failed to fetch employees");
        }
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    }

    fetchEmployees();
  }, []);

  const pdfBlobRef = useRef(null);

  useEffect(() => {
    if (pdfBlobRef.current) {
      const pdfUrl = URL.createObjectURL(pdfBlobRef.current);

      window.open(pdfUrl);
    }
  }, [pdfBlobRef]);

  const createPdf = async (employeeData) => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([400, 600]);

    const titleSize = 15;
    const textSize = 11;
    const titleColor = rgb(0, 0, 0);
    const textColor = rgb(0, 0, 0);
    const spacing = 10; // Reduce the spacing value to decrease space between lines

    page.drawText('Employee List', {
      x: 50,
      y: 550,
      size: titleSize,
      color: titleColor,
    });

    let y = 520;

    employeeData.forEach((employee) => {
      // Exclude the _v field
      const { _v, ...employeeFields } = employee;

      Object.entries(employeeFields).forEach(([key, value]) => {
        page.drawText(`${key}: ${value}`, {
          x: 50,
          y: y,
          size: textSize,
          color: textColor,
        });
        y -= spacing;
      });

      y -= spacing;
    });

    const pdfBytes = await pdfDoc.save();
    const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });

    const pdfUrl = URL.createObjectURL(pdfBlob);

    window.open(pdfUrl);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);

    if (e.target.value === "") {
      setFilteredEmployees([...employees]);
    } else {
      const filtered = employees.filter((employee) =>
        (employee.fname + " " + employee.lname).toLowerCase().includes(e.target.value.toLowerCase())
      );
      setFilteredEmployees(filtered);
    }
  };

  const handleOpenModal = (employee) => {
    setEmployeeToRemove(employee);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setEmployeeToRemove(null);
    setShowModal(false);
  };
  const navigateToViewEmployee = (supplierId) => {
    navigate(`/viewemployee/${supplierId}`);
  };

  const handleRemoveEmployee = async () => {
    try {
      const response = await fetch(`http://localhost:8070/employee/delete/${employeeToRemove._id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const updatedEmployees = employees.filter(
          (employee) => employee._id !== employeeToRemove._id
        );
        setEmployees(updatedEmployees);
        setFilteredEmployees(updatedEmployees);
        handleCloseModal();
      } else {
        console.error("Failed to remove employee");
      }
    } catch (error) {
      console.error("Error removing employee:", error);
    }
  };

  return (
    <div>
      <Navigation/>
        <div className="container">
          <div className="row mt-5 py-5">
            <div className="col-12 mt-3">
              <div className="row">
                <div className="col-8">
                  <h3>Employee List</h3>
                </div>
                <div className="col-3">
                  <Link to="/addemployee">
                    <button className="btn btn-primary col-12" style={{ backgroundColor: '#6E260E', borderColor: '#6E260E' }}>Add +</button>
                  </Link>
                </div>
                <div className="col-1">
                  <button
                    className="btn btn-secondary col-12"
                    onClick={() => createPdf(filteredEmployees)}
                  >
                    <FontAwesomeIcon icon={faFilePdf} />
                  </button>
                </div>
              </div>

              <div className="col-3">
                <form action="">
                  <div className="p-1 bg-light d-flex rounded rounded-pill shadow-sm mb-4">
                    <div className="input-group">
                      <input
                        type="search"
                        placeholder="Search Employee Name"
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
                  <th scope="col">Employee Id</th>
                  <th scope="col">Employee Name</th>
                  <th scope="col">Position</th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((employee) => (
                  <tr key={employee._id}>
                    <td>{employee._id}</td>
                    <td>{`${employee.fname} ${employee.lname}`}</td>
                    <td>{employee.position}</td>
                    <td>
                      <button className="btn btn-secondary" onClick={() => navigateToViewEmployee(employee._id)}>View</button>
                    </td>
                    <td className="text-danger pt-3">
                      <FontAwesomeIcon
                        icon={faTrash}
                        style={{ fontSize: 25, cursor: "pointer" }}
                        onClick={() => handleOpenModal(employee)}
                      />
                    </td>
                    <td>
                      <Link to={`/editemployee/${employee._id}`}>
                        <FontAwesomeIcon
                          icon={faPenToSquare}
                          className="text-success mt-2"
                          style={{ fontSize: 25 }}
                        />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Confirm Removal</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to remove{" "}
              {`${employeeToRemove?.fname} ${employeeToRemove?.lname}`}?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button variant="danger" onClick={handleRemoveEmployee}>
                Remove
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
        <Footer />
    </div>

  );
}

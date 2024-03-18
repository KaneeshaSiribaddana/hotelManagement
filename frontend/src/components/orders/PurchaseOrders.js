import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faTrash, faUserPlus, faFilePdf, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { PDFDocument, rgb } from 'pdf-lib';

export default function PurchaseOrders() {
    const [searchQuery, setSearchQuery] = useState("");
    const [inquiries, setInquiries] = useState([
        {
            id: "S001",
            reason: "Attendance issue",
            date: "Apr 23, 2023",
            departmentHead: "Mr Samantha Gunasinghe",
            role: "IT",
        },
        {
            id: "S001",
            reason: "Attendance issue",
            date: "Apr 23, 2023",
            departmentHead: "Mr Samantha Gunasinghe",
            role: "IT",
        },
        {
            id: "S001",
            reason: "sdsd issue",
            date: "Apr 23, 2023",
            departmentHead: "Mr Samantha Gunasinghe",
            role: "IT",
        },
        {
            id: "S001",
            reason: "Attendance issue",
            date: "Apr 23, 2023",
            departmentHead: "Mr Samantha Gunasinghe",
            role: "IT",
        },
    ]);

    const pdfBlobRef = useRef(null);

    useEffect(() => {
        if (pdfBlobRef.current) {
            const pdfUrl = URL.createObjectURL(pdfBlobRef.current);

            window.open(pdfUrl);
        }
    }, [pdfBlobRef]);

    const createPdf = async (inquiryData) => {
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([600, 400]);

        // Add the table body
        inquiries.forEach((inquiry, inquiryIndex) => {
            
            page.drawText('Order Id', {
                x: 50,
                y: 350,
                size: 11,
                color: rgb(0, 0, 0),
            });

            page.drawText('Date', {
                x: 150,
                y: 350,
                size: 11,
                color: rgb(0, 0, 0),
            });

            page.drawText('Supplier', {
                x: 250,
                y: 350,
                size: 11,
                color: rgb(0, 0, 0),
            });
            page.drawText('Supplier', {
                x: 450,
                y: 350,
                size: 11,
                color: rgb(0, 0, 0),
            });

            // Add the table body
            inquiries.forEach((inquiry, inquiryIndex) => {
                page.drawText(inquiry.id, {
                    x: 50,
                    y: 320 - (inquiryIndex * 20),
                    size: 12,
                    color: rgb(0, 0, 0),
                });

                page.drawText(inquiry.date, {
                    x: 150,
                    y: 320 - (inquiryIndex * 20),
                    size: 12,
                    color: rgb(0, 0, 0),
                });

                page.drawText(inquiry.reason, {
                    x: 250,
                    y: 320 - (inquiryIndex * 20),
                    size: 12,
                    color: rgb(0, 0, 0),
                });
            });
        });

        // Save the PDF document
        const pdfBytes = await pdfDoc.save();
        const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });

        const pdfUrl = URL.createObjectURL(pdfBlob);

        window.open(pdfUrl);
    };


    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        const filteredInquiries = inquiries.filter((inquiry) => {
            return inquiry.reason.toLowerCase().includes(searchQuery.toLowerCase());
        });

        setInquiries(filteredInquiries);
    };


    return (
        <div className="container">
            <div className="row">
                <div className="col-12 mt-3">
                    <div className="row">
                        <div className="col-8">
                            <h3>In Stock</h3>
                        </div>
                        <div className="col-3">
                            <button className="btn btn-secondary col-12 mb-2" onClick={() => createPdf()}>Generate Report</button>
                            <button className="btn btn-primary col-12"style={{backgroundColor:'#6E260E',borderColor:'#6E260E'}}>Add +</button>
                        </div>
                    </div>

                    <div className="col-3">
                        <form action="">
                            <div className="p-1 bg-light d-flex rounded rounded-pill shadow-sm mb-4">
                                <div className="input-group">
                                    <input
                                        type="search"
                                        placeholder="Search Session"
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
                            <th scope="col">Order Id</th>
                            <th scope="col">Date</th>
                            <th scope="col">Supplier</th>
                            <th scope="col">Item Type</th>
                            <th scope="col">Quantity</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {inquiries.map((inquiry, index) => (
                            <tr key={index}>
                                <td>{inquiry.id}</td>
                                <td>{inquiry.reason}</td>
                                <td>{inquiry.date}</td>
                                <td>{inquiry.departmentHead}</td>
                                <td>
                                    <div className="bg-primary text-light p-3" style={{ width: 'min-content', borderRadius: 20 }}> {inquiry.role}</div>
                                </td>
                                <td className="text-danger pt-3">
                                    <FontAwesomeIcon icon={faTrash} style={{ fontSize: 25 }} />
                                </td>
                                <td>
                                    <FontAwesomeIcon icon={faPenToSquare} className="text-success mt-2" style={{ fontSize: 25 }} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}
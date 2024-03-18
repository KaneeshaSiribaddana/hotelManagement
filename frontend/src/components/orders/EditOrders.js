import React from 'react';

export default function EditOrders() {
    return (
        <div className='container-fluid text-light' style={{ background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 43%, rgba(0,212,255,1) 100%)' }}>
            <div className='container p-5'>
                <h1 className='mt-3'>Edit Order</h1>
                <div className='container'>

                    <form>
                        <div className='row'>
                            <div className='col-12'>
                                <div className="form-group">
                                    <label for="exampleInputEmail1">Id</label>
                                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="" value="sjjsdnjnds"placeholder="" readOnly />
                                </div>
                            </div>
                            <div className='col-6 mt-2'>
                                <div className="form-group">
                                    <label for="exampleInputEmail1">Date</label>
                                    <input type="date" className="form-control" id="exampleInputEmail1" aria-describedby="" placeholder="" />
                                </div>
                            </div>
                            <div className='col-6 mt-2'>
                                <div className="form-group">
                                    <label for="exampleInputPassword1">Supplier</label>
                                    <div className="dropdown">
                                        <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            Select a Supplier
                                        </button>
                                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                            <a className="dropdown-item" href="#">Action</a>
                                            <a className="dropdown-item" href="#">Another action</a>
                                            <a className="dropdown-item" href="#">Something else here</a>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="form-group mt-2">
                            <label for="exampleInputPassword1">Item Type</label>
                            <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter Item Type" />
                        </div>
                        <div className="form-group mt-2">
                            <label for="exampleInputPassword1">Quantity</label>
                            <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter Quantity" />
                        </div>
                        <button type="submit" className="btn col-12 mt-3 mb-5 btn-primary"style={{backgroundColor:'#6E260E',borderColor:'#6E260E'}}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
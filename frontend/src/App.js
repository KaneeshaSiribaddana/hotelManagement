import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddSupplier from './components/supplier/AddSupplier';
import EditSupplier from './components/supplier/EditSupplier';
import Profile from './components/user/Profile';
import ViewAllSuppliers from './components/supplier/ViewAllSuppliers';
import PurchaseOrders from './components/orders/PurchaseOrders';
import CreateOrders from './components/orders/CreateOrders';
import EditOrders from './components/orders/EditOrders';
import Signup from './components/user/Signup';
import Login from './components/user/Login';
import Home from './components/Home';
import EditProfile from './components/user/EditProfile';
import Employee from './components/employee/Employee';
import EmployeeList from './components/employee/EmployeeList';
import AddEmployee from './components/employee/AddEmployee';
import EditEmployee from './components/employee/EditEmployee';
import ViewEmployee from './components/employee/ViewEmployee';
import UserProfile from './components/user/UserProfile';
import UserList from './components/user/UserList';
import Navigation from './components/Navigation';
import Managers from './components/Managers';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/editprofile/" element={<EditProfile />} />
        <Route path="/editsupplier/:id" element={<EditSupplier />} />
        <Route path="/viewallsuppliers" element={<ViewAllSuppliers />} />
        <Route path="/addsupplier" element={<AddSupplier />} />
        <Route path="/purchaseorders" element={<PurchaseOrders />} />
        <Route path="/createorders" element={<CreateOrders />} />
        <Route path="/editorders/:id" element={<EditOrders />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/employeelist" element={<EmployeeList />} />
        <Route path="/addemployee" element={<AddEmployee />} />
        <Route path="/editemployee/:id" element={<EditEmployee />} />
        <Route path="/viewemployee/:id" element={<ViewEmployee />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/userlist" element={<UserList />} />
        <Route path="/managers" element={<Managers />} />
        
      </Routes>
    </BrowserRouter>
  );
}
export default App;

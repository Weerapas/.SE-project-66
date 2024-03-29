import logo from './logo.svg';
import * as React from 'react';

import './App.css';
import { useEffect, useState } from 'react';
import Axios from 'axios'
import Book_shelf from './Component/Book_shelf';
import Navbar from './Component/Navbar.js';

import Layout from './Component/Layout';
import Add_book from './Component/Add_book';
import Manage_book from './Component/Management_book';
import Edit_Book from './Component/Edit_book';
import See_detail from './Component/See_detail';
import Login from './Component/Login';
import Login_state from './Component/Login_state';
import Register_fail from './Component/Reg_fail';
import Register_suc from './Component/Reg_suc';
import Payment from './Component/Payment';
import Contact from './Component/Contact';
import Register from './Component/Register';
import Cart from './Component/Cart';
import Order_history from './Component/Order_history';
import See_order_detail from './Component/See_order_detail';
import Userpage from './Component/Userpage';
import Manage_order from './Component/Manage_order';
import Edit_delivery_ID from './Component/Edit_delivery_ID';
import {
  BrowserRouter,
  Switch,
  Route,
  Routes,
  Redirect,
} from "react-router-dom";




function App() {


  const sessioncheck = () => {
    if (sessionStorage.getItem("login_status") != "true" ){
      sessionStorage.setItem("usernamelogin","null");
      sessionStorage.setItem("login_status","false");
      sessionStorage.setItem("role","null");
      sessionStorage.setItem("Phone","null")
    }

  }

  React.useEffect(() => {
    sessioncheck();
  },[]);

  
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Book_shelf/>} />
          <Route path="Book_shelf" element={<Book_shelf/>} />
          <Route path="Add_book" element={<Add_book/>} />
          <Route path="Manage_book" element={<Manage_book/>} />
          <Route path="Edit_book/:b_ID" element={<Edit_Book/>}></Route>
          <Route path="See_detail/:b_ID" element={<See_detail/>}></Route>
          <Route path="login" element={<Login/>}></Route>
          <Route path="Login_state" element={<Login_state/>}></Route>
          <Route path="Register" element={<Register/>}></Route>
          <Route path="Contact" element={<Contact/>}></Route>
          <Route path="Reg_f" element={<Register_fail/>}></Route>
          <Route path="Reg_s" element={<Register_suc/>}></Route>
          <Route path="Cart" element={<Cart/>}></Route>
          <Route path='Order_history' element={<Order_history/>}></Route>
          <Route path='See_order_detail/:Order_ID' element={<See_order_detail/>}></Route>
          <Route path='Userpage' element={<Userpage/>}></Route>
          <Route path='Payment' element={<Payment/>}></Route>
          <Route path='Manage_order' element={<Manage_order/>}></Route>
          <Route path='Edit_delivery_ID/:Order_ID' element={<Edit_delivery_ID/>}></Route>

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

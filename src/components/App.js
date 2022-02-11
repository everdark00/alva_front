import React, {useState} from "react"
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom'
import {getPosts, create} from '../services/ProductDataService'
import '../styles/Header.css';
import '../styles/Footer.css';
import Main from "../pages/Main"
import Bucket from "../pages/Bucket";
import Product from "../pages/Product";
import Header from "./Header";
import Sale from '../pages/Sale'
import New from '../pages/New'
import OrderAccepted from '../pages/OrderAccepted'
import Footer from "./Footer"

function App() {
  return (
      <div>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Main />}></Route>
            <Route path="/sale" element={<Sale />}></Route>
            <Route path="/new" element={<New />}></Route>
            <Route path="/product/:pk" element={<Product/>}></Route>
            <Route path="/bucket" element={<Bucket/>}></Route>
            <Route path="/success" element={<OrderAccepted/>}></Route>
          </Routes>
          <Footer />
        </Router>
      </div>
  )} 


export default App;
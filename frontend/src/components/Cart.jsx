import axios from 'axios'
import NavBar from "./NavBar";
import Footer from './Footer'
import React from "react";
import { MDBCol, MDBFormInline, MDBIcon,MDBInput } from "mdbreact";
import Product from './Product';


export default function Cart(props) {
    
    return (

        <div>
        <NavBar/> 
        <br />
        <br />
    <div className="d-flex justify-content-center">
      <div className="p-2 col-example text-left"><Product/></div>
      <div className="p-2 col-example text-left"><Product/></div>
      <div className="p-2 col-example text-left"><Product/></div>
    </div>
    <div className="d-flex justify-content-center">
      <div className="p-2 col-example text-left"><Product/></div>
      <div className="p-2 col-example text-left"><Product/></div>
      <div className="p-2 col-example text-left"><Product/></div>
    </div>
  
 <div className="d-flex justify-content-center">
 <MDBInput label="Total amount" icon="dollar-sign"className="" />

 </div>

            <Footer/>
 
        </div>
    )
}

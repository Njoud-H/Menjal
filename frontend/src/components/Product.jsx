import React, { useEffect, useState } from 'react'
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBIcon, MDBCol } from 'mdbreact';
import  { Component } from "react";
import { MDBSelect, MDBSelectInput, MDBSelectOptions, MDBSelectOption } from "mdbreact";
import {Link} from 'react-router-dom'
import axios from 'axios'
import {useParams} from 'react-router-dom';


export default function Product(props) {
  console.log(props.role)
return (

<MDBCol style={{ maxWidth: "22rem" }}>
<MDBCard>
  <MDBCardImage className="img-fluid" src={ props.img}
    waves />
  <MDBCardBody>
    <MDBCardTitle>Farm Product</MDBCardTitle>
    Product: {props.name}
            <br/>
            Type: {props.category}
            <br/>
            Quantity: {props.quantity}
            <br/>
            Price: {props.price}
            <br/>

{/* <div>
<select className="browser-default custom-select">
<option>Quantity</option>
<option value="1">1kg</option>
<option value="2">2kg</option>
<option value="3">3kg</option>
</select>
</div> */}
    

{props.role== "farmer"? 
// if farmer

<>
{/* edit */}
  <MDBBtn href= {`/Edit-Product/${props._id}`}
    color="light-green"
    // as={Link} to={`/Edit-Product/${props._id}`}

    ><MDBIcon icon="edit"/></MDBBtn> 
    
{/* delete */}
<MDBBtn href="#" 
    color="light-green"
    // onClick ={()=> }
    ><MDBIcon icon="trash-alt" /></MDBBtn> 

</>
:
  //if customer
<>
{!props.delete ? <>
    {/* fav & cart */}
    <MDBBtn href="#" 
    color="light-green"
    onClick ={()=> props.addMovieTOFavorite(props._id)}
    ><MDBIcon icon="cart-plus" /></MDBBtn> 
     <MDBBtn href="#" color="light-green"><MDBIcon icon="heart" /></MDBBtn>

</>: <>
    {/* UN fav & cart */}
     <MDBBtn href="#"
      color="light-red"
      onClick={()=> props.deleteFavProduct(props._id)}
      ><MDBIcon icon="shopping-cart" /></MDBBtn> 

     <MDBBtn href="#" color="light-red"><MDBIcon icon="minus-circle" /></MDBBtn>
     </>

}

</>
}


  </MDBCardBody>
</MDBCard>
</MDBCol>
  )
}

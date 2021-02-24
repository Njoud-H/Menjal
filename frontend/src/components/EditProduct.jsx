import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from 'mdbreact';
import { useState } from "react";
import axios from 'axios'
import { Component } from "react";
import { MDBSelect } from "mdbreact";
import {useParams} from 'react-router-dom';
 
export default function EditProduct() {
const {id} = useParams()
//const [deletedProduct, setDeletedProduct] = useState([])


const [editedProduct, setEditedProduct] = useState({})
const onChange = ({ target: { name, value } }) => {
  setEditedProduct({ ...editedProduct, [name]: value });
};

const editProduct = (event) => {
  event.preventDefault();
  axios
  .put(`http://localhost:4000/api/product/update/${id}`,editedProduct) //props.productId
  .then(res => {
    console.log(res.data.product)
    setEditedProduct(res.data.product.editedProduct)
  })
  .catch((err) => console.log(err));
};


// data.product

// const deleteProduct = (productId) => {
  
//   let userId = _id
//     axios.delete(`http://localhost:4000/api/product/${userId}/delete/${productId}`)
//     .then(data => {
//          props.setAuth(pre => ({ ...pre, currentUser: { ...pre.currentUser, product: data.data.product } }))
//         console.log(data)
//       }) 
//   setDeletedProduct(product)
//       }) 
// }


  return (
    <MDBContainer>
      <MDBRow className="justify-content-center">
        <MDBCol md="6">
          <form>
            <br />
            <p className="h3 text-center mb-4">Edit a Product</p>

              <label htmlFor="defaultFormNameEx" className="grey-text"> Name </label>
              <input type="Name"
               id="defaultFormNameEx" 
               className="form-control"
               name="name"
                onChange={(e) => onChange(e)} />

            <br />
            
{/* selecter */}
<div>
        <select className="browser-default custom-select" name="category" onChange={(e) => onChange(e)}>
          <option>Category</option>
          <option value="Grain">Grain</option>
          <option value="Dates">Dates</option>
          <option value="Fruit">Fruit</option>
          <option value="Vegetable">Vegetable</option>
        </select>
      </div>


            <br />
              <label htmlFor="defaultFormImgEx" className="grey-text"> Image </label>
              <input type="Img" id="defaultFormImgEx" className="form-control" name="image" onChange={(e) => onChange(e)} />
             
            <br />
              <label htmlFor="defaultFormPriceEx" className="grey-text"> Price </label>
              <input type="Price" id="defaultFormPriceEx" className="form-control" name="price" onChange={(e) => onChange(e)}/>

             
              <div className="text-center py-4 mt-3">
                <MDBBtn color="light-green" className="btn btn-light-green" type="submit" onClick={editProduct}> Edit Product </MDBBtn>
              </div>
          </form>

        </MDBCol>
      </MDBRow>
    </MDBContainer>
  )
}

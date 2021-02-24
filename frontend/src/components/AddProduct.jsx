
import React, { useState, useEffect } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from 'mdbreact';
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function AddProduct(props) {
const history = useHistory();

const [product, setProduct] = useState({}); // product info

console.log("pro user info ", props.auth.currentUser);
const userId= props.auth.currentUser._id;
  //to add the input inside product
  const onChangeInput = ({ target: { name, value } }) => {
    setProduct({ ...product, [name]: value });
console.log("onchange",product)
  };

  //dropdaon
  const onChangeDropdown = ({ target: { name, innerHTML } }) => {
    setProduct({ ...product, [name]: innerHTML });
console.log("onchange",product)
  };

  // to add the product info to database
  const onSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:4000/api/product/product", { ...product, userId })
      .then((res) => {
        const product = res.data.product;
        console.log("product added in DB")
        history.push("/FarmOwner")
      })
      .catch((err) => console.log(err));
  };

    return (
    <MDBContainer>
    <MDBRow className="justify-content-center">
      <MDBCol md="6">
        <form>
        <br />
          <p className="h3 text-center mb-4">Add a Product</p>
          <label htmlFor="defaultFormNameEx" className="grey-text">
           Name
          </label>
          <input type="Name" 
          id="defaultFormNameEx" 
          className="form-control"
          name="name"
          onChange={(e) => onChangeInput(e)}
          />
          
          <br />

          <label htmlFor="defaultFormCategoryEx" className="grey-text">
              Category
             </label>
           {/* selecter */}
<div>
        <select className="browser-default custom-select" name="category" onChange={(e) => onChangeInput(e)}>
          <option>Category</option>
          <option value="Grain">Grain</option>
          <option value="Dates">Dates</option>
          <option value="Fruit">Fruit</option>
          <option value="Vegetable">Vegetable</option>
        </select>
      </div>

             <br />

          <label htmlFor="defaultFormImgEx" className="grey-text">
           Image
          </label>
          <input type="Img"
          id="defaultFormImgEx"
          className="form-control"
          name="image"
          onChange={(e) => onChangeInput(e)}/>
          
             <br />

          <label htmlFor="defaultFormPriceEx" className="grey-text">
          Price
          </label>
          <input type="Price"
          id="defaultFormPriceEx"
          className="form-control"
          name="price"
          onChange={(e) => onChangeInput(e)}/>
          
          <div className="text-center py-4 mt-3">
          <MDBBtn color="light-green"
          className="btn btn-light-green"
          type="submit"
          onClick={(e) => onSubmit(e)}>
            Add Product
          </MDBBtn>

          </div>
        </form>

      </MDBCol>
    </MDBRow>
  </MDBContainer>
 )
}

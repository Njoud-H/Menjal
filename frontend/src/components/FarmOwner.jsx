
import React, { useState, useEffect } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import Cart from "./Cart";
import axios from "axios";
import Product from './Product';
import { useHistory } from "react-router-dom";

export default function FarmOwner(props)
{
  const history = useHistory();
  const [user, setUser] = useState({}); // user info

  console.log("oner  info ", props.auth.currentUser);
  const {name, _id , farmName, farmDescription, farmLocation, product , role} = props.auth.currentUser;
  //console.log(farmName)
  //console.log("role from oner",role)

  //to add the input inside user
  const onChangeInput = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };
  // to add the user info to database
  const onSubmit = (event) => {
    event.preventDefault();
    axios
      .put(`http://localhost:4000/api/user/update/${_id}`, user)
      .then((res) => {
        const user = res.data.user;
        console.log("farm info added in DB")
        // if (user) {
        //   history.push("/login");
        // } else {
        //   setTimeout(() => {
        //     setRegister(false);
        //   }, 1000);
        // }
      })
      .catch((err) => console.log(err));
  };

  const [products , setProducts] = useState([])
//console.log("product :",products)
  useEffect(() => {
    axios.get(`http://localhost:4000/api/user/${_id}`)   
     .then(res =>{     
      setProducts(res.data.msg.product)
      console.log("product data",res.data.msg.product)
       })
       .catch((err)=>{console.log(err)})
    }, [])
    


  const allFarmerProducts = products.map((ele)=>{
    return <Product 
    category={ele.category} name={ele.name} img={ele.image} price={ele.price} quantity={ele.quantity} _id={ele._id} 
    role={role}/>
})  


    return (
               <MDBContainer>
              <MDBRow className="justify-content-center">
                <MDBCol md="6">
                <h1 className="h2 text-center mb-4">Hello {name}</h1>
                {/* { props.data && */}
                <>
                {farmName===null && farmDescription===null &&  farmLocation===null ?

                <>
                  <form>
                  <br />
                    

                    <p className="h5 text-center mb-4 ">Please, add your Farm information</p>
                    <label 
                    htmlFor="defaultFormNameEx" className="grey-text">
                     Name
                    </label>
                    <input 
                    type="Name"
                    id="defaultFormNameEx"
                    className="form-control" 
                    name="farmName"
                    onChange={(e) => onChangeInput(e)}/>
                    
                    <br />

                    <label htmlFor="defaultFormLocationEx" className="grey-text">
                      Location
                    </label>
                    <input type="Location"
                    id="defaultFormLocationEx" 
                    className="form-control"
                    name="farmLocation"
                    onChange={(e) => onChangeInput(e)}/>

                    <br />

                    <label htmlFor="defaultFormDescriptionEx" className="grey-text">
                     Description
                    </label>
                    <input type="Description" 
                    id="defaultFormDescriptionEx" 
                    className="form-control" 
                    name="farmDescription"
                    onChange={(e) => onChangeInput(e)}/>
            
                    <MDBBtn  className="btn btn-light-green darken-2-text" type="submit"
                    onClick={(e) => onSubmit(e)}

                    >
                      Save
                    </MDBBtn>    

                  
                  </form>
                  
                  </> : <>

                  <div className="text-center py-4 mt-3">
                  <MDBBtn className="btn btn-light-green darken-2-text"
                   type="submit"
                  onClick={() => history.push("/Add-Product")}
                   >
                    Add Product
                  </MDBBtn>   </div>
                  </>

}
</>
{/* } */}
                  <br />

  {/* USER PRODUCTS LIST */}
                  <br />
                  <div className="d-flex justify-content-center">
                  {allFarmerProducts} 
</div>
              <br/><br/><br/>


                </MDBCol>
              </MDBRow>
            </MDBContainer>
    )
}
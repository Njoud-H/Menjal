import NavBar from "./NavBar";
import Footer from './Footer'
import React, { useEffect, useState } from 'react'
import { MDBCol, MDBFormInline, MDBIcon } from "mdbreact";
import Product from './Product';
import Axios from 'axios'


export default function Customer(props) {
  // const [products , setProducts] = useState([])
  // //console.log("product :",products)

  // useEffect(() => {
  // Axios.get('http://localhost:4000/api/product')   
  //  .then(res =>{     
  //   setProducts(res.data.msg)
  //   //console.log("product data",res.data.msg)
  //    })
  // }, [])

/* ==== To GET data From DB as an Array ====  */
  const allProducts = props.products.map((char)=>{
    return <Product category={char.category} name={char.name} img={char.image} price={char.price} quantity={char.quantity} _id={char._id} />
})  

 


    return (
      
  //       <div>
  //       <NavBar/> 
  //       <div className="d-flex justify-content-center">

  //   <MDBCol md="6" >
  //     <MDBFormInline className="md-form d-flex justify-content-center  light-green-text " >
  //       <MDBIcon icon="search " />
  //       <input className="form-control form-control-sm ml-3 w-75  " type="text" placeholder="Search" aria-label="Search" />
  //     </MDBFormInline>
  //   </MDBCol>
  //   </div>

  //   <div className="d-flex justify-content-center">
  //     <div className="p-2 col-example text-left">
  //     {allProducts}      
  // </div>
  //   </div>
  //   </div>


<div>
<NavBar/> 
<div className="d-flex justify-content-center">

<MDBCol md="6" >
<MDBFormInline className="md-form d-flex justify-content-center  light-green-text " >
<MDBIcon icon="search " />
<input className="form-control form-control-sm ml-3 w-75  " type="text" placeholder="Search" aria-label="Search" />
</MDBFormInline>
</MDBCol>
</div>
<div className="d-flex justify-content-center">
{allProducts}   
</div>

<br/>
<br/>
<br/>
    <Footer/>

</div>



    )
}

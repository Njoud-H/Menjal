import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { Route, Redirect } from "react-router-dom";
import Product from "./Product"

import axios from 'axios'

export default function FavoriteProduct(props) {
  const [favProducts , setFavProducts] = useState([])
  const { favoriteProducts, _id } = props.auth.currentUser;
 // console.log(favoriteProduct)
  useEffect(() => {
    axios.post('http://localhost:4000/api/product/favorite')
      .then(data => {
        console.log("the fav data",data);
        let filterProduct = data.data.filter(Product => favoriteProducts.includes(Product._id))

        setFavProducts(filterProduct)
      })

  }, [favProducts])

 //add favorite porduct
  const addMovieTOFavorite = (productId) =>{
  console.log("productId = ", productId)
  console.log("userId = ", _id )
  axios.post('http://localhost:4000/api/product/favorite' , {ProductId: productId ,  userId: _id })
  .then(data =>{
    console.log("the fav data",data);
      // data.favoriteProduct
      localStorage[_id] = JSON.stringify(data.data.favoriteProducts)
      console.log(data)
  })

}  

  const deleteFavProduct = (productId) => {
    let userId = _id
    
    axios.delete(`http://localhost:4000/api/product/${userId}/fav/${productId}`)
      .then(data => {
        props.setAuth(pre => ({ ...pre, currentUser: { ...pre.currentUser, favoriteProducts:
           data.data.favoriteProducts 
          } }))
        console.log(data)

      })
      setFavProducts(favoriteProducts)

  }

  const allfavoriteProducts = favProducts.map(product => 
  <Product deleteFavProduct={deleteFavProduct} addMovieTOFavorite={addMovieTOFavorite} product={product} delete={true} />)
  return <> 
    <h1> favorite Product : </h1>

    <Container>
      <Row >
        {allfavoriteProducts}
      </Row>

    </Container>
  </>

}


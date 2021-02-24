import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import'bootstrap-css-only/css/bootstrap.min.css';
import'mdbreact/dist/css/mdb.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from './components/Home'
import SignIn from './components/SignIn'
/* import Product from './components/Product'; */
import FarmOwner from './components/FarmOwner';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import EditProduct from './components/EditProduct';
import AddProduct from './components/AddProduct';
import Profile from './components/Profile';
import Customer from './components/Customer';
import Cart from './components/Cart';
import FavoriteProduct from './components/FavoriteProduct';
import axios from "axios";

import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
function App() {
//STATES
const [selectProduct, setSelectProduct] = useState({});
const [dataLoading, setDataloading] = useState(false)
const [auth, setAuth] = useState({ currentUser: null, isLoggedIn: false });
const userLogin = () => {
let currentUser = ""
  if (localStorage.jwtToken) {
    const jwtToken = localStorage.jwtToken;
    currentUser = jwt_decode(jwtToken, "SECRET").user;
   // console.log(currentUser)
    setAuth({ currentUser, isLoggedIn: true });
  } else {
    setAuth({ currentUser: null, isLoggedIn: false });
  }
  setDataloading(true)
  return currentUser.role
  console.log("The current User is: ", auth.currentUser);
};
useEffect(userLogin, []);

// get product
const [products , setProducts] = useState([])
//console.log("product :",products)

useEffect(() => {
axios.get('http://localhost:4000/api/product')   
 .then(res =>{     
  setProducts(res.data.msg)
  //console.log("product data",res.data.msg)
   })
}, [])

return (
  <div className="">


    { dataLoading &&
      <Router>
          {/* <Switch> */}
          {auth.isLoggedIn ?
          <>
          { auth.currentUser.role==="farmer" ?
           <>
            <Route path = "/Edit-Product/:_id"> 
            <NavBar isLoggedIn={auth.isLoggedIn} loginCallback={userLogin}/>
              <EditProduct/>
              <Footer />
            </Route>
            
            <Route path = "/Add-Product"> 
            <NavBar isLoggedIn={auth.isLoggedIn} loginCallback={userLogin}/>
            <AddProduct 
            setAuth={setAuth} //delete
            auth = {auth}/>
            <Footer />
            </Route>

            
            {/*<Route path = "/Product">
              <Product />
            </Route> */}
           
            <Route path = "/FarmOwner">
              <NavBar isLoggedIn={auth.isLoggedIn}  loginCallback={userLogin}
              data={dataLoading}/>
                            <FarmOwner 
                setAuth={setAuth} 
                auth = {auth} 
                products={products}/>
                <Footer />
            </Route> 
            
            </>
            :
            <>
            <Route path="/Customer"> 
              <Customer 
              setAuth={setAuth} 
              auth = {auth}
              products={products} />
            </Route>



            <Route path="/Cart"> 
              <Cart />  
            </Route> 

            <Route path="/FavoriteProduct"> 
              <FavoriteProduct 
              setAuth={setAuth} 
              auth = {auth} />  
            </Route>

{/* edit profile farmer & customer */}
            <Route path = "/Profile">
              <NavBar isLoggedIn={auth.isLoggedIn} loginCallback={userLogin} />
              <Profile />     
              <Footer />
            </Route>
            </>
          }
            </> : <></>
               }

              <Route exact path = "/">
              <Home />
              </Route>

              <Route exact path = "/SignIn">
              <NavBar isLoggedIn={auth.isLoggedIn} loginCallback={userLogin}/>
              <SignIn auth = {auth} loginCallback={userLogin} />
              <Footer />
            </Route>

            {/* </Switch> */}
      </Router>
    }
  </div>
  )
}
export default App;
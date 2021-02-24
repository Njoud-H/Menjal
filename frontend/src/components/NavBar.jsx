import React from "react";
import { Button, Nav, Navbar }  from "react-bootstrap";
import  {Link} from "react-router-dom";
import { useHistory } from "react-router-dom";
import  { Fragment } from "react";
import { MDBBtn } from "mdbreact";

export default function NavBar(props) {
  const history = useHistory();


  return (
    <div >
      
    <h1 className="text-center mt-4 mb-4 light-green-text font-weight-bold ">Menjal</h1>
    <Nav className="justify-content-end " activeKey="/home"></Nav>
    <Nav variant="tabs" defaultActiveKey="/home">
    <Nav.Item>
      <Nav.Link as={Link} to="/"className=" light-green-text ">Home</Nav.Link>
    </Nav.Item>
  
    {!props.isLoggedIn ? <> 
    <Nav.Item>
    <Nav.Link as={Link} to="/signIn"className=" light-green-text ">SignIn</Nav.Link>
    </Nav.Item>

    <Nav.Item>
    <Nav.Link as={Link} to="/profile"className=" light-green-text ">Profile</Nav.Link>
    </Nav.Item>
    </>: <>
    <Nav.Item>
    <MDBBtn outline color="light-green"
 
            onClick={() => {
              console.log("Logging Out!");
              localStorage.removeItem("jwtToken");
              props.loginCallback();
              history.push("/")
              // to="/login"
            }}> Logout
     </MDBBtn>
    </Nav.Item>
    </> }
 
  </Nav>
 </div>
  )
}
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router , useHistory} from 'react-router-dom';
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBMask,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBBtn,
  MDBView,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBFormInline,
  MDBAnimation,
  Alert
} from 'mdbreact';
import '../ClassicFormPage.css';
import Footer from './Footer'
import axios from "axios";
// import  {Link} from "react-router-dom";

//import { useHistory } from "react-router-dom";

export default function Home () {
// class ClassicFormPage extends React.Component {
    const [collapseID, setCollapseID] = useState('')
//   state = {
//     collapseID: ''
//   };

   
  const toggleCollapse = collapseID => () => {
    setCollapseID(prevState => prevState.collapseID !== collapseID ? collapseID : '')
  }
    // this.setState(prevState => ({
    //   collapseID: prevState.collapseID !== collapseID ? collapseID : ''
    // }));

    useEffect(()=>{document.querySelector('nav').style.height = '65px';}, [])
  // componentDidMount() { 
  //   document.querySelector('nav').style.height = '65px';
  // }

//     useEffect(() =>() =>{document.querySelector('nav').style.height = 'auto';
// }, [])
  // componentWillUnmount() {
  //   document.querySelector('nav').style.height = 'auto';
  // }

  // transfer
  const history = useHistory();

  const [user, setUser] = useState({}); // user info
  const [register, setRegister] = useState(true); // to show aleart

  //to add the input inside user
  const onChangeInput = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };
  // to add the user info to database
  const onSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:4000/api/user/signup", user)
      .then((res) => {
        const user = res.data.user;
        if (user) {
            console.log("user logined in ")
            history.push("/SignIn");
        } else {
          setTimeout(() => {
            setRegister(false);
          }, 1000);
        }
      })
      .catch((
            err) => console.log(err));
  };
// transfer


    
    const overlay = (
      <div
        id='sidenav-overlay'
        style={{ backgroundColor: 'transparent' }}
        onClick={toggleCollapse('navbarCollapse')}
      />
    );

    
    return (
      <>
      {!register && (
        <Alert variant={"danger"}>
          The email is already in use. Please change the email
        </Alert>
      )}
      <div id='classicformpage'>
        <Router>
          <div>
            <MDBNavbar
              dark
              expand='md'
              scrolling
              fixed='top'
              style={{ marginTop: '10px' }}
            >
              <MDBContainer>
                <MDBNavbarToggler
                  onClick={toggleCollapse('navbarCollapse')}
                />
                <MDBCollapse id='navbarCollapse' isOpen={collapseID} navbar>
                  <MDBNavbarNav left>
                    <MDBNavItem active>
                      <MDBNavLink to='/'>Home</MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                      <MDBNavLink to='/SignIn'>LogIn</MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>

               {/* ==== Profile + SignOut */}
                  {/*     <MDBNavLink to='#!'>Profile</MDBNavLink> 
                      <MDBNavLink to='#!'>LogOut</MDBNavLink> */}

                    </MDBNavItem>
                  </MDBNavbarNav>
                  <MDBNavbarNav right>
                    <MDBNavItem>
                      <MDBFormInline waves>
 
                      </MDBFormInline>
                    </MDBNavItem>
                  </MDBNavbarNav>
                </MDBCollapse>
              </MDBContainer>
            </MDBNavbar>
            {collapseID && overlay}
          </div>
        </Router>

        <MDBView>
          <MDBMask className='d-flex justify-content-center align-items-center gradient' />
          <MDBContainer
            style={{ height: '100%', width: '100%', paddingTop: '10rem' }}
            className='mt-5  d-flex justify-content-center align-items-center'
          >
            <MDBRow>
              <MDBAnimation
                type='fadeInLeft'
                delay='.3s'
                className='white-text text-center text-md-left col-md-6 mt-xl-5 mb-5'
              >
                <h1 className='h1-responsive font-weight-bold'>
                  Menjal
                </h1>
                <hr className='hr-light' />
                <h6 className='mb-4'>
                Join US! and buy directly from a farm, with showing a brief description of the history of the farm and its profitable location.
                </h6>
  
              </MDBAnimation>

              <MDBCol md='6' xl='5' className='mb-4'>
                <MDBAnimation type='fadeInRight' delay='.3s'>
                  <MDBCard id='classic-card'>
                    <MDBCardBody className='white-text'>
                      <h3 className='text-center'>
                        <MDBIcon /> Register 
                      </h3>
                      <hr className='hr-light' />

                
                      <MDBInput 
                        className='white-text'
                        iconClass='white-text'
                        label='Your name'
                        icon='user' 
                        size="2x"
                        name="name"
                        onChange={(e) => onChangeInput(e)} 
                      />
                      <MDBInput
                        className='white-text'
                        iconClass='white-text'
                        label='Your email'
                        icon='envelope'
                        size="2x"
                        name="email"
                        onChange={(e) => onChangeInput(e)}
                      />
                      <MDBInput
                        className='white-text'
                        iconClass='white-text'
                        label='Your password'
                        icon='lock'
                        type='password'
                        size="2x"
                        name="password"
                        onChange={(e) => onChangeInput(e)}
                      />

<div className =" d-flex justify-content-center">
<MDBFormInline >
                      <MDBInput
        name="selectedRole" value="farmer"
          label='Farm Owner'
          type='radio'
          id='radio1'
          containerClass='mr-5'
          onChange={(e) => onChangeInput(e)} 
        />
        <MDBInput 
       name="selectedRole" value="customer"
          label='Customer'
          type='radio'
          id='radio2'
          containerClass='mr-9'
          onChange={(e) => onChangeInput(e)} 
/>
</MDBFormInline >
</div>
                      <div className='text-center mt-4 black-text'>
                        <MDBBtn icon="paper-plane" color='white' onClick={(e) => onSubmit(e)}>Sign Up
                        <MDBIcon far icon="paper-plane" className="ml-2" />
                        </MDBBtn>
                      </div>
                    </MDBCardBody>
                  </MDBCard>
                </MDBAnimation>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </MDBView>

        <Footer />
      </div> </>
    );
  }



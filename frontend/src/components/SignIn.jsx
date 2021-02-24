
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBIcon , MDBAnimation, MDBInput} from 'mdbreact';
import axios from "axios";

export default function SignIn(props) {
  const history = useHistory();
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const onChangeInput = (event) => {
    const { name, value } = event.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:4000/api/user/login", credentials)
      .then((res) => {
        console.log("Express backend /login response", res);

        const token = res.data.token;
        const msg = res.data.msg;

        if (token) {
          localStorage.setItem("jwtToken", token);
          let role = props.loginCallback();
            // console.log(props.auth.currentUser)
            (role ==="farmer")?
              history.push("/FarmOwner")
            : history.push("/Customer")
          // console.log("user logged in");
          
        } else {
          console.log("Login error: ", msg);
        }
      });
  };
    return (
      
 <MDBContainer>
                     <br />
                  <br />
                  <br />
<MDBRow className="justify-content-center">
<MDBCol md='6' xl='5' className='mb-4'>
                <MDBAnimation type='fadeInRight' delay='.3s'>
                  <MDBCard id='classic-card'>
                    <MDBCardBody className='black-text'>
                    <h3 className="text-center mt-4 mb-4 black-text font-weight-bold ">Loggin</h3>
                      <hr className='light-green darken-2' />

                      <MDBInput
                        className='black-text'
                        iconClass='black-text'
                        label='Your email'
                        icon='envelope'
                        size="2x"
                        name= "email"
                        onChange={(e) => onChangeInput(e)}
                      />
                      <MDBInput
                        className='black-text'
                        iconClass='black-text'
                        label='Your password'
                        icon='lock'
                        type='password'
                        size="2x"
                        name= "password"
                        onChange={(e) => onChangeInput(e)}
                      />
                      <div className='text-center mt-4 black-text'>
                        <MDBBtn icon="paper-plane" color='white' onClick={(e) => onSubmit(e)}>Sign In
                        <MDBIcon far icon="paper-plane" className="ml-2" />
                        </MDBBtn>
                      </div>

                    </MDBCardBody>
                  </MDBCard>
                  <br />

                </MDBAnimation>
              </MDBCol>
</MDBRow>
</MDBContainer>

);
};
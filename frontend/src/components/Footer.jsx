import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter, MDBIcon } from "mdbreact";


export default function Footer() {
    return (
      <MDBFooter color="light-green darken-3" className="font-small pt-4 mt-9 bottom ">
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
          <MDBCol md="6">
            <h5 >Developed By:</h5>
            <ul>
              <li> Mashael almutiri</li>
              <li>   Njoud Haddad</li>
              <li>Fidaa Alshaikh</li>
              <li> Mariam Ghazwani</li>
                  </ul>
          </MDBCol>
          <MDBCol>
            <h5 className="title">Connect Us </h5>

            <a href="#!" className="tw-ic mr-3">
        <MDBIcon fab icon="twitter" size="2x"/>
      </a>
            
      <a href="#!" className="ins-ic mr-3">
        <MDBIcon fab icon="instagram" size="2x"/>
      </a>
     
      <a href="#!" className="email-ic mr-3">
        <MDBIcon icon="envelope" size="2x"/>
      </a>

          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright: <a href="https://www.mdbootstrap.com">Green Team </a>
        </MDBContainer>
      </div>
    </MDBFooter>
  );
}
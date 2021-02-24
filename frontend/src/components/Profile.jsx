
/*import React, { useState } from "react";
import { useHistory } from "react-router-dom"; 
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import { Token } from "react-router-dom";

export default function Profile() {
   const history = useHistory();
  const [fields, handleFieldChange] = useFormFields({
    password: "",
     oldPassword: "",
  });
    const [isChanging, setIsChanging] = useState(false);

async function handleChangeClick(event) {
    event.preventDefault();
    setIsChanging(true);

    try {
      const currentUser = await token.currentAuthenticatedUser();
      await token.changePassword(
        currentUser,
     fields.oldPassword,
        fields.password
      );

      history.push("/profile");
    } catch (error) {
      onError(error);
      setIsChanging(false);
    }
  }
/*
    return (
        <MDBContainer>
       <MDBRow className="justify-content-center">
         <MDBCol md="6">
           <form>
           <br />
             <p className="h3 text-center mb-4">Edit The Profile</p>
             <label htmlFor="defaultFormNameEx" className="grey-text">
              Name
             </label>
             <input type="Name" id="defaultFormNameEx" className="form-control" />
             
             <br />

             <label htmlFor="defaultFormEmailEx" className="grey-text">
              Email
             </label>
             <input type="Email" id="defaultFormEmailEx" className="form-control" />

             <br />

              <label htmlFor="defaultFormPasswordEx" className="grey-text">
              Old Password
             </label>
              <input 
             type="Password" id="defaultFormDPasswordEx" className="form-control"
            onChange={handleFieldChange}
            value={fields.oldPassword}
              />

             <br />

             <label htmlFor="defaultFormPasswordEx" className="grey-text">
              New Password
             </label>
         <input type="Password" id="defaultFormDPasswordEx" className="form-control" />
            onChange={handleFieldChange}
            value={fields.password} 

               <div className="text-center py-4 mt-3">
     <MDBBtn color="light-green" className="btn btn-light-green" type="submit">
       Save
     </MDBBtn>
             </div>
           </form>

         </MDBCol>
       </MDBRow>
     </MDBContainer>
)
}
*/
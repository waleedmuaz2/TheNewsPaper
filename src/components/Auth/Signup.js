import React, { useState } from 'react';
import {
  MDBContainer,
  MDBInput,
  MDBBtn,
}
from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import { post } from '../../helpers/handleAPI';

function SignUp() {
  const navigate  = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
      });
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
      const handleSubmit = async (e) => {
          e.preventDefault();
          let response = await post(formData,'/auth/signup');
          if(response!==undefined && response.status===200){
            navigate('/login');
          }
      };
  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <MDBInput wrapperClass='mb-4' onChange={handleChange} label='Name' name='name' id='name' type='text'/>
          <MDBInput wrapperClass='mb-4' onChange={handleChange} label='Email address' name='email' id='email' type='email'/>
          <MDBInput wrapperClass='mb-4' onChange={handleChange} label='Password' id='form2' name='password' type='password'/>
          <MDBInput wrapperClass='mb-4' onChange={handleChange} label='Confirm Password' name='password_confirmation' id='confirm_password' type='password'/>
          <MDBBtn className="mb-4" color='outline-black'>Register</MDBBtn>
          <div className="text-center">
            <p>Already member ?</p>
                <Link to={'/login'}>
                    <MDBBtn color='black'>
                        Login
                    </MDBBtn>
                </Link>
          </div>
      </form>

    </MDBContainer>
  );
}

export default SignUp;
import React, { useState } from 'react';
import {
  MDBContainer,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
}
from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAuthToken } from '../../actions/authActions';
import { post } from '../../helpers/handleAPI';
import { useNavigate  } from 'react-router-dom';

function Login() {
  const dispatch = useDispatch();
  const navigate  = useNavigate();
    const [formData, setFormData] = useState({
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
          let response = await post(formData,'/auth/login');
          if(response!==undefined && response.status===200){
            localStorage.setItem('token',response.data.access_token)
            dispatch(setAuthToken(response.data.access_token));
            navigate('/news');
          }
      };


  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
      <MDBInput wrapperClass='mb-4' onChange={handleChange} name='email' label='Email address' id='form1' type='email'/>
      <MDBInput wrapperClass='mb-4' label='Password' name='password' onChange={handleChange} id='form2' type='password'/>
      <div className="d-flex justify-content-between mx-3 mb-4">
        <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
      </div>
      <MDBBtn className="mb-4" color='outline-black'>Sign in</MDBBtn>
      <div className="text-center">
        <p>Not a member ?</p>
            <Link to={'/register'}>
                <MDBBtn color='black'>
                    Register
                </MDBBtn>
            </Link>
      </div>
      </form>
    </MDBContainer>
  );
}

export default Login;
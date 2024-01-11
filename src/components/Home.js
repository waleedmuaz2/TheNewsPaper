import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
const Home = () => {
  return (
    <MDBContainer className="d-flex align-items-center justify-content-center vh-100">
      <MDBRow>
        <MDBCol md="12" className="text-center">
          <h1>Welcome to <span className='text-secondary'>My NewsPaper</span></h1>
          <p color='green'>Choose an option to continue:</p>
          <Link to="/login" className='link'>
            <MDBBtn color='black' className="mr-2">
                Login
            </MDBBtn>
          </Link>
          <Link to="/register" className='link'>
            <MDBBtn color='outline-black'>
              Register
            </MDBBtn>
          </Link>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Home;

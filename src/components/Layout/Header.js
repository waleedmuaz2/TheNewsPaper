import React, { useState } from 'react';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse,
  MDBInput,
  MDBBtn,
} from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import { setSearchQuery } from './../../actions/newsAction';
import { useDispatch } from 'react-redux';


export default function Header() {
  const [openBasic, setOpenBasic] = useState(false);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(search);  
    dispatch(setSearchQuery(search));
    navigate('/news')
  };
 

  return ( 
    <MDBNavbar expand='lg' light bgColor='light'>
      <MDBContainer fluid>
        <MDBNavbarBrand>
          My-NewsPaper
        </MDBNavbarBrand>
        <MDBNavbarToggler
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setOpenBasic(!openBasic)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar open={openBasic}>
          <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
            <MDBNavbarItem>
              <Link to="/news">
                <MDBNavbarLink active aria-current='page' className='mt-1'>
                  <b>News</b>
                </MDBNavbarLink>
              </Link>
            </MDBNavbarItem>
            <MDBNavbarItem >
            <form onSubmit={handleSubmit} className='d-flex ml-auto'>
              <MDBInput hint="Search..."  value={search} onChange={(e) => setSearch(e.target.value)} type="text" className="mt-0 mb-0" />
              <MDBBtn color='black' type='submit' ><MDBIcon fas icon="search" className='fs-5' /></MDBBtn>
            </form>
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}
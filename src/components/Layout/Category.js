import { MDBBtn } from 'mdb-react-ui-kit';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setSearchCategory } from '../../actions/newsAction';
const Category = (props) => {
  const dispatch = useDispatch();

  const onClickHandle = (event) => {
    console.log(event.target.value)
    dispatch(setSearchCategory(event.target.value));
  };


  return (
    <MDBBtn onClick={onClickHandle} value={props.name} className="mb-4 me-1" color='outline-black'>
        {props.name}
    </MDBBtn>
  );
};

export default Category;

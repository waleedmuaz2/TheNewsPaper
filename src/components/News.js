import { MDBCol, MDBContainer, MDBRow } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react';
import DividerHeader from './Layout/DividerHeader';
import ArticleBox from './Article';
import { get } from '../helpers/handleAPI';
import Category from './Layout/Category';
import { useSelector } from 'react-redux';

const News = () => {
  const [newsList, setnewList] = useState([]);
  const [shotList, setshotList] = useState([]);
  const [categoriesList, setcategoriesList] = useState([]);
  const searchQuery = useSelector((state) => state.search.searchQuery);
  const searchCategory = useSelector((state) => state.search.searchCategory);

  const newsAPI = async () => {
    let token = localStorage.getItem('token');
    let url = "/news/list"; 
    if(searchQuery && searchQuery!==""){
        url = `/news/list?keyword=${searchQuery}`;
    }
    else if(searchCategory){
        url = `/news/list?category=${searchCategory}`;
    }
    let response = await get(url,token);
    if(response!==undefined && response.status===200){
      setshotList(response.data.shots);
      setnewList(response.data.article);
      setcategoriesList(response.data.categories);
    }
};
useEffect(() => {
 newsAPI();
}, [searchQuery,searchCategory]);


  return (

    <MDBContainer className="container mt-5 vh-100">
      {categoriesList.map((data,index) => (                
        <Category name={data.name} key={index} />        
      ))}
      <MDBRow>
      <MDBCol md="8">
        <DividerHeader title={'Recent'} icon={'accusoft'}/>
        {newsList.map((data,index) => (                
            <div className="d-flex align-items-start bg-body-tertiary mb-3" key={index}>
            <ArticleBox news={data} />
            </div>
        ))}


      </MDBCol>
      <MDBCol md="4">
        <DividerHeader title={'Shots'} icon={"shopware"}/>
        {shotList.map((data,index) => (
          <div className="d-flex align-items-start bg-body-tertiary mb-3" key={index}>
            <ArticleBox news={data}/>
          </div>
        ))}
      </MDBCol>
    </MDBRow>
    </MDBContainer>
  );
};

export default News;

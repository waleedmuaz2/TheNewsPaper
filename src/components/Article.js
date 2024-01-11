import { MDBCard, MDBCardBody, MDBCardImage, MDBCardLink, MDBCardSubTitle, MDBCardText, MDBCardTitle, MDBCol, MDBFooter } from 'mdb-react-ui-kit';
import React from 'react';
const Article = (props) => {
const defaultImage= "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg";
  return (
        <MDBCol>
            <MDBCard>
                <MDBCardBody>
                    <MDBCardTitle>{props.news.title??"-"}</MDBCardTitle>
                    <MDBCardSubTitle>Published by: <b>{props.news.category.name??"-"}</b> Soruce - <i>{props.news.data_source.name}</i></MDBCardSubTitle>
                    <MDBCardImage src={(props.news.url_to_image)?props.news.url_to_image:defaultImage} height={150} width={250}>
                    </MDBCardImage>
                    <MDBCardText>{props.news.description??"-"}</MDBCardText>
                    {(props.news.url)?<MDBCardLink href={props.news.url} className='btn'>Read More</MDBCardLink>:""}
                    <MDBFooter className='mt-3'>Published at: <b>{props.news.published_at}</b></MDBFooter>
                </MDBCardBody>
            </MDBCard>
        </MDBCol>
  );
}
  export default Article;
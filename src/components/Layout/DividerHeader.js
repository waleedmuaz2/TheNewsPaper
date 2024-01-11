import { MDBIcon } from 'mdb-react-ui-kit';
import React from 'react';
const DividerHeader = (props) => {
  return (
        <div className='dividerHeader'>
            <MDBIcon fab icon={(props.icon)?props.icon:'accusoft'} />
            <span>{(props.title)?props.title:"-"}</span>
            <hr className='dividerLine'/>
        </div>
  );
};

export default DividerHeader;

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const post = async (param=[],url="",callback="") => {
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL+url}`,{
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body:JSON.stringify(param)
    },
    );
    statusManager(response);
    return await response.json();
}

const get = async (url="",token) => {

    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL+url}`,{
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        'Authorization':'Bearer '+token 
        },
    },
    );
    statusManager(response);
    return await response.json();
}
const statusManager = (response)=>{
    const MySwal = withReactContent(Swal)
    let text="";
    if(response!==undefined){
        if(response.status===401){
            text="Unauthorize";
            return MySwal.fire(text)
        }else if(response.status===422){
            text='Fields are requird';
            return MySwal.fire(text)
        }else if(response.status===400){
            text="Token expire";
            logout();
            return MySwal.fire(text)
        }
        return true;
    }else{
        return MySwal.fire("Somthing went wrong")
    }
}
const logout = ()=>{
    localStorage.removeItem('token');
}
export {
    get,
    post
}
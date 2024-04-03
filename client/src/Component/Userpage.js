import * as React from 'react';
import Axios from 'axios';
import { useState } from 'react';
import { Link ,useParams,useNavigate} from 'react-router-dom';
import "../Styles/Userpage.css";

export default function Userpage() {
    const [username,setusername] = useState("");
    // const [Last_name,setLast_name] = useState("");
    // const Phone = sessionStorage.getItem("Phone");
    const navigate = useNavigate();

    const getuserinfo = () =>{
        Axios.post('http://localhost:3001/Get_user',{
            username : username
        }).then((Response) => {
            setusername(Response.data[0].username);
        });
    }
    const logout = () =>{
      sessionStorage.setItem("usernamelogin","null");
      sessionStorage.setItem("login_status","false");
      sessionStorage.setItem("role","null");
      navigate('/login', { replace: true });
      window.location.reload(false);
    }

    React.useEffect(() => {
        getuserinfo()
    },[]);

    return(
        <div className='Userinfobg'>
  
            <h1>User Infomation</h1>

            <div className='Userinfocontainer'>
                    <p>Username : {username}</p>
            </div>
            <div className='LogoutButton'>
                <Link to={'/login'}><button className="button-29" onClick={logout}>Logout</button></Link>
                
            </div>
            
        </div>

    );


}
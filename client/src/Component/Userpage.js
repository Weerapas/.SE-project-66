import * as React from 'react';
import Axios from 'axios';
import { useState } from 'react';
import { Link ,useParams,useNavigate} from 'react-router-dom';
import "../Styles/Userpage.css";

export default function Userpage() {
    const [username,setusername] = useState("");
    const [Role,setRole] = useState("");
    // const Phone = sessionStorage.getItem("Phone");
    const navigate = useNavigate();

    const getuserinfo = () =>{
        Axios.post('http://localhost:3001/Get_user',{
            username : sessionStorage.getItem("usernamelogin")
        }).then((Response) => {
            console.log(Response.data[0])
            setusername(Response.data[0].Username);
            if(Response.data[0].role == "godEE"){
                setRole("admin");
            }
            else{
                setRole(Response.data[0].role);
            }
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
            <div className='Userinfocontainer'>
                    <p>Role : {Role}</p>
            </div>
            <div className='LogoutButton'>
                <Link to={'/login'}><button className="button-29" onClick={logout}>Logout</button></Link>
                
            </div>
            
        </div>

    );


}
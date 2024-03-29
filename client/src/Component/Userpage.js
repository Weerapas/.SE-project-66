import * as React from 'react';
import Axios from 'axios';
import { useState } from 'react';
import { Link ,useParams,useNavigate} from 'react-router-dom';
import "../Styles/Userpage.css";

export default function Userpage() {
    const [Fist_name,setFist_name] = useState("");
    const [Last_name,setLast_name] = useState("");
    const Phone = sessionStorage.getItem("Phone");
    const navigate = useNavigate();

    const getuserinfo = () =>{
        Axios.post('http://localhost:3001/Get_user',{
            Phone : Phone
        }).then((Response) => {
            setFist_name(Response.data[0].Fist_name);
            setLast_name(Response.data[0].Last_name);

        });
    }
    const logout = () =>{
        sessionStorage.setItem("usernamelogin","null");
      sessionStorage.setItem("login_status","false");
      sessionStorage.setItem("role","null");
      sessionStorage.setItem("Phone","null")
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
                    <p>ชื่อ : {Fist_name}</p>
            </div>
            <div className='Userinfocontainer'>
                    <p>นามสกุล : {Last_name}</p>
            </div>
            <div className='Userinfocontainer'>
                    <p>เบอร์โทร : {Phone}</p>
            </div>
            <div className='LogoutButton'>
                <Link to={'/login'}><button className="button-29" onClick={logout}>Logout</button></Link>
                
            </div>
            
        </div>

    );


}
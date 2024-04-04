import * as React from "react";
import Axios from "axios";
import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import "../Styles/login.css";

export default function Register(){
    const [username,setusername] = useState("");
    const [phone,setPhone] = useState("");
    const [password,setpassword] = useState("");
    const navigate = useNavigate();

    const addcustomer =()=>{
        Axios.post('http://localhost:3001/Register',{
            username : username,
            phone : phone,
            password : password
        }).then( (Response) =>{ 
            if (Response.data === "Values inserted"){
                navigate('/Reg_s', { replace: true });
            }else{
                navigate('/Reg_f', { replace: true });
            }
           
        })
    }
    

    return(
        <body>
        <div className="box" >
         <div class="form">
         <form ></form>
            <div class='topic'>SIGN UP</div>
            <div className='text'>Username : </div>
                      <input
                          type='text'
                          placeholder='Enter Username'
                          onChange={(event) =>{
                            setusername(event.target.value)
                          }}  
                      />

            <div className='text'>Phone Number : </div>
                      <input
                          type='text'
                          
                          placeholder='Enter Phone Number'
                          onChange={(event) =>{
                            setPhone(event.target.value)
                          }}  
                      />

            <div className='password'  >Password : </div>
                      <input
                          type='password'
                          
                          placeholder='Enter password'
                          onChange={(event) =>{
                            setpassword(event.target.value)
                          }}  
                      />

            <Link to="/"><button onClick={addcustomer}> Sign up</button></Link>

            <p class="message">Already register? <a href="login">Login</a></p>
        </div>
        </div>
        </body>
    );
}
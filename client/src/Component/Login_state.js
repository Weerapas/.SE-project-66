import * as React from 'react';
import Axios from 'axios';
import { useState } from 'react';
import {  Link, useParams,useNavigate } from 'react-router-dom';

export default function Login_state(){
    const navigate = useNavigate();
    

    const getuserlogin = () => {
       
        return sessionStorage.getItem("usernamelogin");
      };

      const getloginstatus = () => {
        
        return sessionStorage.getItem("login_status");
      };

      const check_login = () =>{
        if(getloginstatus() == "true"){
            return(
                <body className="box">
             <div class="form">
          <form className="loginbox"></form>
          <div className="topic">LOGIN SUCCES</div>
           <button onClick={()=>{
            if (sessionStorage.getItem("role") == "admin"){
                navigate('/Manage_book', { replace: true });
            }else{
              navigate('/Book_shelf', { replace: true });
            }
            
            
            window.location.reload(false);
            
                }}>Continue</button>
        </div> 
        </body>

            );
        }else{
            return(
               

                    // <h2>LOGIN FAIL</h2>
                     <body className="box">
        <div class="form">
          <form className="loginbox"></form>
          <div className="topic">LOGIN FAIL</div>
          
         

            <Link to={"/login"}><button>Try again</button></Link>
            <br></br>
            
          <p class="message">
            Not registered? <a href="Register">Create an account</a>
          </p>
        
        </div> 
        </body>
                    // { <Link to={"/login"}><button>Try again</button></Link>
                    // <Link to={"/Register"}><button>Sign up</button> </Link> }
                
            );
        }

      }




    return(
        <div>
            {check_login()}
        </div>

    );



}
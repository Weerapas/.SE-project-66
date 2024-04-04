import * as React from "react";
import Axios from "axios";
import { useState } from "react";
import { useNavigate  } from "react-router-dom";
// import speakeasy from 'speakeasy';

// const generateSecret = () => {
//   return speakeasy.generateSecret({ length: 20 });
// };

// const secret = generateSecret();
// const otpauthURL = speakeasy.otpauthURL({
//   secret: secret.ascii,
//   label: 'MyApp',
//   issuer: 'MyCompany',
// });

// Use otpauthURL to generate a QR code and display it for the user to scan

import "../Styles/login.css";

export default function Sing_up() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  

  const set_session_login_true = (r,n) => {
    //saving username to session storage
    sessionStorage.setItem("usernamelogin", n);
    sessionStorage.setItem("login_status", "true");
    sessionStorage.setItem("role",r)
    // sessionStorage.setItem("Phone",phone)

    setTimeout(() => {
      sessionStorage.setItem("usernamelogin","null");
      sessionStorage.setItem("login_status","false");
      sessionStorage.setItem("role","null");
      // sessionStorage.setItem("Phone","null")

    }, 7200000);//2gr timeout
  };

  const requst_login = () => [
    Axios.post("http://localhost:3001/requst_login", {
      username: username,
      password: password,
    }).then((Response) => {
      if (Response.data[0] == "succes") {
        console.log(Response.data[1][0])
        set_session_login_true(Response.data[1][0].Role, Response.data[1][0].Username);
      } else {
        sessionStorage.setItem("usernamelogin","null"); 
        sessionStorage.setItem("login_status","false");
        sessionStorage.setItem("role","null");
      }
      navigate('/Login_state', { replace: true });
    }),
  ];

  return (
      <body className="box">
        <div class="form">
          <form className="loginbox"></form>
          <div className="topic">LOGIN</div>
          <div className="text">username : </div>
          <input
            type="text"
            placeholder="Enter username"
            onChange={(event) => {
              setusername(event.target.value);
            }}
          />

          <div className="password">Password : </div>
          <input
            type="password"
            placeholder="Enter password"
            onChange={(event) => {
              setpassword(event.target.value);
            }}
          />

         
            <button onClick={requst_login} > login</button>
          
          <p class="message">
            Not registered? <a href="Register">Create an account</a>
          </p>
        
        </div> 
        </body>
    
  );
}
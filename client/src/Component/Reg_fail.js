import * as React from 'react';
import Axios from 'axios';
import { useState } from 'react';
import {  Link, useParams } from 'react-router-dom';

export default function Register_fail(){
   

    return(
        <div>
             <body className="box">
        <div class="form">
          <form className="loginbox"></form>
          <div className="topic">REGISTER FAIL</div>
          
         

            <Link to={"/Register"}><button>Try again</button></Link>
            
            
            <p class="message">Already register? <a href="login">Login</a></p>
        
        </div> 
        </body>
        </div>

    );



}
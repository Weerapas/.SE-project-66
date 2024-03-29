import * as React from 'react';
import Axios from 'axios';
import { useState } from 'react';
import {  Link, useParams } from 'react-router-dom';

export default function Register_suc(){
   

    return(
        <div>
             <body className="box">
        <div class="form">
          <form className="loginbox"></form>
          <div className="topic">REGISTER SUCCES</div>
          
         

            <Link to={"/login"}><button>Continue</button></Link>
        
        </div> 
        </body>
        </div>

    );



}
import * as React from 'react';
import Axios from 'axios';
import { useState } from 'react';
import {  Link, useParams } from 'react-router-dom';
import '../Styles/Sign.css'


export default function Sign_up(){
    return(
        <body>
        <div >
         <div class="form-sign">
         <form ></form>
        
            <div class='topic'>SIGN UP</div>
            <div className='text'>First Name : </div>
                      <input
                          type='text'
                          
                          placeholder='Enter First Name'
                          onChange={(event) =>{
                            
                          }}  
                      />
            <div className='text'>Last Name : </div>
                      <input
                          type='text'
                          
                          placeholder='Enter Last Name'
                          onChange={(event) =>{
                            
                          }}  
                      />
            <div className='text'>Phone Number : </div>
                      <input
                          type='text'
                          
                          placeholder='Enter Phone Number'
                          onChange={(event) =>{
                            
                          }}  
                      />

            <div className='password'  >Password : </div>
                      <input
                          type='password'
                          
                          placeholder='Enter password'
                          onChange={(event) =>{
                            
                          }}  
                      />

            <Link to="/"><button > Sign up</button></Link>

            <p class="message">Already register? <a href="Login">Login</a></p>
        </div>
        </div>
        </body>
    );
}
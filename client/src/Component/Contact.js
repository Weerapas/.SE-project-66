import Axios from 'axios';
import { useState } from 'react';
import { Link ,useParams} from 'react-router-dom';
import '../Styles/Contact.css';
import {FaLine} from "react-icons/fa";
export default function Contact() {
    return (
        <div class="headerbg">
        <div class="container">
            <div class="information">
                <a  href="#">แอด ไลน์กันเลย</a>
            </div>

            <div class="QR_code">
              <img 
                  src="https://drive.google.com/uc?export=view&id=1J0RVrMiGMFOcLVT_oqDMQGFl8qHi9gop"
                  alt=""
                  >
              </img>   
            </div>              
        </div> 
      </div> 
    );
}
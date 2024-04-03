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
                <a  href="#">ติดต่อสอบถาม โทร  </a>
                <a> 0989898989</a>
            </div>
            
            <div class="information">
                <a> หน้าร้านเปิดทุกวันเวลา 8:00am - 10:00pm  </a>
            </div>
        
        </div> 
    </div>
    );
}
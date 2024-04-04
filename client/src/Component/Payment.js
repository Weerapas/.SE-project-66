import * as React from "react";
import Axios from "axios";
import "../Styles/Payment.css";
import { useState } from 'react';
import { FaArrowCircleDown } from "react-icons/fa";
import {  useNavigate } from 'react-router-dom';
export default function Payment() {

  const username = sessionStorage.getItem("usernamelogin");

  const [total,settotal] = useState(0);
  const order_id = sessionStorage.getItem("order_temp")
  const [Des,setDes] = useState("")
  const navigate = useNavigate();
  

  const sum_total = () => {
    Axios.post('http://localhost:3001/Sum_total',{
        username : username
    }).then((Response) =>{
        settotal(parseInt(Response.data[0].totalprice))
    }

    )
  }
  sum_total()

  const confirm_order_by_cus = () =>{
    Axios.post('http://localhost:3001/confirm_order_by_cus',{

      username : username,
      Des : Des
    }).then((Response) =>{
      navigate('/Confirm', { replace: true });
    }

    )
  }

  


  return (
    <body className="Payment">
      <div className="Payment-box">
        <div className="Payment-container">
          <div className="QR-code-payment">
            <img
              src="https://drive.google.com/uc?export=view&id=12rY9SoI4CCH3PN4JDaG4EMPy-j6icIs7"
              alt=""
            ></img>

            <div className="price">
              <p>ราคาสุทธิ {total} THB</p>

              {/* <p className="text-red">
                *หมายเหตุ กรุณาส่งสลิปไปที่ <FaArrowCircleDown />{" "}
                
              </p> */}


              <a href="https://line.me/R/ti/p/@030eokii">@030eokii</a>
            </div>
          </div>
        </div>

        <div class="form_des_info">
          <p>เลขออเดอร์ : {order_id}</p>
          <p>ที่อยู่</p>
         
          <input type="text" placeholder="กรอกที่อยู่ของท่าน" onChange={(event) =>{
              setDes(event.target.value)
          }}/>
          <button className="button-28" onClick={() =>{
            confirm_order_by_cus()
          }}>ยืนยันข้อมูล</button>
          
        </div>
      </div>
    </body>
  );
}

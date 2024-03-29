import * as React from "react";
import Axios from "axios";
import { useState } from "react";
import { useNavigate,useParams  } from "react-router-dom";
import "../Styles/login.css";

export default function Edit_delivery_ID() {
  const [deliid,setdelid] = useState("");
  const { Order_ID } = useParams();
  const navigate = useNavigate();

  const Edit_delivery_ID_db = () =>{
    Axios.post('http://localhost:3001/Set_delivery',{
          deliid : deliid,
          Order_ID : Order_ID
        }).then((Response) => {
          navigate('/Manage_order', { replace: true });
        });
  }

  return (
      <body className="box">
        <div class="form">
          <form className="loginbox"></form>
          <div className="topic">เลขพัสดุ</div>
          
          <input
            type="text"
            placeholder="ใส่เลขพัสดุ"
            onChange={(event) => {
              setdelid(event.target.value);
            }}
          />
            <button onClick={Edit_delivery_ID_db} > ยืนยัน</button>

          
        
        </div> 
        </body>
    
  );
}
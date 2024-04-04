import * as React from 'react';
import Axios from 'axios';
import { useState } from 'react';
import { Link ,useParams} from 'react-router-dom';
import "../Styles/Cart.css";

export default function Order_history() {

    const [Orderlist,setOrderlist] = useState([]);
    const username = sessionStorage.getItem("usernamelogin")
    

    const getOrderlist = () =>{
        console.log(username)
        Axios.post('http://localhost:3001/History',{
            username : username
        }).then((Response) => {
            console.log(Response.data)
            setOrderlist(Response.data);
        });
    }

  
    getOrderlist();
    return (
        <div >
            <div >
            <div className='Cart-container'>
                             <div className='item_top'>
                             <p>หมายเลขออเดอร์</p>
                             </div>
                             <div className='item_top'>
                             <p>ราคา</p>
                             </div>
                 
                             <div className='item_top'>
                                 <p>สถานะการโอน</p>
                             </div>
                 
                             <div className='item_top'>
                                 <p>สถานะ</p>
                             </div>
                 
                             <div className='item_top'>
                 
                            
                             </div>
                                 </div>
            {Orderlist.map((val, key) =>{
            return (
            <div className='Cart-container'>
            <div className='item_bookid'>
                <p>{val.OrderID}</p>
            </div>
            <div className='item_bookname'>
                 <p>{val.TotalPrice}</p>
            </div>
            <div className='item_BookType'>
                {Boolean(val.status) ? "เสร็จสิ้น":"ค้างชำระ"}
            </div>
            
            <div className='item_button'>
                <Link to={"/See_order_detail/"+val.OrderID}>
                    <button className="button-28" >รายละเอียด</button>
                </Link> 
            </div>
                </div>


        )})}
        
            </div>
           



        </div> 
    );
}
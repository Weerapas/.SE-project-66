import * as React from 'react';
import Axios from 'axios';
import { useState } from 'react';
import { Link ,useParams} from 'react-router-dom';
import "../Styles/Cart.css";

export default function Order_history() {
    const [booklist,setbooklist] = useState([]);
    const Phone =sessionStorage.getItem("Phone")
    

    const getBooklist = () =>{
        Axios.post('http://localhost:3001/History',{
            Phone : Phone
        }).then((Response) => {
            setbooklist(Response.data);
        });
    }

  
    getBooklist();
    return (
        <div >
            <div >
                <div className='Cart-container'>
                    <div className='item_top'>
                    <p>หมายเลขออเดอร์</p>
                    </div>
                    <div className='item_top'>
                    <p>เลขพัสดุ</p>
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
            {
            booklist.map((val, key) =>{return (
            <div className='Cart-container'>
                <div className='item_bookid'>
                    <p>{val.Order_ID}</p>
                </div>
                
                <div className='item_bookname'>
                    <p>{val.Derivery_ID}</p>
                </div>
                
                <div className='item_bookname'>
                    <p>{val.Slip_status}</p>
                </div>
                
                <div className='item_BookType'>
                    <p>{val.Order_Status}</p>
                </div>

                <div className='item_button'>
                    <Link to={"/See_order_detail/"+val.Order_ID}>
                        <button className="button-28" >รายละเอียด</button>
                    </Link> 
                </div>
            </div>
            )})
            }
            </div>
        </div> 
    );
}
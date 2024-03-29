import * as React from 'react';
import Axios from 'axios';
import { useState } from 'react';
import { Link ,useParams} from 'react-router-dom';
import "../Styles/Cart.css";

export default function Manage_order() {
    const { Order_ID } = useParams();
    const [orderlist,setorderlist] = useState([]);
    const Phone =sessionStorage.getItem("Phone")
    

    const getorderlist = () =>{
        Axios.post('http://localhost:3001/Order_manange',{
            Phone : Phone
        }).then((Response) => {
            setorderlist(Response.data);
        });
    }
    const set_slip_status_to_confirm = (order) =>{
        Axios.post('http://localhost:3001/Set_slip_true',{
            order : order
        }).then(() =>{
            
        })
    }

    const cancel_order = (order) =>{
        Axios.post('http://localhost:3001/Cancel_order',{
            order : order
        }).then(() =>{
            
        })
    }
    

  
    getorderlist();
    return (
        <div >
            <div >
            <div className='Cart-container'>
                             

                             <div className='item_top'>
                             <p>Order ID</p>
                             </div>
                             <div className='item_top'>
                             <p>Derivery ID</p>
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
            {orderlist.map((val, key) =>{
            return (
            <div className='Cart-container'>
                            

            <div className='item_bookid'>
           
            <p>{val.Order_ID}</p>
            </div>

            <div className='item_bookname'>
                <p>{val.Derivery_ID}</p>
                <Link to={"/Edit_delivery_ID/"+val.Order_ID}>
                    <button className="button-28" >แก้ไข</button>
                </Link> 
            </div>

            <div className='item_bookname'>
                 <p>{val.Slip_status}</p>
                 <Link to={"/Manage_order"}>
                    <button className="button-28" onClick={() =>{set_slip_status_to_confirm(val.Order_ID)}}>ยืนยัน</button>
                </Link> 
                    
            </div>

            <div className='item_BookType'>
                
                <p>{val.Order_Status}</p>
            </div>
            

            <div className='item_button'>
                <Link to={"/See_order_detail/"+val.Order_ID}>
                                            <button className="button-28" >รายละเอียด</button>
                </Link> 
                <Link to={"/Manage_order"}>
                    <button className="button-29" onClick={() =>{cancel_order(val.Order_ID)}}>ยกเลิก</button>
                </Link> 
            
            </div>
                </div>


        )})}
        
            </div>
           


        </div> 
    );
}
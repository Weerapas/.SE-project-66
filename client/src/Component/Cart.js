import * as React from 'react';
import Axios from 'axios';
import { useState } from 'react';
import { Link ,useParams} from 'react-router-dom';
import "../Styles/Cart.css";

export default function Cart() {
    const [booklist,setbooklist] = useState([]);
    const [total,settotal] = useState(0);
    const Phone =sessionStorage.getItem("Phone")
    sessionStorage.setItem("order_temp",0)
    

    const getBooklist = () =>{
        Axios.post('http://localhost:3001/Requst_cart',{
            Phone : Phone
        }).then((Response) => {
            setbooklist(Response.data);
            sum_total();
        });
    }

    React.useEffect(() => {
        getBooklist();
      },[]);
    

    const del_cart = (cart_id) =>{
        Axios.post('http://localhost:3001/Delete_cart',{
            cart_id : cart_id
        }).then(
            getBooklist()
        )
    }

    const sum_total = () => {
        Axios.post('http://localhost:3001/Sum_total',{
            Phone : Phone
        }).then((Response) =>{
            console.log(Response.data[0].totalprice)
            settotal(parseInt(Response.data[0].totalprice))
        }
           
        )
    }

    const add_order = () => {
        Axios.post('http://localhost:3001/delet_bad_order',{
            Phone : Phone
        }).then()
        Axios.post('http://localhost:3001/add_order',{
            Phone : Phone
        }).then((Response) =>{
            console.log(Response.data[0].Order_ID)
            sessionStorage.setItem("order_temp",Response.data[0].Order_ID)
        }
        )
    }

    
    

    return (
        <div >
            <div >
            <div className='Cart-container'>
                             

                             <div className='item_top'>
                             <p></p>
                             </div>
                             <div className='item_top'>
                             <p>ชื่อ</p>
                             </div>
                 
                             <div className='item_top'>
                                 <p>จำนวน</p>
                             </div>
                 
                             <div className='item_top'>
                                 <p>ราคา</p>
                             </div>
                 
                             <div className='item_top'>
                 
                            
                             </div>
                                 </div>
            {booklist.map((val, key) =>{
            return (
            <div className='Cart-container'>
                            <div className='item_img'>
            <img src={"https://drive.google.com/uc?export=view&id="+val.Book_Pic} alt=""></img>
            </div>

            <div className='item_bookid'>
           
            <p>{val.Book_Name}</p>
            </div>

            <div className='item_bookname'>
                
                <p>{val.quantity}</p>
            </div>

            <div className='item_BookType'>
                
                <p>{val.total}</p>
            </div>

            <div className='item_button'>

            <button className="button-delete" onClick={() => {
                del_cart(val.id)
            }}>Delete</button>
            </div>
                </div>




        )})}
         <div className='Cart-container'>
                             

            <div className='item_bookid'>
            <p>Total</p>
            </div>
            <div className='item_bookid'>
            <p></p>
            </div>

            <div className='item_bookname'>
                <p></p>
            </div>

            <div className='item_BookType'>
                <p>{total}</p>
            </div>

            <div className='item_button'>
            <Link to={'/Payment'}><button className="button-payment" onClick={add_order}>Payment</button></Link>
            
            </div>
                </div>
            </div>
           


        </div> 
    );
}
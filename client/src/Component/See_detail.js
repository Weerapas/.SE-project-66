import * as React from 'react';
import Axios from 'axios';
import { useState } from 'react';
import {  Link, useParams } from 'react-router-dom';
import '../Styles/See_detail.css'
import { ImCart } from "react-icons/im";

export default function See_detail(){

    const { b_ID } = useParams();
    const [booklist, setbooklist] = useState([]);
    const [bookQ,setbookQ] = useState(0);
    const [book_temp,setbook_temp] = useState(1);
    const Phone = sessionStorage.getItem("Phone");
    

    const postBooklist = () => {
       
        Axios.post('http://localhost:3001/Requst_book_somebook', { b_ID }).then((Response) => {
            setbooklist(Response.data[0]);
            setbookQ(Response.data[0].Book_Quantity);
        });
        
    }
    React.useEffect(() => {
        postBooklist()
        
    },[]);

    const addcart = () =>{
        const total = booklist.Book_Price*book_temp;
        Axios.post('http://localhost:3001/Add_to_cart',{
            b_ID : b_ID,
            book_temp : book_temp,
            Phone : Phone,
            total : total
        }).then()
    }
        const increaseValue = () =>{
            if (book_temp < bookQ){
                setbook_temp(book_temp+1)
                
            }
            
        }

        const decreaseValue = () =>{
            if (book_temp > 1){
                setbook_temp(book_temp-1)
                
            }
           
        }

    const check =() => {
        if (bookQ > 0){

            
            if (sessionStorage.getItem("login_status") == "true"){
                return(
                    <div> <div class='valueform'>
                    <button class="value-button" id="decrease" onClick={decreaseValue}>-</button>
                    <input type="number" id="number" 
                    defaultValue={book_temp}
                    value={book_temp}
                    onChange={(event) =>{
                        setbook_temp(parseInt(event.target.value))
                        if (book_temp < 0 ){
                            setbook_temp(1)
                        }
                        if (parseInt(event.target.value) > bookQ){
                            setbook_temp(bookQ)
                        }
                        
                    }}  />
                    <button class="value-button" id="increase" onClick={increaseValue} >+</button>
                </div>
                    <Link to={'/Book_shelf'}><button className='bt-buy' onClick={addcart}>สั่งซื้อ <ImCart/></button></Link>
                    </div>
                );
            }else {
                return(
                    <div> <div class='valueform'>
                    <button class="value-button" id="decrease" onClick={decreaseValue}>-</button>
                    <input type="number" id="number" 
                    defaultValue={book_temp}
                    value={book_temp}
                    onChange={(event) =>{
                        setbook_temp(parseInt(event.target.value))
                        if (book_temp < 0 ){
                            setbook_temp(1)
                        }
                        if (parseInt(event.target.value) > bookQ){
                            setbook_temp(bookQ)
                        }
                        
                    }}  />
                    <button class="value-button" id="increase" onClick={increaseValue} >+</button>
                </div>
                    <Link to={'/login'}><button className='bt-buy' onClick={addcart}>สั่งซื้อ <ImCart/></button></Link>
                    </div>
                );
            }
            
        }else{
            return(
                <p>Out of stock</p>
            );
        }
    };


    return(
        <body class="See_detali">
        <div class="content_detali">

            <div class="img_detali">
                 <img src={"https://drive.google.com/uc?export=view&id="+booklist.Book_Pic} alt=""></img>
            </div>
            
            <div class="text_detali">
                <h1 >{booklist.Book_Name}</h1>
                <p>{booklist.Book_Detail}</p>
                <br></br>
                <h1>ราคา : {booklist.Book_Price} THB</h1>
                {check()}

            </div>              
        </div> 

      </body> 
        
    );

}
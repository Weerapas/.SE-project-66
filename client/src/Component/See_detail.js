import * as React from 'react';
import Axios from 'axios';
import { useState } from 'react';
import {  Link, useParams } from 'react-router-dom';
import '../Styles/See_detail.css'
import { ImCart } from "react-icons/im";

export default function See_detail(){


    const { PID } = useParams();
    const [Product, setProduct] = useState([]);
    const [bookQ,setbookQ] = useState(0);
    const [amount,setamount] = useState(1);
    const Phone = sessionStorage.getItem("Phone");
    

    const postProduct = () => {
       
        Axios.post('http://localhost:3001/Requst_one_product', { PID }).then((Response) => {
            setProduct(Response.data[0]);
            // setbookQ(Response.data[0].Book_Quantity);

        });
        
    }
    React.useEffect(() => {

        postProduct()

        
    },[]);

    const addcart = () =>{

        // const total = Product.Price*amount;
        Axios.post('http://localhost:3001/Add_to_cart',{
            PID : PID,
            amount : amount,
            username : sessionStorage.getItem("usernamelogin"),
            // total : total
        }).then()
    }
    const increaseValue = () =>{
            setamount(amount+1)
    }

    const decreaseValue = () =>{
        if (amount > 1){
            setamount(amount-1)
        }
    }

    const check =() => {
        if (Product.available != false){

            if (sessionStorage.getItem("login_status") == "true"){
                return(
                    <div> <div class='valueform'>
                    <button class="value-button" id="decrease" onClick={decreaseValue}>-</button>

                    <input type="number" id="number"
                    defaultValue={amount}
                    value={amount}
                    onChange={(event) =>{
                        setamount(parseInt(event.target.value))
                        if (amount < 0 ){
                            setamount(1)
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

                    defaultValue={amount}
                    value={amount}
                    onChange={(event) =>{
                        setamount(parseInt(event.target.value))
                        if (amount < 0 ){
                            setamount(1)
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

                 <img src={"https://drive.google.com/uc?export=view&id="+Product.Book_Pic} alt=""></img>
            </div>
            
            <div class="text_detali">
                <h1 >{Product.Book_Name}</h1>
                <p>{Product.Book_Detail}</p>
                <br></br>
                <h1>ราคา : {Product.Book_Price} THB</h1>

                {check()}

            </div>              
        </div> 

      </body> 
        
    );

}
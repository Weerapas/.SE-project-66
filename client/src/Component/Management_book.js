import * as React from 'react';


import Axios from 'axios';
import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import '../Styles/gridbox.css'




export default function Manage_book() {
    const navigate = useNavigate();

    
    const [booklist,setbooklist] = useState([]);
    

    const getBooklist = () =>{
        Axios.get('http://localhost:3001/Requst_book').then((Response) => {
            setbooklist(Response.data);
        });
    }
    getBooklist();

    const Delete_book = (b_ID) =>{
        Axios.post('http://localhost:3001/Delete_book',{
            b_ID : b_ID
        }).then( (Response)=>{
            navigate('/Manage_book', { replace: true });
        }
        )
    }

    

    

    

    

    

  return (
    <div className='books'>
        {booklist.map((val, key) =>{
            return (

                 <div className="grid-Box">
                     <div className='books-sell'>
                        <center><img src={"https://drive.google.com/uc?export=view&id="+val.Book_Pic} className='books-sell' /></center>
                         <div className='content'>
                            <br/>
                             <p>Book ID:{val.Book_ID}</p>
                             <p>{val.Book_Name}</p>
                             <p>{val.Book_Type}&nbsp;&nbsp;{val.Book_Price}$</p>
                         </div>
                          <Link to={'/Edit_book/'+val.Book_ID} >
                            
                            <button className="button-30" >Edit Book</button>
                            </Link> 
 
                            
                            <button className="button-29" onClick={() =>{
                                Delete_book(val.Book_ID)
                            }}>Delete</button> 
                            
                            
                            

                     </div>
                 </div>
                // <img src="../bg.png"/>
            )
        })}
    </div>
  );
}
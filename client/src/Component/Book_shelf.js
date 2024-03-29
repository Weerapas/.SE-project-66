import * as React from 'react';
import Axios from 'axios';
import { useState } from 'react';
import { Link ,useParams} from 'react-router-dom';
import '../Styles/gridbox.css'

export default function Book_shelf() {
    const [booklist,setbooklist] = useState([]);
    

    const getBooklist = () =>{
        Axios.get('http://localhost:3001/Requst_book').then((Response) => {
            setbooklist(Response.data);
        });
    }
    getBooklist();

  
  return (
    <body className='Book_home'>
      <div className="group">
        
        
      </div>
    <div className="books" >
    {booklist.map((val, key) =>{
        return (
           <div className='books-sell'>
                           <img src= {"https://drive.google.com/uc?export=view&id="+val.Book_Pic} alt=""></img>
                                       <p>Book ID:{val.Book_ID}</p>
                                       <p>{val.Book_Name}</p>
                                       <p>{val.Book_Type}&nbsp;&nbsp;{val.Book_Price}$</p>
                                       <Link to={"/See_detail/"+val.Book_ID}>
                                       <button className="button-28" >See detail</button>
                                       </Link> 
            </div>
              
           
             
            
      )})}
      </div>
    </body>
  );
}
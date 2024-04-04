import * as React from 'react';
import Axios from 'axios';
import { useState } from 'react';
import { Link ,useParams} from 'react-router-dom';
import '../Styles/gridbox.css'

export default function Book_shelf() {

    const [ProductList,setProductList] = useState([]);
    

    const getlist = () =>{
        Axios.get('http://localhost:3001/Requst_product').then((Response) => {
            setProductList(Response.data);
        });
    }
    getlist();


  
  return (
    <body className='Book_home'>
      <div className="group">

        
        
      </div>
    <div className="books" >
    {ProductList.map((val, key) =>{
        return (
           <div className='books-sell'>
                           <img src= {"https://drive.google.com/uc?export=view&id="+val.Book_Pic} alt=""></img>
                                       <p>ID:{val.PID}</p>
                                       <p>{val.Pname}</p>
                                       <p>{val.Size}</p>
                                       <p>{val.Price} tbh</p>
                                       <Link to={"/See_detail/" + val.PID}>
                                       <button className="button-28" >See detail</button>
                                       </Link> 
            </div>
              
           
             

      )})}
      </div>
    </body>
  );
}
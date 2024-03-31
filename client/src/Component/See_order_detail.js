import * as React from "react";
import Axios from "axios";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../Styles/Cart.css";

export default function See_order_detail() {
  const { Order_ID } = useParams();
  const [booklist, setbooklist] = useState([]);
  const [destination, setdestination] = useState("");
  const Phone = sessionStorage.getItem("Phone");
  const [total, settotal] = useState(0);

  const getBooklist = () => {
    Axios.post("http://localhost:3001/History_Detail", {
      Order_ID: Order_ID,
    }).then((Response) => {
      setbooklist(Response.data);
      sum_total();
      Requst_Destination();
    });
  };

  const sum_total = () => {
    Axios.post("http://localhost:3001/Sum_total_bill", {
      Order_ID: Order_ID,
    }).then((Response) => {
      console.log(Response.data[0].totalprice);
      settotal(parseInt(Response.data[0].totalprice));
    });
  };
  const Requst_Destination = () => {
    Axios.post("http://localhost:3001/Requst_order", {
      Order_ID: Order_ID,
    }).then((Response) => {
      setdestination(Response.data[0].Destination);
    });
  };

  getBooklist();
  return (
    <div>
      <div>
        <div className="Cart-container">
          <div className="item_top">
            <p></p>
          </div>
          <div className="item_top">
            <p>ชื่อ</p>
          </div>

          <div className="item_top">
            <p>จำนวน</p>
          </div>

          <div className="item_top">
            <p>ราคา</p>
          </div>

          <div className="item_top"></div>
        </div>
        {booklist.map((val, key) => {
          return (
            <div className="Cart-container">
              <div className="item_img">
                <img
                  src= {"https://drive.google.com/uc?export=view&id="+val.Book_Pic}
                  alt=""
                ></img>
              </div>

              <div className="item_bookid">
                <p>{val.Book_Name}</p>
              </div>

              <div className="item_bookname">
                <p>{val.quantity}</p>
              </div>

              <div className="item_BookType">
                <p>{val.total}</p>
              </div>

              <div className="item_button"></div>
            </div>
          );
        })}
        <div className="Cart-container-des">
          <p>{destination}</p>
        </div>

        <div className="Cart-container">
          <div className="item_bookid">
            <p>ยอดรวม</p>
          </div>
          <div className="item_bookid">
            <p></p>
          </div>

          <div className="item_bookname">
            <p></p>
          </div>

          <div className="item_BookType">
            <p></p>
          </div>

          <div className="item_button">
            <p>{total}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

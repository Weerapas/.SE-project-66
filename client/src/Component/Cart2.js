import * as React from 'react';
import Axios from 'axios';
import { useState } from 'react';
import { Link ,useParams} from 'react-router-dom';
import "../Styles/Cart.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';



export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [product, setProductList] = useState([]);
    const navigate = useNavigate();
    const add_order = () => {
        let timerInterval;
        Swal.fire({
            timer: 1000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading();
                const timer = Swal.getPopup().querySelector("b");
                timerInterval = setInterval(() => {
                timer.textContent = `${Swal.getTimerLeft()}`;
                }, 100);
            },
            willClose: () => {
                clearInterval(timerInterval);
                navigate('/Payment');
            }
        })
    }

    const check = ()=>{
      Axios.post("http://localhost:3001/newOrder", {
        username: sessionStorage.getItem("usernamelogin"),
      }).then((Response) => {
        if(Response == "fail"){
          return;
        }
        console.log(Response.data)
        setProductList(Response.data);
      });
    };
    const TrashIcon = ({ onClick }) => {
        Axios.post('http://localhost:3001/remove').then((Response) => {
          setProductList(Response.data);
        });
        return (
          <div className="trash-icon" onClick={onClick}>
            <FontAwesomeIcon icon={faTrash} />
          </div>
        );
      };

    const addToCart = () => {
        setCartItems([...cartItems, product]);
    };

    const removeFromCart = () => {
        const updatedCartItems = cartItems.filter((item) => item.id !== product.id);
        setCartItems(updatedCartItems);
    };

    const renderCartItems = () => {
      check()
        return (
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                <div className="cart-item">
                  <div className="item-info">
                    <p>รายการที่ {item.id}</p>
                    <img src={item.image} alt={item.name} style={{width: '100px', height: '100px', marginLeft:'10%'}}/> {/* Assuming each item has an 'image' property */}
                    <div>
                      <h3>{item.name}</h3>
                    </div>
                    <div>
                      <p>{item.price} บาท</p>
                    </div>
                    <div>
                      <span>จำนวน {item.quantity}</span>
                    </div>
                    <TrashIcon onClick={() => removeFromCart(item)} />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        );
      };
    

    return (
        <div >
            <div >
            <div className='Cart-container'>
                <h2>ตะกร้าสินค้า</h2>
                {cartItems.length === 0 ? (
                    <p>ไม่มีสินค้าในตะกร้า</p>
                ) : (
                    renderCartItems()
                )}
                </div>
                <div className='foot_cart'>
                    <Link><button className="button-payment" onClick={add_order}>CheckOut</button></Link>
                </div>
            <div className='item_button'>
                <button className="button-payment" onClick={() => addToCart({
                    id: 1,
                    name: 'ชาเขียว',
                    price: 20,
                    quantity: 2,
                    image: 'https://franchise.chakaimuk.com/upload-img/MENU1:1/resize_39900/1%E0%B8%95%E0%B9%88%E0%B8%AD1_%E0%B8%8A%E0%B8%B8%E0%B8%94_39900-1-15.jpg' // เปลี่ยนเป็นที่อยู่ของรูปภาพที่คุณต้องการแสดง
                })}>Test</button>
            </div>
            </div>
        </div>
    );
}
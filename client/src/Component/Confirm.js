import Axios from 'axios';
import React, { useEffect } from 'react';
import { Link ,useParams} from 'react-router-dom';
import '../Styles/Confirm.css';
import Swal from 'sweetalert2';
export default function Confirm() {
    useEffect(() => {
        function Success() {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "คุณชำระสินค้าเสร็จสิ้น",
                showConfirmButton: false,
                timer: 1500
              });
        }
        Success();
        return () => {
        };
      }, [])
    return (
        <div className='thank'>
            <img className='image' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQt7CRvUQk6LEohjtHODbjghLPhg_4eh6Gdy_XwuWp8NA&s" alt="Thank You" />
            <h1>ขอบคุณสำหรับการชำระเงิน!</h1>
            <p>การชำระเงินของคุณเสร็จสมบูรณ์แล้ว และสินค้ากำลังจะถูกจัดส่ง</p>
            <Link to={'/'}><button className="submit-button">กลับหน้าแรก</button></Link>
        </div>
    );
}
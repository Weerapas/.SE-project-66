import Axios from 'axios';
import { useState } from 'react';
import { Link ,useParams} from 'react-router-dom';
import '../Styles/Rate_star.css';
import {FaLine} from "react-icons/fa";
import { FaStar } from 'react-icons/fa';
import Swal from 'sweetalert2';
export default function Rate_star() {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(null);
    const handleSubmit = () => {
        console.log(rating)
        Swal.fire({
            title: "ขอบคุณสำหรับ "+rating+" ดาว !",
            text: "ไว้มาใช้บริการใหม่นะครับ",
            icon: 'success',
            imageUrl: "https://i.pinimg.com/474x/4f/92/fe/4f92fe4ee07e79bc3495e41bb5ae1bd3.jpg",
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "Custom image"
          });
        //   Swal.fire({
        //     title: "ขอบคุณสำหรับ "+rating+" ดาว !",
        //     icon: 'success'
        //     })
        // ใส่ฟังก์ชั่นเอง
      };
    return (
        <div className="rating-container">
            <div className="rating">
            <h1>ช่วยรีวิวร้านของเราหน่อย</h1>
                <div className="field_Star">
                    {[...Array(5)].map((star, i) => {
                        const ratingValue = i + 1;

                        return (
                            <label key={i}>
                                <input
                                    type="radio"
                                    name="rating"
                                    value={ratingValue}
                                    onClick={() => setRating(ratingValue)}
                                />
                                <FaStar
                                    className="star"
                                    color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                                    size={30}
                                    onMouseEnter={() => setHover(ratingValue)}
                                    onMouseLeave={() => setHover(null)}
                                />
                            </label>
                        );
                    })}
                    <p>{rating} ดาว</p>
                    <div>
                        <button className="submit-button" onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
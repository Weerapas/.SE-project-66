import { useRef } from "react";
import * as React from 'react';
import { FaBars, FaTimes } from "react-icons/fa";
import "../Styles/navbar.css";
import { FaSearch } from "react-icons/fa";
function Navbar() {
	const navRef = useRef();
	const showNavbar = () => {
		navRef.current.classList.toggle(
			"responsive_nav"
		);
	};

	const show_login = () =>{
		if (sessionStorage.getItem("login_status") == "true"){


			if(sessionStorage.getItem("role") == "admin"){
				return(

					<nav ref={navRef}>
					<a href="/Manage_book">จัดการสินค้า</a>
					<a href="/Add_book">เพิ่มสินค้า</a>
					<a href="/Manage_order">จัดการออเดอร์</a>

					
					<a href="/Userpage">{sessionStorage.getItem("usernamelogin")}</a> 
					

					<button
						className="nav-btn nav-close-btn"
						onClick={showNavbar}>
						<FaTimes />
					</button>
				</nav>
	
				);
			}else{
				return(
				
				<nav ref={navRef}>
				<a href="/Book_shelf">สินค้า</a>

				<a href="/Order_history">การสั่งซื้อ</a> 
				<a href="/Cart">ตะกร้าสินค้า</a>
				<a href="/Contact">ติดต่อ</a>
				<a href="/Rate_star">รีวิว</a>

				<a href="/Userpage">{sessionStorage.getItem("usernamelogin")}</a> 
				
				<button
					className="nav-btn nav-close-btn"
					onClick={showNavbar}>
					<FaTimes />
				</button>
			</nav>

			);
			}

			
		}
		else{
			return(
				<nav ref={navRef}>

				<a href="/Book_shelf">สินค้า</a>

				<a href="/Contact">ติดต่อ</a>
				<a href="/login">การสั่งซื้อ</a> 
				<a href="/login">ตะกร้าสินค้า</a>
				<a href="/login">เข้าสู่ระบบ</a> 
				
				<button
					className="nav-btn nav-close-btn"
					onClick={showNavbar}>
					<FaTimes />
				</button>
			</nav>
				
			);
		}
	}

	
	
	return (
		<header>

			<img src="Hnompang-Logo.png" alt="Logo" width="75px" title="Logo"></img>
			<h1 className="System_Name"> HnomPang Sankhayah</h1>

			{show_login()}
			<button
				className="nav-btn"
				onClick={showNavbar}>
				<FaBars />
			</button>
		</header>
	);
}

export default Navbar;
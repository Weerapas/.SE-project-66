const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');


app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "popouyuy788",
    database: "bookstoresystem"
})

 var selectbook = "";

app.get('/Requst_book',(req,res) => {
    db.query("SELECT * FROM book WHERE `Book_Status` != 0",(err , result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});



app.post('/History',(req,res) => {
    const phone = req.body.Phone
    db.query("SELECT * FROM `order` WHERE `Phone` = (?) ",[phone],(err,result) =>{
        if(err){
            console.log(err)
        }else {
            res.send(result)
        }
    })


});

app.post('/History_Detail',(req,res) => {
    const Order_ID = req.body.Order_ID
    db.query("SELECT * FROM `book` LEFT JOIN `cart` ON `book`.`Book_ID` = `cart`.`Book_ID` WHERE `cart`.`bill_ID` = (?) ",[Order_ID],(err,result) =>{
        if(err){
            console.log(err)
        }else {
            res.send(result)
        }
    })


});

app.post('/Add_to_cart',(req,res) => {
    const Book_Id  = req.body.b_ID
    const book_temp = req.body.book_temp
    const Phone = req.body.Phone
    const total = req.body.total

    db.query("INSERT INTO `cart`(`id`, `Phone`, `Book_Id`, `quantity`, `total`, `bill_ID`) VALUES (?,?,?,?,?,?)",[0,Phone,Book_Id,book_temp,total,"null"],(err,result) => {
        if(err){
            console.log(err)
            res.send("fail");
        }else if(result != "" && result != []){
            
            res.send(["succes",result])
        }else{
            res.send("fail")
        }
    })


});

app.post('/Post_select_book',(req,res) => {
    const Select_book_ID = req.body.b_ID;
    selectbook = Select_book_ID;
    console.log(selectbook);
})

app.post('/Requst_cart',(req,res) => {
    const phone = req.body.Phone
    db.query("SELECT * FROM `book` LEFT JOIN `cart` ON `book`.`Book_ID` = `cart`.`Book_ID` WHERE `cart`.`Phone` = (?) AND `cart`.`bill_ID` = (?) ",[phone,"null"],(err,result) =>{
        if(err){
            console.log(err)
        }else {
           
            res.send(result)
        }
    })

})

app.post('/Delete_cart',(req,res) =>{
    const cart_id = req.body.cart_id

    db.query("DELETE FROM `cart` WHERE `id` = (?)",[cart_id],(err,result) => {
        if(err){
            console.log(err)
        }else{
            console.log("delete")
            res.send("succes")
        }
    })
})
//SELECT SUM(`total`) AS totalprice FROM `cart` WHERE 1

app.post('/Sum_total',(req,res) =>{
    const Phone = req.body.Phone
    db.query("SELECT SUM(`total`) AS totalprice FROM `cart` WHERE `Phone` = (?) AND `bill_ID` = (?)",[Phone,"null"],(err,result) => {
        if(err){
            console.log(err)
        }else{
            
            res.send(result)
        }
    })
})

app.post('/Sum_total_bill',(req,res) =>{
    const Order_ID = req.body.Order_ID
    db.query("SELECT SUM(`total`) AS totalprice FROM `cart` WHERE `bill_ID` = (?)",[Order_ID],(err,result) => {
        if(err){
            console.log(err)
        }else{
            
            res.send(result)
        }
    })
})

app.post('/requst_login',(req,res) => {
    const phone = req.body.phone;
    const password = req.body.password;
    db.query("SELECT * FROM `customer_infomation` WHERE `Phone` = (?) AND `password` = (?)",[phone,password],(err,result) =>{
        if(err){
            console.log(err)
            res.send("fail");
        }else if(result != "" && result != []){
            
            res.send(["succes",result])
        }else{
            res.send("fail")
        }
    })

})

app.post('/Order_manange',(req,res)=>{
    db.query("SELECT * FROM `order` WHERE `Order_Status` = (?)",["ปกติ"],(err,result) =>{
        if(err){
            console.log(err)
        }else{
            
            res.send(result)
        }
    })
})

app.post('/Cancel_order',(req,res)=>{
    const order = req.body.order
    db.query("UPDATE `order` SET `Order_Status`=(?) WHERE `Order_ID` = (?)",["ยกเลิก",order],(err,result) =>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
})

app.post('/Set_slip_true',(req,res)=>{
    const order = req.body.order
    db.query("UPDATE `order` SET `Slip_status`=(?) WHERE `Order_ID` = (?)",["ยืนยัน",order],(err,result) =>{
        if(err){
            console.log(err)
        }else{
            
            res.send(result)
        }
    })
})

app.post('/Set_delivery',(req,res)=>{
    const Order_ID = req.body.Order_ID
    const deliid = req.body.deliid
    db.query("UPDATE `order` SET `Derivery_ID`=(?) WHERE `Order_ID` = (?)",[deliid,Order_ID],(err,result) =>{
        if(err){
            console.log(err)
        }else{
            
            res.send(result)
        }
    })
})


app.post('/Requst_order',(req,res) =>{
    const Order_ID = req.body.Order_ID
    db.query("SELECT * FROM `order` WHERE `Order_ID` = (?)",[Order_ID],(err,result) =>{
        if(err){
            console.log(err)
        }else{
            
            res.send(result)
        }
    })
})

app.post('/delet_bad_order',(req,res) =>{
    const Phone = req.body.Phone
    db.query("DELETE FROM `order` WHERE `Phone` = (?)AND `Order_Status` = (?)",[Phone,"ยังไม่สมบูรณ์"],(err,result) =>{
        if(err){
            console.log(err)
        }else{
            
            res.send(result)
        }
    })
})

app.post('/add_order',(req,res) =>{
    const Phone = req.body.Phone
    var tmp = ""
    db.query("INSERT INTO `order`(`Order_ID`, `Phone`, `Derivery_ID`, `Slip_status`, `Order_Status`, `Destination`) VALUES(?,?,?,?,?,?)",["",Phone,"รอการจัดส่ง","ไม่ยืนยัน","ยังไม่สมบูรณ์","null"],(err,result) =>{
        if(err){
            console.log(err)
        }else{
            db.query("SELECT * FROM `order` WHERE `Phone` = (?) AND `Order_Status` = (?)",[Phone,"ยังไม่สมบูรณ์"],(err,result2)=>{
                if(err){
                    console.log(err)
                }else{
                    res.send(result2)
                }
            })
            
        }
    })
})


//confirm_order_by_cus

app.post('/Delete_book',(req,res)=>{
    const b_id = req.body.b_ID
    db.query("UPDATE `book` SET `Book_Status`= (?) WHERE `Book_ID` =(?)",[0,b_id],(err,result) =>{
        if(err){
            console.log(err)
        }else{
            res.send(result)

            
        }
    })
})

app.post('/confirm_order_by_cus',(req,res) =>{
    const order_id = req.body.order_id
    const Des = req.body.Des
    const Phone = req.body.Phone
    db.query("UPDATE `order` SET `Order_Status`=(?),`Destination`=(?) WHERE `Order_ID` = (?)",["ปกติ",Des,order_id],(err,result) =>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
            db.query("UPDATE `cart` SET `bill_ID`= (?) WHERE `Phone` = (?) AND `bill_ID` = (?)",[order_id,Phone,"null"],(err,result) =>{
                if(err){
                    console.log(err)
                }
            })
            
        }
    })
})

app.post('/Register',(req,res) => {
    const Fist_name = req.body.Fist_name;
    const Last_name = req.body.Last_name;
    const Phone = req.body.Phone;
    const password = req.body.password;
    

    db.query(
        "INSERT INTO `customer_infomation`(`Phone`, `password`, `Fist_name`, `Last_name`, `Role`) VALUES(?,?,?,?,?)",
        [Phone,password,Fist_name,Last_name,"custumer"],
        (err,result) =>{
            if(err){
                //console.log(err);
                res.send("Error")
            }else{
                res.send("Values inserted");
                //console.log("value add");
            }
        }
    );
});

app.post('/Get_user',(req,res) =>{
    const Phone = req.body.Phone

    db.query("SELECT * FROM `customer_infomation` WHERE `Phone` = (?)",[Phone],(err,result) =>{
        if(err){

        }else{
            res.send(result)
        }
    })
})




app.post('/Requst_book_somebook',(req,res) => {
    const Select_book_ID = req.body.b_ID;
    var resultlk = "";
    selectbook = Select_book_ID;

    
    app.get('/Requst_book_idb',(req,res) =>{
        res.send(selectbook);
    });
    
    db.query("SELECT * FROM `book` WHERE `Book_ID` = (?)",[selectbook],(err,resultl) => {
        resultlk = resultl;
        if(err){
            console.log(err);
        }else{
            res.send(resultlk);
            //console.log(resultlk)
            
            
        }
    });
});

app.post('/Add_book_to_table',(req,res) => {
    const ID = req.body.Book_ID;
    const Name = req.body.Book_Name;
    const Type = req.body.Book_Type;
    const Price = req.body.Book_Price;
    const Detail = req.body.Book_Detail;
    const Quantity = req.body.Book_Quantity;
    const Pic = req.body.Book_Pic;

    db.query(
        "INSERT INTO book (Book_ID,Book_Name,Book_Type,Book_Price,Book_detail,Book_Quantity,Book_Pic,Book_Status) VALUES(?,?,?,?,?,?,?,?)",
        [ID,Name,Type,Price,Detail,Quantity,Pic,1],
        (err,result) =>{
            if(err){
                console.log(err);
            }else{
                res.send("Values inserted");
                console.log("value add");
            }
        }
    );
});

app.post('/Update_book_to_table',(req,res) => {
    
    const ID = req.body.Book_ID;
    const Name = req.body.Book_Name;
    const Type = req.body.Book_Type;
    const Price = req.body.Book_Price;
    const Detail = req.body.Book_Detail;
    const Quantity = req.body.Book_Quantity;
    const Pic = req.body.Book_Pic;
    console.log(selectbook);
    db.query(
        "UPDATE `book` SET `Book_ID`=(?),`Book_Name`=(?),`Book_Type`=(?),`Book_Price`=(?),`Book_Detail`=(?),`Book_Quantity`=(?),`Book_Pic`=(?) WHERE `Book_ID`=(?)",
        [ID,Name,Type,Price,Detail,Quantity,Pic,selectbook],
        (err,result) =>{
            if(err){
                console.log(err);
            }else{
                res.send("Values inserted");
                console.log("value add");
            }
        }
    );
});


app.listen('3001',() =>{
    console.log("Sever is runnibg in port 3001");
})
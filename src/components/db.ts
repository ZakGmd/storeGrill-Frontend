import mysql from 'mysql2' ;





const connection = mysql.createConnection({

 host: 'localhost' ,

 user: 'root' ,

 password:"123" ,

 database: 'testDb' , 



}) 





connection.connect((err)=> {

 

 if(err){

 console.log("err is ",err)

}





})



export default connection


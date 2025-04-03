
import mysql from 'mysql2';

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:'',
    database: "musha_api",
    port:3307
});

db.connect((error)=>{
    if(error){
        console.error("Error connecting to the database:", error);
        return;
    }
    console.log("Connected to the database");
})
export default db; 
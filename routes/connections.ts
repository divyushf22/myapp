import mysql from 'mysql';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'f22db',
});

console.log("check")
connection.connect((err:any)=>{
    if(err) console.log(err);

    else console.log("Connected to f22 db");
});

export default connection;
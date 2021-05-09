const express = require('express');
const app = express();
const cors = require('cors');

//database 
const db = require("./config/database");

const PORT = process.env.PORT || 4000;

//Middlewares JSON use
app.use(express.json());

//Cross-origin resource sharing
app.use(cors());

//DB check
db.authenticate().then(()=> console.log("DB connected!")).catch(error => console.log("Error:"+error))


app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));

process.env.NODE_TLS_REJECT_UNAUTHORIZED='0'


app.listen(PORT, function() {
    console.log(`Server on port ${PORT}`);
});



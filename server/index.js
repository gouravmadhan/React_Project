const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const router = require('./routes');
const protectedRoutes = require('./protectedRoutes');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
require('dotenv').config();

jwtValidator = (req,res,next)=>{
	const token = req.headers.authorization;
	jwt.verify(token,'secret',(err,data)=>{
		if(err)
		{
			res.sendStatus(403);
		}
		else{
			console.log(data);
			req.user = data;
			next();
		}
	})
}

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(router);
app.use('/protected',jwtValidator,protectedRoutes)
// db connection
const uri = process.env.ATLAS_URI;
mongoose.connect(uri,{ useNewUrlParser: true , useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open',()=>{
    console.log("db connected");
})

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log("Server Is UP");
})
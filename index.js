import express from 'express'
import dotenv from 'dotenv'
import {connectDB} from './src/config/db.js'
import authRoutes from './src/routes/authRoutes.js'
import userRoutes from './src/routes/userRoutes.js'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

//middleware 
app.use(express.json());
// For parsing application/json
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//routes 
app.get('/', (req, res)=>{
    res.send("I'm coming from server")
})

//htttp://localhost:300/api/auth/register/
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)

app.listen(port, () => {
    console.log(`Wow, server is running on port::${port}`)
    connectDB();
})
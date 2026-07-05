const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');

const pool = require('./config/db.js');
const userRouter = require('./routes/userRoute.js');
const todoRouter = require('./routes/todoRoutes.js');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173'
}));
app.use(helmet());

const connectDB = async () =>{
  try{
    const connection = await pool.getConnection();
    console.log('Database connected');
    connection.release();

  }catch(error){
    console.log('Database connection failed', error.message);
  }
};
connectDB();

//user login
app.use('/auth', userRouter);

//todo creation
app.use('/user', todoRouter);




app.get('/', (req, res)=>{
  res.send('Server is running');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>{
  console.log('Server running on', PORT);
});
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());


app.get('/', (req, res)=>{
  res.send('Server is running');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>{
  console.log('Server running on', PORT);
});
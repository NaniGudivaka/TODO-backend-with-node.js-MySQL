const express = require('express');
const router = express.Router();

const pool = require('../config/db.js');

router.post('/continue', async (req, res) =>{
  let {name, email} = req.body;

  name = name.trim();
  email = email.trim().toLowerCase();

  if(!name || !email){
    return res.status(400).json({
      success: false,
      message: 'All fields are required'
    });
  }

  try{

    const [user] = await pool.query(`
      
      select * from users where email = ?
      `, [email]
    );

    //if user exists
    if(user.length > 0){
      return res.status(200).json({
        success: true,
        message: 'Welcome Back',
        user: user[0],
      });
    }

    //if user does not exists

    const [result] = await pool.query(`
      insert into users (name, email) values(?, ?)
      `, [name, email]);

      return res.status(201).json({
        success: true,
        message: ' User created successfully',
        userId: result.insertId, 
      });


  }catch(error){
    console.log('Database Error:', error);
    return res.status(500).json({
      success:false,
      message: 'Server not responding'
    });
  }

});


module.exports = router;
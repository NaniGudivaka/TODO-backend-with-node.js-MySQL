const express = require('express');
const router = express.Router();

const pool = require('../config/db.js');

router.post('/todo', async (req, res) => {

  const { user_id, tasks } = req.body;

  if (!user_id || !tasks) {
    return res.status(400).json({
      success: false,
      message: 'Userid and task are required fields'
    });
  }

  try {

    const [user] = await pool.query(
      'select id from users where id = ? ', [user_id]);

    if (user.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        status: 404
      });
    }


    const insertQuery = `insert into tasks(user_id, tasks) values(?, ?)`;

    const [result] = await pool.query(insertQuery, [user_id, tasks]);

    return res.status(201).json({
      success: true,
      message: 'Todo created successfully',
      status: 201,
      todoId : result.insertId
    });


  } catch (error) {

    console.log('Error occurred: ', error);

    return res.status(500).json({
      success: false,
      message: 'Server not responding',
      status: 500
    });

  }


});

module.exports = router;
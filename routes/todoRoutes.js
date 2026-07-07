const express = require('express');
const router = express.Router();

const pool = require('../config/db.js');


//Post route
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
       
      });
    }


    const insertQuery = `insert into tasks(user_id, tasks) values(?, ?)`;

    const [result] = await pool.query(insertQuery, [user_id, tasks]);

    return res.status(201).json({
      success: true,
      message: 'Todo created successfully',
     
      todoId : result.insertId
    });


  } catch (error) {

    console.log('Error occurred: ', error);

    return res.status(500).json({
      success: false,
      message: 'Server not responding',
      
    });

  }


});

//Get route

router.get('/users/:user_id', async (req, res) =>{

  const {user_id} = req.params;

  try{
    const [todos] = await pool.query('select * from tasks where user_id = ?', [user_id]);

    return res.json({
      success: true,
      todos,
    });

  }catch(error){
  console.error('Server error:', error);
  return res.status(500).json({
    success: false,
    message: 'Server not responding'
  });
}

});

//update route

router.put('/edit/:id', async (req, res) =>{

  const {id} = req.params;
  const {tasks, completed} = req.body;

  if(tasks === undefined || completed === undefined){
    return res.status(400).json({
      success: false,
      message: 'Tasks and completed are required'
    });
  }

try{
  const [todo] = await pool.query('select * from tasks where id = ?', [id]);

if(todo.length === 0){
  return res.status(404).json({
    success: false,
    message: 'Todo not found',
    
  });
}

const [result] = await pool.query('update tasks set tasks = ? , completed = ? where id = ?', [tasks, completed, id]);

if(result.affectedRows === 0){
  return res.status(404).json({
    success: false,
    message: 'Todo not found'
  });
}

return res.status(200).json({
  success: true,
  message: 'Todo updated successfully',
  
});

  

}catch(error){
  console.error('Server error:', error);

  return res.status(500).json({
    success: false,
    message: 'Server not responding',
    
  })
}


});

//delete route

router.delete('/delete/:id', async (req, res) =>{

  const {id} = req.params;

  try{
    const [todo] = await pool.query('select * from tasks where id = ?', [id]);

    if(todo.length === 0){
      return res.status(404).json({
        success: false,
        message: ' User not found',
      });
    }
    const [result] = await pool.query(' delete from tasks where id = ?', [id]);

    if(result.affectedRows === 0){
      return res.status(404).json({
        success: false,
        message: 'Todo not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Todo deleted successfully',
    });

  }catch(error){
    console.error('Server Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server not responding',
    });
  }

});

module.exports = router;
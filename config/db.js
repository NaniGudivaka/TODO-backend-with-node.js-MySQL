
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');


dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    minVersion: "TLSv1.2",
    rejectUnauthorized: true,
  },
});

//creating table

async function createTable() {
  await pool.query(`
    create table if not exists users(
    id int primary key auto_increment,
    name varchar(100) not null,
    email varchar(150) unique not null,

    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp 
    )
    `);

    await pool.query(`
      create table if not exists todos(
      id int primary key auto_increment,
      user_id int not null,
      tasks varchar(500) not null,
      completed boolean default false,

      created_at timestamp default current_timestamp,
      updated_at timestamp default current_timestamp on update current_timestamp,

      foreign key(user_id) references users(id)
      on delete cascade 
      )
      `);
}

const tableConnection = async () =>{
  try{
    await createTable();
    console.log('Tables created successfully');

  }catch(error){
    console.log(error);
  }
}

tableConnection();

module.exports = pool;



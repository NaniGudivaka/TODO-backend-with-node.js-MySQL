# Todo Backend API

REST API built with Node.js, Express, MySQL2 and TiDB Cloud.

The backend provides CRUD APIs for managing Todo tasks and is deployed on Render.

---

## Live API

https://todo-backend-with-node-js-mysql.onrender.com

---

## Features

- REST API
- CRUD Operations
- MySQL2
- TiDB Cloud Database
- Express.js
- CORS Enabled
- Environment Variables
- Cloud Deployment (Render)
- Helmet Security Middleware

---

## Tech Stack

- Node.js
- Express.js
- MySQL2
- TiDB Cloud
- Dotenv
- CORS

---

## Installation

Clone repository

```bash
git clone https://github.com/NaniGudivaka/TODO-backend-with-node.js-MySQL.git
```

Install packages

```bash
npm install
```

Start server

```bash
npm start
```

or

```bash
nodemon index.js
```

---

## Environment Variables

Create a `.env` file

```env
DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_NAME=todoApp
PORT=4000
CLIENT_URL=http://localhost:5173
```

---

## API Endpoints

### Get Todos

```
GET /user/todo
```

### Create Todo

```
POST /user/todo
```

### Update Todo

```
PUT /user/todo/:id
```

### Delete Todo

```
DELETE /user/todo/:id
```

---

## Database

Tables

```
users
todos
```

---

## Project Structure

```
backend/

config/
routes/

index.js

package.json
```

---

## Deployment

Backend deployed on

- Render

Database

- TiDB Cloud

---

## Future Improvements

- JWT Authentication
- User Authorization
- Middleware
- MVC Architecture
- Input Validation
- Error Handling
const express = require('express');
const cors = require('cors');
const fs = require('fs/promises');
const path = require('path');
const uuid = require('uuid').v4;

// initialize application
const app = express();

// cors middleware
app.use(cors());

// parse request body
app.use(express.json());

// REST API
/**
 * /users POST - create user
 * /users GET - get users list
 * /users/<userID> GET - get user by id
 * /users/<userID> PATCH / PUT - update user by id
 * /users/<userID> DELETE - remove user by id
 */

/**
 * Create user.
 */
const usersPath = path.resolve(__dirname, 'models.json');

app.post('/api/v1/users', async (req, res) => {
  try {
    const { name, age } = req.body;
    const id = uuid();

    const data = await fs.readFile(usersPath);
    const users = JSON.parse(data);

    const newUser = { id, name, age };
    users.push(newUser);

    await fs.writeFile(usersPath, JSON.stringify(users, null, 4));

    res.status(200).json({
      user: newUser,
    });
  } catch (err) {
    res.status(500).json({
      msg: err.msg,
    });
  }
});

/**
 * Get users list.
 */
app.get('/api/v1/users', async (req, res) => {
  try {
    const users = JSON.parse(await fs.readFile(usersPath));

    res.status(200).json({
      users,
    });
  } catch (err) {
    res.status(500).json({
      msg: err.msg,
    });
  }
});

/**
 * Get user by id.
 */
app.get('/api/v1/users/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const users = JSON.parse(await fs.readFile(usersPath));

    const user = users.find((item) => item.id === id);

    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({
      msg: err.msg,
    });
  }
});

// not found example
app.get('*', (req, res) => {
  res.status(404).json({
    msg: 'Not found!',
  });
});

// set application running PORT
const port = 3000;

app.listen(port, () => {
  // console.log(`Application up and running on ${port}!`);
});

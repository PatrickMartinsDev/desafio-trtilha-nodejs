const express = require('express');
const cors = require('cors');

const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

function checksExistsUserAccount(request, response, next) {
  const { username } = request.headers;

  const user = users.find((user) => user.username === username)

  if (!user) {
    return response.status(400).json({ error: "User not found" });
  }

  request.user = user;

  return next();
}

app.post('/users', (request, response) => {
  const { name, username } = request.body;
  const id = uuidv4();
  console.log('id', id);
  console.log('username', username)

  const userAlreadyExists = users.some(
    (user) => user.username === username
  )

  if (userAlreadyExists) {
    return response.status(400).json({ error: "User already exists!" });
  }

  users.push({
    id: uuidv4(),
    name,
    usename,
    todos: [],
  });

  return response.status(201).send();
});

app.get('/todos', checksExistsUserAccount, (request, response) => {
  const { user } = request;
  console.log('user', user)

  return response.json(user.todos);
});

app.post('/todos', checksExistsUserAccount, (request, response) => {
  const { users } = request;
  const { username } = request.headers;
  const { title, deadline } = request.body;

  const userData = {
    id: uuidv4(),
    title,
    done: false,
    deadline = new Date(deadline),
    created_at = new Date()
  };

  users.todos.push(userData);
});

app.put('/todos/:id', checksExistsUserAccount, (request, response) => {
  const { title, deadline } = request.body;
  const idAlreadyExists = users.some(
    (user) => user.id === id
  )
  if (idAlreadyExists) {
    user.push({
      title,
      deadline: new Date(deadline),
      done: true,
      todos: [],
    });

    return response.status(400).json({ error: "Task does not exist" });
  }
});

app.patch('/todos/:id/done', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.delete('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});


module.exports = app;
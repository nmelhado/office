const express = require('express');
const app = express();
const path = require('path');
const {User,Department} = require('./db').model;
const {sync,seed} = require('./db');

app.use(express.static(path.join(__dirname,'/public')));
app.use('/src',express.static(path.join(__dirname,'/dist')))

const PORT = 8080;

app.get('/api/departments', async (req,res,next) => {
  const departments = await Department.findAll();
  res.send(departments);
})

app.get('/api/department/:id', async (req,res,next) => {
  const department = await Department.findById(req.params.id);
  res.send(department);
})

app.get('/api/departmentUsers/:id', async (req,res,next) => {
  const department = await User.findAll( {
    where: {
      departmentId: req.params.id
    }
  });
  res.send(department);
})

app.get('/api/users', async (req,res,next) => {
  const users = await User.findAll();
  res.send(users);
})

app.get('/api/user/:id', async (req,res,next) => {
  const user = await User.findById(req.params.id);
  res.send(user);
})

const init = async () => {
  await sync();
  await seed();
  app.listen(PORT, () => {
    console.log('Listening o port: ',PORT)
  })
}

init();

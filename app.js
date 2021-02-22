const express = require('express');
const app = express();
app.use(express.json());

const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize(
    'test-test',
    'root',
    'root',
    {
        host: 'localhost',
        dialect: 'mysql',
        logging: false,
    }
);

class User extends Model {}
class ToDo extends Model {}

User.init({
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
}, { sequelize });


ToDo.init({
    title: DataTypes.STRING,
}, { sequelize });

User.hasMany(ToDo);
ToDo.belongsTo(User);
User.sync();
ToDo.sync();

app.get('/', (req, res, next) => {
    res.send('Hello, world!');
});

app.get('/users', async (req, res, next) => {
    const users = await User.findAll();
    res.json(users);
});

app.get('/users/:id', async (req, res, next) => {
    const userById = await User.findByPk(req.params.id, {include: 'ToDos'});
    res.json(userById);
});

app.post('/users', async (req, res, next) => {
    const user = await User.create({
        name: req.body.name,
        age: +req.body.age,
    });
    const toDo = await ToDo.create({title: 'Hello'});
    await toDo.setUser(user);
    await toDo.save();
    res.status(201).json(user);
});

app.listen(3000);

module.exports = app;
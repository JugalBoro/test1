
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();

dotenv.config();

app.use(cors());

app.use(express.json());

const sequelize = require('./util/database');
const User = require('./models/user');
const Message = require('./models/message');
const Group = require('./models/group');
const GroupTable = require('./models/grouptable');

const userRoutes = require('./routes/user');
const chatRoutes = require('./routes/messagetab');
const groupRoutes = require('./routes/group');

app.use('/user', userRoutes);
app.use('/chat', chatRoutes);
app.use('/group', groupRoutes);



User.hasMany(Message);
Message.belongsTo(User);

Group.belongsToMany(User, {through:GroupTable});
User.belongsToMany(Group, {through:GroupTable});

Group.hasMany(Message);
Message.belongsTo(Group);


sequelize
    // .sync({force:true})
    .sync()
    .then(()=>{
        app.listen(3306, function () {
            console.log('Example app listening on port 3306!');
           });
})
    .catch(err=>{
    console.log(err);
})
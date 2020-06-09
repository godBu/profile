const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const User  = require('./models/userModel');

const app = express();

//require('dotenv').config();

mongoose.connect('mongodb+srv://Bubu5150:password1234@clusterbu-lbbai.mongodb.net/users?retryWrites=true&w=majority',
{useNewUrlParser: true, useUnifiedTopology: true});

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('.hbs', handlebars({
	defaultLayout: 'layout',
	extname: '.hbs'
}));

app.set('view engine', '.hbs');

// app.get('/', (req, res) => {
//     res.render('index');
// });

// app.get('/login', (req, res) => {
//     res.render('login');
// })

// app.post('/login', async (req, res) => {
//     // let {userName, email, password} = req.body;
//      let user = new User ({
//          userName: req.body.userName,
//         //  email: req.body.email,
//          password: req.body.password
//      });
//      await user.save();
//      res.redirect(`/profile/?userName=${req.body.userName}`);
//  })
      

app.get('/', (req, res) => {
    res.render('signup');
})

app.post('/signup', async (req, res) => {
    // let {userName, email, password} = req.body;
    let user = new User ({
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password
    });
    await user.save();
    // let email = req.body.email
    // console.log(email);
    res.redirect(`/profile/?userName=${req.body.userName}`);
})

app.get('/profile', async (req, res) => {
    let user = await User.findOne({userName: req.query.userName}); //
  //  console.log(req.query);
    console.log(user);
    res.render('profile', {user: user.toObject()});
});

app.listen(3000);
// app.listen(3000, () => {
// 	console.log('listening on port 3000');
// });
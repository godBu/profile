const UserModel = require('../models/userModel');

exports.getSignup = (req, res) => {
    res.render('signup');
};

exports.createUser = async(req, res) => {
	if (!req.body.userName || !req.body.email || !req.body.password) {
		res.render('signup', {err: "Please provide all credentials"});
		return;
    }
    
	const user = new UserModel ({
		userName: req.body.userName,
		email: req.body.email,
		password: req.body.password
    });
    
    let isDuplicate = false;
    
	await user.save().catch((reason) => {
        // console.log(reason);
		res.render('signup', {err: "A user with this username or email already exists"});
        
        isDuplicate = true;
		return;
	});

    if (isDuplicate) {
        return
    }
    res.redirect(`/profile/?userName=${req.body.userName}`);
};

exports.getLogin = (req, res) => {
    res.render('login');
};

exports.getUser = async (req, res) => {
    if (!req.body.userName || !req.body.password) {
		res.render('login', {err: "Please provide all credentials"});
		return;
    }

    let user = await UserModel.validateUser(req.body); 

    if (user) {
        console.log(user);
        res.render('profile', {user: user.toObject()});
        return;
    }

    res.render('login', {err: "password error" });
};

exports.getProfile = async (req, res) => {
    let user = await UserModel.findOne({userName: req.query.userName}); //
    console.log(user);
    if (user == null) {
        res.render('profile', {err: "user non-existent" });
        return;
    }

    res.render('profile', {user: user.toObject()});
};

   /*  if (user == null) {
        res.render('login', {err: "user non-existent" });
        return;
    } */
 /*    if (user.password == req.body.password) {
        res.render('profile', {user: user.toObject()});
        return;
    } */
const express = require('express');
const router = express.Router();
const path = require('path');
const User = require('../models/userSchema');
const app = require('../server');

router.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../../index.html'));
});
router.get('/home', (req, res, next) => {
    res.redirect('/');
});
router.get('/auth', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../../client/auth.html'));
});
router.get('/login', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../../client/login.html'));
});

router.post('/api/login', (req, res, next) => {

    req.checkBody('username', 'Invalid login!').notEmpty().isLength({ min: 5, max: 15 });
    req.checkBody('password', 'Invalid password!').notEmpty().isLength({ min: 5, max: 15 });

    const errors = req.validationErrors();
    if (errors) {
        const messages = [];
        errors.forEach((err) => {
            messages.push(err.msg);
        });
        console.log(messages);
        res.json({
            success: false,
            message: messages
        })
    } else {
        User.findOne({
            username: req.body.username,
        }), (err, user) => {
            if (err) {
                console.log(err.msg);
                res.json(err.msg);
            }
            if (!user) {
                res.json({ success: false, message: 'user not found' });
            } else if (user) {
                if (user.password != req.body.password) {
                    res.json({ success: false, message: 'password missmatch' });
                } else {
                    const token = jwt.sign(user, app.use('superSecret'), {
                        expiresInMunutes: 720
                    });
                    console.log('Token was created');
                }

                res.json({
                    success: true,
                    message: 'Token was given',
                    token: token
                });
            }
        }
    }

});


router.post('/api/authenticate', (req, res, next) => {

    req.checkBody('email', 'Invalid email!').notEmpty().isEmail();
    req.checkBody('username', 'Invalid login!').notEmpty();
    req.checkBody('password', 'Invalid password!').notEmpty().isLength({ min: 5 });
    req.checkBody('confirm_password', 'Passwords do not match!').equals(req.body.password);

    const errors = req.validationErrors();
    if (errors) {
        const messages = [];
        errors.forEach((err) => {
            messages.push(err.msg);
        });
        console.log(messages);
        res.json({
            success: false,
            message: messages
        })
    } else {
        const newUser = new User({
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        });
        newUser.save((err) => {
            try {
                if (err) throw err;
                else {
                    console.log('auth correctly');
                    res.json({
                        success: true,
                        message: 'authenticated correctly'
                    });
                }
            } catch (err) {
                console.log(err.msg);
                res.json({
                    success: false,
                    message: 'authentication failes'
                });
            }
        });
    }




});

module.exports = router;
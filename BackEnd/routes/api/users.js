var mongoose = require('mongoose');
var router = require('express').Router();
var passport = require('passport');
var User = mongoose.model('User');


router.post('/users/login', function (req, res, next) {
  if (!req.body.user.email) {
    return res.status(422).json({ errors: { email: "can't be blank" } });
  }

  if (!req.body.user.password) {
    return res.status(422).json({ errors: { password: "can't be blank" } });
  }

  passport.authenticate('local', { session: false }, function (err, user, info) {
    if (err) { return next(err); }

    if (user) {
      user.token = user.generateJWT();
      return res.json({ user: user.toAuthJSON(), Status: "success" });
    } else {
      return res.status(422).json({ errors: 'You have entered wrong username / password' });
    }
  })(req, res, next);
});

router.post('/user/save', function (req, res, next) {
  var user = new User();
  user.username = req.body.user.username;
  user.email = req.body.user.email;
  user.dob = req.body.user.dob;
  user.role = req.body.user.role;
  user.setPassword(req.body.user.password);

  user.save().then(function () {
    return res.json({ user: user.toAuthJSON() });
  }).catch(next);
});

router.post('/getAlluser', function (req, res, next) {
  let auth = req.headers.authorization;
  if (auth != undefined) {
    User.collection.find().toArray(function (e, d) {
      let arr = [];
      d.forEach(elements => {
        let data = {
          '_id': elements._id,
          'username': elements.username,
          'email': elements.email,
          'role': elements.role,
          'dob': elements.dob
        };
        arr.push(data);
      })
      result = arr;
      return res.json({ AllUsers: result, Status: "Sucess" });
    })
  }
  else {
    return res.json({ Message: 'You are not authorised', Status: "Error" });
  }
});

router.put('/user/update', async (req, res, next) => {
  let auth = req.headers.authorization;
  if (auth != undefined) {
    User.findById(req.body.payload.id).then(function (user) {
      if (!user) { return res.sendStatus(401); }
      // only update fields that were actually passed...
      if (typeof req.body.user.username !== 'undefined') {
        user.username = req.body.user.username;
      }
      if (typeof req.body.user.email !== 'undefined') {
        user.email = req.body.user.email;
      }
      if (typeof req.body.user.dob !== 'undefined') {
        user.dob = req.body.user.dob;
      }
      if (typeof req.body.user.role !== 'undefined') {
        user.role = req.body.user.role;
      }
      return user.save().then(function () {
        return res.json({ user: user.toAuthJSON() });
      });
    }).catch(next);
  }
  else {
    return res.json({ Message: 'You are not authorised', Status: "Error" });
  }

});

router.post('/user/:_id', async (req, res, next) => {
  let auth = req.headers.authorization;
  if (auth != undefined) {
    User.findById(req.body.id).then(async (user) => {

      if (user.role == 1) {
        try {
          await User.findByIdAndRemove(req.params);
          res.json({ Status: "Deleted Successfully" });
        } catch (err) { next(err); }
      }
      else {
        return res.json({ Message: 'You are not authorised', Status: "Error" });
      }
    })
  }
  else {
    return res.json({ Message: 'You are not authorised', Status: "Error" });
  }
});



module.exports = router;

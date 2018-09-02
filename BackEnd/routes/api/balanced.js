var router = require('express').Router();
var mongoose = require('mongoose');
var router = require('express').Router();
var Balanced = mongoose.model('Balanced');
var User = mongoose.model('User');

let validatedData = {};
router.post('/validate', function (req, res, next) {
    let auth = req.headers.authorization;
    let currentUser = req.body.balanced.username
    let attempts = req.body.balanced.attempts;


    if (auth != undefined) {
        let parentheses = "[]{}()",
            stack = [], // Parentheses stack
            i, //Index in the string
            c; // Character in the string

        for (i = 0; c = req.body.balanced.input[i++];) {
            let bracePosition = parentheses.indexOf(c),
                braceType;
            // ~ is truthy for any number but -1
            if (!~bracePosition) {
                continue;
            }
            braceType = bracePosition % 2 ? 'closed' : 'open';
            if (braceType === 'closed') {
                if (!stack.length || parentheses.indexOf(stack.pop()) != bracePosition - 1) {
                    return false;
                }
            }
            else {
                stack.push(c);
            }
        }
        if (!stack.length == true) {
            stack.res = 'Balanced';
        }
        if (!stack.length == false) {
            stack.res = 'Unbalanced';
        }
        // If anything is left on the stack <- not balanced
        let validatedData = ({ username: currentUser, Message: stack.res, attempts: attempts, Status: "success" })

        User.collection.find().toArray(async (e, d) => {
            var balanced = new Balanced;
            d.forEach(element => {
                if (element.username == validatedData.username) {
                    balanced.username = currentUser;
                    balanced.message = validatedData.Message;
                    balanced.count = validatedData.attempts + 1;
                }
            });
            if (validatedData.Message == "Balanced") {
                balanced.save().then(function () {
                    return res.json({ balanced: balanced.toJSONFor(), Status: 'Success', Message: 'Balanced, saved to db' });
                }).catch(next);
            }
        })
        return res.json({ username: req.body.balanced.username, Message: stack.res, attempts: attempts, Status: "success" });
    } else {
        return res.json({ Message: 'You are not authorised', Status: 'Error' });
    }

});


router.post('/attempts', function (req, res, next) {

    Balanced.collection.find().toArray(function (e, d) {
        let array = [];
        var balanced = new Balanced;
        var largest = 0;
        d.forEach(element => {
            if (element.username == req.body.balanced.username) {
                let Counts = element.count
                array.push(Counts)
            }

        });
        for (i = 0; i <= largest; i++) {
            if (array[i] > largest) {
                var largest = array[i] + 1;
            }
        }
        return res.json({ attempts: largest, Status: "success" });
    })
});

module.exports = router;

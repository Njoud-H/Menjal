const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.get("/:_id", (req, res) => {
    const id = req.params._id
    console.log(id)
        User.findById(id)
            .populate('product')
            .then((users) => {
                console.log("test ----",users)
                res.json({ msg: users });
               
            })
            .catch((err) => {  console.log("error ----")
            res.json({ msg: err })});
    });

// view all users info 
router.get("/", (req, res) => {
    User.find()
        // .populate('product')
        .then((users) => {
            res.json({ msg: users });
        })
        .catch((err) => res.json({ msg: err }));
});



// sigin up
router.post("/signup", (req, res) => {
    const newUser = {
        role: req.body.selectedRole,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        
        farmName: null,
        farmDescription: null,
        farmLocation: null,
    };
    newUser.email = newUser.email.toLowerCase();
    User.findOne({ email: newUser.email })
        .then((user) => {
            // if the email in the database !
            if (user) {
                res.json({
                    msg: "the email was used change it plz ! ",
                });
            }
            // if the email is not insaid the database
            else {
                var salt = bcrypt.genSaltSync(10);
                newUser.password = bcrypt.hashSync(req.body.password, salt);
                newUser.email = newUser.email.toLowerCase();
                User.create(newUser).then((user) => {
                    res.json({ msg: "user has been registered", user: user });
                });
            }
        })
        .catch((err) => res.json({ msg: err }));
});


//login
router.post("/login", async (req, res) => {
    let { email, password } = req.body;
    //  let email = req.body.email ; let password = req.body.password
    email = email.toLowerCase();
    const user = await User.findOne({ email: email }); // its same to =>  User.findOne({email:email}).then(user => { })
    // if email is  not exist
    if (!user) {
        res.json({ msg: "email is not exist" });
    }
    // if email is  exist
    else {
        // if password is currect
        if (bcrypt.compareSync(password, user.password)) {
            user.password = undefined;
            let payload = { user };
            let token = jwt.sign(payload, process.env.SECRET_KEY, {
                expiresIn: 1000 * 60 * 60,
            }); // to the user info
            res.json({ msg: "user logedin ", token });
        }
        // / if password is not currect
        else {
            res.json({ msg: "password is not currect" });
        }
    }
});

router.get("/:token", (req, res) => {
    let token = req.params.token;

    jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
        if (err) return res.json({ msg: err });

        let user = decode;

        res.json({ msg: "user decoded", user });
    });
});

/* ====
// authRoutes.js
authRoutes.post("/profile", function (req, res) {
    User.findById(req.user._id, function (err, user) {
        if (err) {
            res.status(500).send(err);
        } else {
            user.password = req.body.newPassword || user.password;
            user.save(function (err, user) {
                res.send({success: true, user: user.withoutPassword()});
            });
        }
    });
}); */


// update user (farm info)
router.put("/update/:userId", (req, res) => {
     let userId = req.params.userId;
 
     let updateFarm = {
        farmName: req.body.farmName,
        farmDescription: req.body.farmDescription,
        farmLocation: req.body.farmLocation,
     };
     User.findByIdAndUpdate(userId, updateFarm)
         .then(farm => {
             res.json({ msg: "Farm has been updated", farm: farm })
         }).catch(err => console.log(err))
 });

module.exports = router;

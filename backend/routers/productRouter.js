const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const User = require("../models/user");



// view all products info 
router.get("/", (req, res) => {
    Product.find()
        .then((products) => {
            res.json({ msg: products });
        })
        .catch((err) => res.json({ msg: err }));
});

// search 
//CREATE PRODUCT
router.post("/product", (req, res) => {
    // FRONT END
    //console.log("session user id: ", req.session.userId);
    // find the user currently logged in
    // User.findOne({ _id: req.session.userId }, function (err, currentUser) {
    //   if (err) {
    //     console.log("database error: ", err);
    //     res.redirect("/login");
    //   } else {
    // FRONT END
    let userId = req.body.userId

    var addProduct = {
        name: req.body.name,
        category: req.body.category,
        image: req.body.image,
        price: req.body.price,
        quantity: null,
    }

    Product.create(addProduct)
        .then((product) => {
            User.findByIdAndUpdate(userId, { $addToSet: { product: product } }, { new: true })
                .populate('product')
                .then((user) => {
                    //console.log("test",user)
                    res.json({ msg: "product has been added to DB ", product: product })

                })

        })
        .catch((err) => { console.log(err) })
    //}
});
// //})



// EDIT PRODUCT (update product)
router.put("/update/:productId", (req, res) => {
    // let userId = req.params.userId;
    let productId = req.params.productId;

    let updateProduct = {
        name: req.body.name,
        category: req.body.category,
        image: req.body.image,
        price: req.body.price,
        quantity: req.body.quantity,
    };
    Product.findByIdAndUpdate(productId, updateProduct)
        .then(product => {
            res.json({ msg: "product has been updated", product: product })
        }).catch(err => console.log(err))
});

// DELETE PRODUCT
router.delete("/:userId/delete/:productId", (req, res) => {
    let userId = req.params.userId
    let productId = req.params.productId

    Product.findByIdAndDelete(productId)
        .then(() => {
            res.json({ msg: `Prodect ${productId} deleted successfully` });
            User.findByIdAndUpdate(userId, { $pull: { product: productId } })
                .then(user => {
                    res.json({ msg: "product delete to your product", product: user.product })
                })
        })
        .catch(err => console.log(err))

});


// ADD and DELETE product to/from FAVIORATE
router.post("/favorite", (req, res) => {
    let productId = req.body.productId
    let userId = req.body.userId
    console.log(productId)

    User.findByIdAndUpdate(userId, { $addToSet: { favoriteProducts: productId } }, { new: true })
        .then(user => {
            res.json({ msg: `Prodect ${Product.name} added to your favorite`, favoriteProducts: user.favoriteProducts })
        })
})

router.delete('/:userId/fav/:productId', (req, res) => {
    let productId = req.params.productId
    let userId = req.params.userId
    User.findById(userId)
        .then(user => {
            let favoriteProducts = user.favoriteProducts.filter(product => {
                return !(product == productId)
            })
            console.log(favoriteProducts.length)
            User.findByIdAndUpdate(userId, { favoriteProducts: favoriteProducts }, { new: true })
                .then(updateUser => {
                    res.json({ msg: `Product ${Product.name} deleted from your favorite`, favoriteProducts: updateUser.favoriteProducts })
                })
        })

    // User.findByIdAndUpdate(userId , {$pull :{favoriteMovies :favoriteMovies}})
    // .then(user =>{
    //     res.json({msg : "movie delete to your favorite Movies" , favoriteMovies : user.favoriteMovies})
    // })
})

// ADD and DELETE product to/from CART
router.post("/cart", (req, res) => {
    let productId = req.body.productId
    let userId = req.body.userId
    // console.log(productId)
    User.findByIdAndUpdate(userId, { $addToSet: { cart: productId } }, { new: true })
        .then(user => {
            res.json({ msg: `Prodect ${Product.name} added to your Cart`, cart: user.cart })
        })
})

router.delete('/:userId/cart/:productId', (req, res) => {
    let productId = req.params.productId
    let userId = req.params.userId
    User.findById(userId)
        .then(user => {
            let cartProducts = user.cart.filter(product => {
                return !(product == productId)
            })
            console.log(cartProducts.length)
            User.findByIdAndUpdate(userId, { cart: cartProducts }, { new: true })
                .then(updateUser => {
                    res.json({ msg: `Product ${Product.name} deleted from your Cart`, cart: updateUser.cart })
                })
        })

    // User.findByIdAndUpdate(userId , {$pull :{favoriteMovies :favoriteMovies}})
    // .then(user =>{
    //     res.json({msg : "movie delete to your favorite Movies" , favoriteMovies : user.favoriteMovies})
    // })
})


module.exports = router;
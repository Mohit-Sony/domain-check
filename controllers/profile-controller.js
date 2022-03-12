const User = require('../models/user');

module.exports.profile = function(req,res){
    res.render('profile',{
        title:"profile | site name"
    })
}

module.exports.wishlist = function(req,res){
    res.render('wishlist',{
        title:"wishlist | site name"
    })
}

module.exports.profile = function(req,res){
    res.render('profile',{
        title:"profile | site name"
    })
}

module.exports.addtowishlist = async function(req,res){
    try {
        let user = await User.findByIdAndUpdate(req.user.id,{
            $push :{
                wishlist : req.body.item
            }
        });


    } catch (error) {
        console.log(error)
        return res.redirect('back')
    }
}
const User = require('../models/user');
const Wish = require('../models/wish');
const mongoose = require('mongoose')



module.exports.wishlist = async function(req,res){

    let wish_list = await User.findById(req.user.id).populate({
        path: 'wishlist.wish',
        model: 'Wish'
   });

    return res.render('wishlist',{
        title:"wishlist | site name",
        data:wish_list.wishlist
    })

    
}

module.exports.profile = function(req,res){
    return res.render('profile',{
        title:"profile | site name",
        // layout: './layouts/xyz'

    })
}

module.exports.addtowishlist = async function(req,res){
    try {
        let user = await User.findById(req.user.id);
        console.log(user);

        //check weather this wish previously exists or not 
        let wish = await Wish.findOne({user:req.user.id,domain:req.body.domain});

        console.log(`inside add to wishlist`);
        //if exist -> remove 
        if(wish){
            console.log(`wish already exist`);
            console.log(wish);
            await User.findByIdAndUpdate(req.user.id,{
                $pull:{
                    wishlist: {wish : wish}
                }
            });
            wish.remove();
            //remove in 
        }else{
                   //if not exits -> add to wishlist 
                   console.log(`not exists`)

            let wish = await Wish.create({
                domain:req.body.domain,
                user:req.user.id
            });
            await User.findByIdAndUpdate(req.user.id,{
                $push:{
                    wishlist: {wish : wish}
                }
            });


        }
        return res.redirect('back');
 

    } catch (error) {
        console.log(error)
        return res.redirect('back')
    }
}
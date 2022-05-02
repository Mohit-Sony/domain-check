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
        data:wish_list.wishlist,
        keyword:'',
    })

    
}

module.exports.profile = function(req,res){
    return res.render('profile',{
        title:"profile | site name",
        keyword:'',

        // layout: './layouts/xyz'

    })
}

module.exports.toggletowishlist = async function(req,res){
    try {
        let user = await User.findById(req.user.id);
        // console.log(user);

        //check weather this wish previously exists or not 
        let wish = await Wish.findOne({user:req.user.id,domain:req.body.domain});

        console.log(`inside add to wishlist`);
        //if exist -> remove 
        if(wish){
            // console.log(`wish already exist`);
            // console.log(wish);
            await User.findByIdAndUpdate(req.user.id,{
                $pull:{
                    wishlist: {wish : wish}
                }
            });
            wish.remove();
            req.flash('sucess','wish removed sucessfully');
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
            
            req.flash('sucess','wish added sucessfully');


        }

        

        return res.redirect('back');
 

    } catch (error) {
        console.log(error)
        return res.redirect('back')
    }
}

module.exports.addtowishlist = async function(req,res){
    try {
        let user = await User.findById(req.user.id);
        // console.log(user);

        //check weather this wish previously exists or not 
        let wish = await Wish.findOne({user:req.user.id,domain:req.body.domain});

        console.log(`inside add to wishlist`);
        //if exist -> remove 
        if(wish){
            console.log(`wish already exist`);
            req.flash('sucess','wish already exists');
            // console.log(wish);
            //remove in 
        }else{
            //if not exits -> add to wishlist 
            console.log(`not exists`)

            wish = await Wish.create({
                domain:req.body.domain,
                user:req.user.id
            });
            await User.findByIdAndUpdate(req.user.id,{
                $push:{
                    wishlist: {wish : wish}
                }
            });
            req.flash('sucess','wish added sucessfully');


        }

        if(req.xhr){
            return res.status(200).json({
                data:wish
            });
        }
        return res.redirect('back');
 

    } catch (error) {
        console.log(error)
        req.flash('error',`Internal Server error : ${error}`)
        return res.redirect('back')
    }
}

module.exports.removefromwishlist = async function(req,res){
    try {
        let user = await User.findById(req.user.id);
        // console.log(user);

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
            req.flash('sucess','wish removed sucessfuly');
        }else{
                   //if not exits -> add to wishlist 
                   req.flash('error','wish does not exists')
                   console.log(`wish not exists`);
        }
        return res.redirect('back');
 

    } catch (error) {
        console.log(error)
        req.flash('error',`Internal Server error : ${error}`)
        return res.redirect('back')
    }
}
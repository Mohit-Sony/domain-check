// const { $where } = require("../../models/user");

console.log('ajax');
let add_wish_btn = document.getElementsByClassName('wishlist-btn');




for (let i of add_wish_btn){
    // console.log(i);
    i.addEventListener('click',function(e){
        e.preventDefault();
        e.stopPropagation();
        let form = $(i.parentNode);
        // console.log(form)
        // console.log(i.parentNode);
        // console.log('serialise' , i.parentElement.serialize());
        $.ajax({
            type:'post',
            url: '/user/profile/add-to-wishlist',
            data: form.serialize(),
            success: function(data){
                // console.log(data.data);
                // let newPost = newPostDom(data.data.post);
                $('button' , form ).html('<span class="iconify" data-icon="ant-design:heart-filled" style="color: green;"></span>');
                // deletePost($(' .delete-post-button' ,newPost ));
                // addComment( data.data.post._id );
                // deletecomment($(' delete-comment-button',newPost));
            },error: function(error){
                console.log(error.responseText);
            }
        })
        
    })
}
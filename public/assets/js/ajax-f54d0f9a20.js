console.log("ajax");let add_wish_btn=document.getElementsByClassName("wishlist-btn");for(let e of add_wish_btn)e.addEventListener("click",(function(t){t.preventDefault(),t.stopPropagation();let n=$(e.parentNode);$.ajax({type:"post",url:"/user/profile/add-to-wishlist",data:n.serialize(),success:function(e){$("button",n).html('<span class="iconify" data-icon="ant-design:heart-filled" style="color: green;"></span>')},error:function(e){console.log(e.responseText)}})}));
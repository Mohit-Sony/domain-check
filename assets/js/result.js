//generate list from keywords
//click on a div & change view - find availablity --done
function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
let clickAbleDiv = document.getElementsByClassName('unclicked');
let tlds = ["world","in","io"];
// let tldx = "<%= oth_tld %>"
// let tldx = <%= JSON.stringify(oth_tld) %>
console.log(tlds);
console.log(tldx.split(","));
tlds = tldx.split(",");

async function check_avail(domainName){
    // await timeout(1000);
    console.log(domainName)

    let resp = await fetch(`/checkavail/${domainName}`, {

	"method": "GET",

})
.then(response => {
    return response.json();
})
.then(data => {
    console.log(data.data);
    return data ;
})
.catch(err => {
	console.error(err);
});
    console.log(resp.data);
    return resp.data;
}

async function othextcheck(i,domain){
    // i.classList.remove("clicked");   Commented by ANIL
    i.classList.add("clicked-othext");
    //look for other extentions add them in html
    value = ""
    i.innerHTML += ` <div class="oth-ext-cont">
                     </div>    `
    tlds.forEach(tldstart);
    // console.log(value)
    async function tldstart(tldext){
        // value += `${domain}.${tldext}` ;

        let domainName = `${domain}.${tldext}`;
        await timeout(1000);
        resp = await check_avail(domainName);
        
        console.log(`response : ${resp.available}`);

        if(resp.available == true){
            console.log('true');
            i.getElementsByClassName('oth-ext-cont')[0].innerHTML +=  `   <div class="list-div-container clicked">
            <div class="row1-list-div-container">
                <div class="row1-icon-cont">
                    <div class="icon-cont avail-tick flex-center">
                        <span class="iconify" data-icon="teenyicons:tick-circle-solid"></span>
                    </div>
                </div>
                <div class="row1-domain-cont flex-left">
                    ${domain} <span style="color: var(--pink-color)">.${tldext}</span> 
                </div>
                <div class="row1-wishlist-cont flex-center ">
                    <form action="/user/profile/add-to-wishlist" method="post">
                        <input style="display: none;" type="text" name="domain" value ="${domain}.${tldext}" id="">
                        
                        <button type="submit" class="wishlist-btn">
                            <span class="iconify" data-icon="ant-design:heart-outlined"></span>
                        </button>
                        
                    </form>
                </div>
            </div>
        </div>`
        }//if available
        else{
            console.log('false')
            i.getElementsByClassName('oth-ext-cont')[0].innerHTML += `                    <div class="list-div-container clicked">
            <div class="row1-list-div-container">
                <div class="row1-icon-cont">
                    <div class="icon-cont avail-tick flex-center" style="background-color: red;">
                        <span class="iconify" data-icon="gridicons:cross-small" style="color: white;"></span>                      
                    </div>
                </div>

                <div class="row1-domain-cont flex-left">
                    ${domain} <span style="color: var(--pink-color)">.${tldext}</span> 
                </div>

                <div class="row1-wishlist-cont flex-center ">
                    <form action="/user/profile/add-to-wishlist" method="post">
                        <input style="display: none;" type="text" name="domain" value ="${domain}.${tldext}" id="">
                        
                        <button type="submit" class="wishlist-btn">
                            <span class="iconify" data-icon="ant-design:heart-outlined"></span>
                        </button>
                        
                    </form>
                </div>
            </div>
        </div>`
        }//if not available

        let add_wish = i.getElementsByClassName('wishlist-btn');


        for (let x of add_wish){
            // console.log(i);
            x.addEventListener('click',function(e){
                e.preventDefault();
                e.stopPropagation();
                let form = $(x.parentNode);
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
        
    } 


}

async function afterclick(i){
    {
        let domainName = i.getElementsByClassName('row1-domain-cont')[0].innerText;
        let index = domainName.indexOf(".")
        
        let domain = domainName.substring(0,index);
        let ext = domainName.substring(index+1);
        
        let resp = "s";
        resp = await check_avail(domainName);
        
        console.log(`response : ${resp.available}`);

        if(resp.available == true){
            i.classList.remove("unclicked");
            i.classList.add("clicked");
            i.innerHTML = `
            <div class="row1-list-div-container">
                <div class="row1-icon-cont">
                    <div class="icon-cont avail-tick flex-center">
                    <span class="iconify" data-icon="teenyicons:tick-small-outline"></span>
                    </div>
                </div>
                <div class="row1-domain-cont flex-left">
                ${domain} <span style="color: var(--pink-color);">.${ext}</span> 
                </div>
                <div class="row1-wishlist-cont flex-center ">
                <form action="/user/profile/add-to-wishlist" method="post">
                    <input style="display: none;" type="text" name="domain" value ="${domain}.${ext}" id="">
                    
                    <button type="submit" class="wishlist-btn">
                        <span class="iconify" data-icon="ant-design:heart-outlined"></span>
                    </button>
                    
                </form>
                </div>
            </div>
            <div class="row2-list-div-container">
                <div class="row2-register-now-cont flex-center">
                    <a href="#">
                        <div class="register-now">
                            Register Now
                        </div>
                    </a>
                    
                </div>
                <div class="row2-oth-ext-cont">
                    <a class="a-oth-ext" href="#">
                       Other Extensions <span class="iconify" data-icon="ep:arrow-right-bold"></span>
                    </a>
                </div>
            </div>`
        }else{
            i.classList.remove("unclicked");
            i.classList.add("clicked");
            i.innerHTML = `                <div class="row1-list-div-container">
            <div class="row1-icon-cont">
                <div class="icon-cont avail-tick flex-center" style="background-color: red;">
                <span class="iconify" data-icon="bx:x"></span>                      
                </div>
            </div>
            <div class="row1-domain-cont flex-left">
                ${domain} <span style="color: var(--pink-color);">.${ext}</span> 

            </div>
            <div class="row1-wishlist-cont flex-center ">
            <form action="/user/profile/add-to-wishlist" method="post">
                <input style="display: none;" type="text" name="domain" value ="${domain}.${ext}" id="">
                
                <button type="submit" class="wishlist-btn">
                    <span class="iconify" data-icon="ant-design:heart-outlined"></span>
                </button>
                
            </form>
            </div>
        </div>
        <div class="row2-list-div-container">
            <div class="row2-register-now-cont flex-center">
                <span style="color: red;">Oops!</span>
                
            </div>
            <div class="row2-oth-ext-cont">
                <a class="a-oth-ext" href="#" onclick = "anil()">
                    Other Extensions <span class="iconify oth-arrow" data-icon="ep:arrow-right-bold"></span>
                </a>
            </div>
        </div>`
        }

        i.getElementsByClassName("a-oth-ext")[0].addEventListener("click",function(e){
            e.preventDefault();
            e.stopPropagation();
            console.log('clicked');
            othextcheck(i,domain);
        });

        let add_wish = i.getElementsByClassName('wishlist-btn');


        for (let x of add_wish){
            // console.log(i);
            x.addEventListener('click',function(e){
                e.preventDefault();
                e.stopPropagation();
                let form = $(x.parentNode);
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



    }
}


for( let i of clickAbleDiv ){

        i.addEventListener("click", function(){
            afterclick(i);
        } );


        
}



// let otherArrow = document.getElementsByClassName('oth-arrow');
// let otherLink = document.getElementsByClassName('a-oth-ext');

// otherLink.addEventListener("click", function(){
//     otherArrow.style.transform = "rotate(90deg)";
// });

// function anil(){
//     otherArrow.style.transform = "rotate(90deg)";
// };



// -----ON SCROLL COLOR CHANGE----- 

var headerBg = document.getElementById('headerr');
var sidebarBg = document.getElementById('sidebar');

window.addEventListener("scroll", function() {

	let scroll = window.pageYOffset;

	if (scroll > 50) {
        headerBg.style.background = '#ffffffc0';
        sidebarBg.style.background = '#ffffffc0';

        // headerBg.className += 'header-scroll';
        // sidebarBg.className += 'sidebar-scroll';
        
    } else if (scroll < 50) {
		sidebarBg.style.background = '#ffffff63';
        headerBg.style.background = '#ffffff63';
        
        // headerBg.className -= 'header-scroll';
        // sidebarBg.className -= 'sidebar-scroll';
	}

});

let header_searchbar = $('#headerr input');
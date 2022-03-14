//generate list from keywords
//click on a div & change view - find availablity --done
function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
let clickAbleDiv = document.getElementsByClassName('unclicked');
let tlds = ["co","in","io"];

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
    i.classList.remove("clicked");
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
                        <span class="iconify" data-icon="charm:circle-tick"></span>
                    </div>
                </div>
                <div class="row1-domain-cont flex-left">
                    ${domain} <span style="color: #FF099C;">.${tldext}</span> 
                </div>
                <div class="row1-wishlist-cont flex-center ">
                    <span class="iconify" data-icon="ant-design:heart-outlined"></span>
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
                    ${domain} <span style="color: #FF099C;">.${tldext}</span> 
                </div>

                <div class="row1-wishlist-cont flex-center ">
                    <span class="iconify" data-icon="ant-design:heart-outlined"></span>
                </div>
            </div>
        </div>`
        }//if not available
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
                        <span class="iconify" data-icon="charm:circle-tick"></span>
                    </div>
                </div>
                <div class="row1-domain-cont flex-left">
                ${domain} <span style="color: #FF099C;">.${ext}</span> 
                </div>
                <div class="row1-wishlist-cont flex-center ">
                    <span class="iconify" data-icon="ant-design:heart-outlined"></span>
                </div>
            </div>
            <div class="row2-list-div-container">
                <div class="row2-register-now-cont flex-center">
                    <a href="/#">
                        <div class="register-now">
                            Register Now
                        </div>
                    </a>
                    
                </div>
                <div class="row2-oth-ext-cont">
                    <a class="a-oth-ext" href="#">
                        Oth. Extention
                    </a>
                </div>
            </div>`
        }else{
            i.classList.remove("unclicked");
            i.classList.add("clicked");
            i.innerHTML = `                <div class="row1-list-div-container">
            <div class="row1-icon-cont">
                <div class="icon-cont avail-tick flex-center" style="background-color: red;">
                    <span class="iconify" data-icon="gridicons:cross-small" style="color: white;"></span>                      
                </div>
            </div>
            <div class="row1-domain-cont flex-left">
                ${domain} <span style="color: #FF099C;">.${ext}</span> 

            </div>
            <div class="row1-wishlist-cont flex-center ">
                <span class="iconify" data-icon="ant-design:heart-outlined"></span>
            </div>
        </div>
        <div class="row2-list-div-container">
            <div class="row2-register-now-cont flex-center">
                <span style="color: red;">Oops</span>
                
            </div>
            <div class="row2-oth-ext-cont">
                <a class="a-oth-ext" href="#">
            Oth. Extention
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



    }
}


for( let i of clickAbleDiv ){

        i.addEventListener("click", function(){
            afterclick(i);
        } );


        
}



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

// const list = require('../assets/js/list');
const Prefixsuffix = require('../models/prefixsuffix');
const request = require('request');


module.exports.home = function(req,res){
    res.render('home');
}
module.exports.result = async function(req,res){
    try {
        console.log(req.query);
        let keyword = req.query.keyword;
        let ext = req.query["domain-ex"]
        console.log(keyword);
        
        //if keyword itself has a '.'
        if(keyword.indexOf(".") > 0 ){
            let index = keyword.indexOf(".");
            ext = keyword.substring(index);
            keyword = keyword.substring(0,index)
        }

        //check weather ext is valid or not




        let list = await Prefixsuffix.aggregate([{$match: {
            type: undefined
           }}, {$redact: {
            $cond: [
             {
              $gt: [
               {
                $strLenCP: '$Prefix/Suffix'
               },
               0
              ]
             },
             '$$KEEP',
             '$$PRUNE'
            ]
           }}, {$sample: {
            size: 50
           }}])
        // list = list;
        // console.log(list)


        
        

        return res.render('result',{
            keyword:keyword,
            ext:ext,
            list:list
        })




    } catch (error) {
        console.log('result :', error);
        return res.redirect('back');
    }



    // console.log(list);
   

    // res.end(keyword);
}
//#keyword to domains list 


//#filtering between them

module.exports.check_avail = function(req,res){
    let domain = req.params.domain;
    console.log(domain);


    const options = {
        method: 'GET',
        url: `https://api.godaddy.com/v1/domains/available?domain=${domain}&checkType=FAST&forTransfer=false`,
        headers: {
          'accept': 'application/json',
          'Authorization': 'sso-key e5NF9wiRjcAH_BTJjNmGCAE8NsDPggZgJP7:UrbtCR8VPq61FGhHquC95a',
          useQueryString: true
        }
    };
      
    
      request(options, function (error, response, body) {
          if (error) throw new Error(error);
      
          console.log(body);
          body = JSON.parse(body);
        
          console.log(body['available']);
        //   if(body.available == true){
        //     console.log('avail')
        //     available = true
        //     price = parseFloat((parseInt(body.price)/1000000)).toFixed(2)
        //   }else{
        //       available = false
        //       console.log('not avail')

        //       price = 0
        //   }
            return res.json(200, {
            data:body,
        });


        // avail :resp,
        // pri :price
        
    })
    //   return res.redirect('/');
      

}
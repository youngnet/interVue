
import $ from 'jquery';

function api(url, request){
    return new Promise((resolve, reject)=>{
        $.ajax({
            url,
            data:request,
            type:'POST',
            success:(data)=>{
                resolve(data);
                if(data.cd == 2){
                     setTimeout(() =>{
                        location.href="/logout"
                    },1500)
                }
               
            }
        })
    });
}

api.upload = function(url,dataform){
    return new Promise((resolve, reject) =>{
        
        $.ajax({
            url,
            data:dataform,
            type:'POST',
            contentType: false,  
            processData: false,  
            success:(data) =>{
              resolve(data)
            }
        })
    });
}

module.exports= api;

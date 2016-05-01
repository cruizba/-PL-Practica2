$(function() {

    //Variables
    var username;
    var api_key = "2dbe394baf14ce99b3aca8afb439f0ff";
    var url = "https://api.flickr.com/services/rest/?";
    var user_id;
    var user_info;
    
    //Envents
    $("#userSearchButton").click(function(){
        //username = $("#usernameInput").val();
        username = $("#usernameInput").val();
        getIdByUserName();
    })

    
    function restPetition(listParams){
        var result = url;
        for(i = 0; i < listParams.length; i++){
            result += listParams[i].param + "=";
            if (i == listParams.length - 1){
                result += listParams[i].value;
            }
            else{
                result += listParams[i].value + "&";
            }
        }
        return result;
    }
    
    //Functions
    function getIdByUserName(){
        //Params
        var urlRest = restPetition([
            {   "param" : "method",
                "value" : "flickr.people.findByUsername"
            },
            {   "param": "api_key",
                "value": api_key
            },
            {   "param": "username",
                "value": username
            },
            {   "param": "format",
                "value": "json"
            },
            {
                "param": "nojsoncallback",
                "value": "1"
            }
        ]);
        
        //Get data
        $.getJSON(urlRest)
        
        .done(function(data){
            if(data.stat == "fail"){
                console.log("User not found");
            }
            else{
                user_id = data.user.id;
                console.log(user_id);
                console.log("Id loaded");
            }
        })
        
        .fail(function(){
            console.log("Error al cargar el recurso");
        });
    }
    
})
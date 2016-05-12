$(function() {

    //Variables
    var username;
    var api_key = "2dbe394baf14ce99b3aca8afb439f0ff";
    var url = "https://api.flickr.com/services/rest/?";
    var user_id;
    var user_info;
    var galleries = [];
    
    //Envents
    $("#userSearchButton").click(function(){
        //username = $("#usernameInput").val();
        username = $("#usernameInput").val();
        getIdByUserName();
    })
    
    $("#enviar1").click(function(){
        var date = $("#date_input").val();
        console.log(date);
        getPhotosByMinDate(user_id, date);     
    })
    
    $("#enviar2").click(function(){
        var date = $("#date_input2").val();
        console.log(date);
        getPhotosByMaxDate(user_id, date);
    })
    
    $("#enviar3").click(function(){
        var tags = $("#input3").val();
        console.log(tags);
        getPhotosByTags(user_id, tags);
        
    })
    
    $("#enviar4").click(function(){
        var text = $("#input4").val();
        console.log(text);
        getPhotosByContent(user_id, text);
    })
    
    $("#enviar5").click(function(){
        //var num = $("#input5").val();
        //console.log(num);
        var input_name = $("#input5").val();
        getPhotosByUserId(user_id, input_name);
    })
    
    $("#enviar6").click(function(){
        var input_id = $("#galleries").val();
        getPhotosByGalleryId(input_id);
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
        $.getJSON({
            url: urlRest,
            async: false
        })

        .done(function(data){
            if(data.stat == "fail"){
                console.log("User not found");
            }
            else{
                    user_id = data.user.nsid;
                    console.log(user_id);
                    console.log("Id loaded");       
            }
        })

        .fail(function(){
            console.log("Error al cargar el recurso");
        });
        getGalleriesById(user_id)
        
    }
    
    function getPhotosByMinDate(user_id, date_input){
        //Params
        var urlRest = restPetition([
            {   "param" : "method",
                "value" : "flickr.photos.search"
            },
            {   "param": "api_key",
                "value": api_key
            },
            {
                "param": "user_id",
                "value": user_id
            },
            {
                "param": "min_taken_date",
                "value": date_input + " 00:00:00"
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
                console.log("Fallo al cargar imágenes");
                alert("Fallo al cargar imágenes");
            }
            else{ 
                $("#criterio").empty();
                console.log("Criterio borrado");
                photos = data;
                console.log(photos);
                $("#criterio").append($("<h2>Resultados a partir de " + date_input + " </h2>"));
                console.log("criterio escrito")
                mostrar_fotos(photos);
            }
        })
        
        .fail(function(){
            console.log("Error al cargar el recurso");
        });
    }
    
    function getPhotosByMaxDate(user_id, date_input){
        //Params
        var urlRest = restPetition([
            {   "param" : "method",
                "value" : "flickr.photos.search"
            },
            {   "param": "api_key",
                "value": api_key
            },
            {
                "param": "user_id",
                "value": user_id
            },
            {
                "param": "max_taken_date",
                "value": date_input + " 00:00:00"
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
                console.log("Fallo al cargar imágenes");
                alert("Fallo al cargar imágenes");
            }
            else{ 
                $("#criterio").empty();
                console.log("Criterio borrado");
                photos = data;
                console.log(photos);
                $("#criterio").append($("<h2>Resultados hasta " + date_input + " </h2>"));
                console.log("criterio escrito")
                mostrar_fotos(photos);
            }
        })
        
        .fail(function(){
            console.log("Error al cargar el recurso");
        });
    }
    
    function getPhotosByTags(user_id, tags){
        //Params
        var urlRest = restPetition([
            {   "param" : "method",
                "value" : "flickr.photos.search"
            },
            {   "param": "api_key",
                "value": api_key
            },
            {
                "param": "user_id",
                "value": user_id
            },
            {
                "param": "tags",
                "value": tags
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
                console.log("Fallo al cargar imágenes");
                alert("Fallo al cargar imágenes");
            }
            else{ 
                $("#criterio").empty();
                console.log("Criterio borrado");
                photos = data;
                console.log(photos);
                $("#criterio").append($("<h2>Resultados por las etiquetas: " + tags + " </h2>"));
                console.log("criterio escrito")
                mostrar_fotos(photos);
            }
        })
        
        .fail(function(){
            console.log("Error al cargar el recurso");
        });
    }
    
    function getPhotosByContent(user_id, content){
        //Params
        var urlRest = restPetition([
            {   "param" : "method",
                "value" : "flickr.photos.search"
            },
            {   "param": "api_key",
                "value": api_key
            },
            {
                "param": "user_id",
                "value": user_id
            },
            {
                "param": "text",
                "value": content
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
                console.log("Fallo al cargar imágenes");
                alert("Fallo al cargar imágenes");
            }
            else{ 
                $("#criterio").empty();
                console.log("Criterio borrado");
                photos = data;
                console.log(photos);
                $("#criterio").append($("<h2>Fotos que contienen el siguiente texto: " + content + " </h2>"));
                console.log("criterio escrito")
                mostrar_fotos(photos);
            }
        })
        
        .fail(function(){
            console.log("Error al cargar el recurso");
        });
    }
    
    function getPhotosByUserId(user_id, input_name){
        //Params
        var fileteredArray = {"photos" : {"photo" : []}};
        var urlRest = restPetition([
            {   "param" : "method",
                "value" : "flickr.photos.search"
            },
            {   "param": "api_key",
                "value": api_key
            },
            {
                "param": "user_id",
                "value": user_id
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
                console.log("Fallo al cargar imágenes");
                alert("Fallo al cargar imágenes");
            }
            else{ 
                var i;
               for(i = 0; i < data.photos.photo.length; i++){
                    var title = data.photos.photo[i].title.toString();
                    if(title.indexOf(input_name) != -1){
                        fileteredArray.photos.photo.push(data.photos.photo[i]);
                    }
                    
               }
                console.log(fileteredArray);
                $("#criterio").empty();
                console.log("Criterio borrado");
                $("#criterio").append($("<h2>Resultados por titulos que contienen:  " + input_name + " </h2>"));
                console.log("criterio escrito")
                mostrar_fotos(fileteredArray);
            }
        })
        
        .fail(function(){
            console.log("Error al cargar el recurso");
        });
    }
    
    function getGalleriesById(user_id){
        //Params
        var urlRest = restPetition([
            {   "param" : "method",
                "value" : "flickr.galleries.getList"
            },
            {   "param": "api_key",
                "value": api_key
            },
            {
                "param": "user_id",
                "value": user_id
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
        $.getJSON({
            url: urlRest,
            async: false
        })
        
        .done(function(data){
            if(data.stat == "fail"){
                console.log("Fallo al cargar galerias");
                alert("Fallo al cargar galerías");
            }
            else{ 
                var i;
                for(i = 0; i < data.galleries.gallery.length; i++){
                    var gallery = data.galleries.gallery[i];
                    galleries.push(data.galleries.gallery[i]);
                }
                console.log(galleries);
                console.log("Galerias cargadas");
                for(i = 0; i < galleries.length; i++){
                    $("#galleries").append($("<option>" + galleries[i].title._content +"</option>").attr("value", galleries[i].id));
                }
            }
        })
        
        .fail(function(){
            console.log("Error al cargar el recurso");
        });
    }
    
    function getPhotosByGalleryId(gallery_id){
        //Params
        var urlRest = restPetition([
            {   "param" : "method",
                "value" : "flickr.galleries.getPhotos"
            },
            {   "param": "api_key",
                "value": api_key
            },
            {
                "param": "gallery_id",
                "value": gallery_id 
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
        $.getJSON({
            url: urlRest,
        })
        
        .done(function(data){
            if(data.stat == "fail"){
                console.log("Fallo al cargar galerias");
                alert("Fallo al cargar galerías");
            }
            else{ 
                $("#criterio").empty();
                console.log("Criterio borrado");
                photos = data;
                console.log(photos);
                $("#criterio").append($("<h2>Fotos de la galeria </h2>"));
                console.log("criterio escrito");
                mostrar_fotos(photos);
            }
        })
        
        .fail(function(){
            console.log("Error al cargar el recurso");
        });
    }
    
    /*
    function getPhotosByUserId(user_id){
        //Params
        var urlRest = restPetition([
            {   "param" : "method",
                "value" : "flickr.photos.search"
            },
            {   "param": "api_key",
                "value": api_key
            },
            {
                "param": "user_id",
                "value": user_id
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
                console.log("Fallo al cargar imágenes");
                alert("Fallo al cargar imágenes");
            }
            else{ 
                var i;
                var photos = data.photos.photo;
                var urls = [];
                var petitionsArray = [];
                var totalFavs;
                for(i = 0; i < photos.length; i++){
                    var photo_id = data.photos.photo[i].id;
                    
                    //url string method
                    var urlRest = restPetition([
                        {   "param" : "method",
                            "value" : "flickr.photos.getFavorites"
                        },
                        {   "param": "api_key",
                            "value": api_key
                        },
                        {
                            "param": "photo_id",
                            "value": photo_id
                        },
                        {   "param": "format",
                            "value": "json"
                        },
                        {
                            "param": "nojsoncallback",
                            "value": "1"
                        }
                    ]);
                    urls.push(urlRest);
                    var xmlhttp = new XMLHttpRequest();
                    petitionsArray.push(xmlhttp);
                }
                
                var j;
                console.log(urls);
                for(j = 0; j < urls.length; j++){
                    //Rest petition without background
                    var xmlhttpItem = petitionsArray[j];
                    
                    //Petition
                    xmlhttpItem.open("GET", urls[j], true);
                    xmlhttpItem.send();
                    //Response Listener
                    xmlhttpItem.onreadystatechange = function(){
                        if (xmlhttpItem.readyState == 4 && xmlhttpItem.status == 200){
                            totalFavs = JSON.parse(xmlhttpItem.responseText);
                            console.log(totalFavs);
                            console.log(j);
                        }
                    } 
                }
                
                
            }
        })
        
        .fail(function(){
            console.log("Error al cargar el recurso");
        });
    }
        
    function getFavsByPhotoId(photo_id){
        //Params
        var urlRest = restPetition([
            {   "param" : "method",
                "value" : "flickr.photos.search"
            },
            {   "param": "api_key",
                "value": api_key
            },
            {
                "param": "photo_id",
                "value": photo_id
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
                console.log("Fallo al cargar Favoritos");
                alert("Fallo al cargar favoritos");
            }
            else{ 
                var favs = data.photo.total;
                console.log(favs);
            }
        })
        
        .fail(function(){
            console.log("Error al cargar el recurso");
        });
    }
    
    */
    
    function mostrar_fotos(info){
        var i;
        $("#images").empty();
        if(info.photos.photo.length == 0){
            $("#images").append($("<p>Sin resultados</p>"));
        }
        for (i=0;i<info.photos.photo.length;i++) {
           var item = info.photos.photo[i];
           var url = 'https://farm'+item.farm+".staticflickr.com/"+item.server
                      +'/'+item.id+'_'+item.secret+'_c.jpg';
           console.debug(url);
           $("#images").append($("<img/>").attr("src",url));
        }
    }
    
    
})
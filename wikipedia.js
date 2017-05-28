 $(document).ready(function() {
   $("#button").on('click', function() {

    //variable that tracks what is searched for
    var entry = document.getElementById("search"); 

    $.ajax({
     type: "GET",
     url: "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch="+entry.value+"&format=json",
     dataType: "jsonp",
     success: function(json) {
       var div = document.getElementById("results");
       div.innerHTML = "";

         //variable that stores the number of search hits
         var hits = json.query.searchinfo.totalhits;

         $("#hits").html(entry);

         //loop that goes through the first 10 hits or all if there are less
         for (i = 0; i < 10 && i < hits; i++) {
           var title_json = json.query.search[i].title;
           $.ajax({
             url: "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles="+title_json,
             dataType: "jsonp",
             success: function(json_ext) {
               var pages = json_ext.query.pages;
               var page_id = Object.keys(pages)[0];

               //variable that stores title of found wikipedia page
               var title_jsonext = json_ext.query.pages[page_id].title;

               //variable that stores an extract of found wikipedia page
               var extract = json_ext.query.pages[page_id].extract;
               var newdiv = '<div class="box"><div class="title">';
               newdiv += '<a href="https://en.wikipedia.org/wiki/'+title_jsonext+'">'+title_jsonext+'</a></div>';
               newdiv += '<div class="extract">'+extract+'</div></div>';
               var div = document.getElementById("results");

               //adds found title and extract to results div
               div.innerHTML += newdiv;
             },
             cache: false,
          }); // ajax extract
        } //end loop
      }, //end success
    }); //end ajax

    //moves search field to top of page after search
    document.getElementById("inner").className = "move_search";

    //moves random-article button to top of page after search
    document.getElementById("random").className = "move_random";

    //resets search form
    document.getElementById("form").reset();
  }); //end button function

 }) // end document
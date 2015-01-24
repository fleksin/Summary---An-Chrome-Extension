var $links = $('[href]');
var x = 10;
var y = 10;
var top;
var left;

var loaded = false;

$links.mouseover(function(e){
	
	var top = e.clientY + y;
	var left = e.clientX + x
	var width = document.documentElement.clientWidth;
	var position;

    if( left < (width / 2) ) position = 0 ;
	else  position = 1 ;	
		
    $("#mytooltip").remove();
	var $link = this.href;
   
	
	var tooltip = "<div id='mytooltip' ;'>loading page, please wait...</div>";
	$("body").append(tooltip);
	
	
	$("#mytooltip").css({
         	"top": top + "px", 
        	"left": left + "px" 
		});
	
	$("#mytooltip").show("fast");
	
	console.log("mouseover link " + $link);
	
	//if(!loaded)
	$.ajax({
		type: "GET",
		url: $link,
		success: function(data) {
			setTimeout(function(){
				loaded = true;
			
				var size = 0;
				var imageURL;
				var image = "there are no pictures in this page<br><br>";
			    var img = new Image();
				
			    $(data).ready(function(){
				console.log("Dom is ready");
				var $imgs = $(data).find("img").each(function(index, element) {
					
					img.src = $(this).attr("src");
				
					var thisSize = img.height * img.width;
                	if(size < thisSize) {
						size = thisSize;
						imageURL = $(this).attr("src");
					}
            	});			
				
				if(size != 0){
					image = "<br><div align='center'><img id='maxImage' src='"+ imageURL + "'></img></div></br>";
					console.log("The largest picture: "+ imageURL);
					}
				
				
				var textt= $(data).find("p");
				
				$("#mytooltip").html( "<h2 align='center'>"+$(data).filter("title").text() +"</h2>" +image +"<div id='cusPara'>"+"<p>" +$(textt[0]).text()+ "</p>"+ "<p>" +$(textt[1]).text()+ "</p>"+ "<p>" +$(textt[2]).text()+ "</p>"+ "<p>" +$(textt[3]).text()+ "</p>"
				                      + "<p>" +$(textt[4]).text()+ "</p>"+ "</div>");
				
				//console.log("paragraph is :"+ text);
				
				var bgColor = $(data).find("div").css('background-color'); 
				//alert(bgColor);
				            
	            switch ( position ){
				
	                case (0):
					top = y ;
					left = width - $("#mytooltip").width() - 100;
	
              		break;
	                case (1): 
					top = y;
					left = x ;
					
					break;
							
					default:	
				}
                
				$("#mytooltip").css("background-color", bgColor);
				$("#mytooltip").css({
      				"top": top + "px",  
					"left": left + "px"					
				});			
				});				
			}  , 200);
		},
		error: function(data) {
			loaded = true;
			$("#mytooltip").html("<html><head><title>Error</title></head><body>Error, cannot read from this link</body><html>").show("fast");
		},
		complete: function() {
			loaded = true;
		},
		timeout: function() {
			loaded = false;
			$("#mytooltip").html("<html><head><title>Error</title></head><body>Error, timeout</body><html>").show("fast");
		}
	});
}).mouseout(function(e){
	loaded = false;
	 
	$("#mytooltip").delay(600).hide(0);

	

})
	
	



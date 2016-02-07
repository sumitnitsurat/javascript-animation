 var callingAnimation = callingAnimation || {}
 callingAnimation.call = {
	divAccept:'',
	divReject:'',
	divMessage:'',
	image:'',
	intervalId :null,
	animationTimeout : null
 };
/* self invoking function when the javacript loads */
(function(){
var div = document.createElement('div'); //parent div
	div.id="maindiv";
	div.setAttribute("width", "100");
	div.setAttribute("height", "22");

document.body.appendChild(div);
document.body.style.background ="gainsboro";

var heading = document.createElement('h2');
	div.appendChild(heading);

var txt = document.createTextNode("Sumit Calling");
	heading.appendChild(txt);
	heading.style.margin = "3% 0% 0% 17%";

//call icon image 
callingAnimation.call.image = document.createElement("IMG");
callingAnimation.call.image.id="callIcon";
callingAnimation.call.image.setAttribute("src", "callIcon.png");
callingAnimation.call.image.setAttribute("width", "50");
callingAnimation.call.image.setAttribute("height", "32");
callingAnimation.call.image.setAttribute("alt", "calling image");
callingAnimation.call.image.setAttribute("border", "7");
div.appendChild(callingAnimation.call.image);
	
document.getElementById("callIcon").style.margin ="15% 19%";
document.getElementById("callIcon").style.borderRadius ="50%";

var node = document.getElementsByTagName("div")[0];
var longpress = false;
var presstimer = null;

/*
*called when mouse left or out of the image
*removing div element created at the long press
*calling the startCycle function using setTimeout
*setting up the image base attributes 
*/
var cancel = function(e) {
    if(presstimer !== null) {
	var el = document.getElementsByClassName('options');
	
	for(var i=0 ,len=el.length; i<len ;++i) {
		node.removeChild(el[i]);
	}
        clearTimeout(presstimer);
		//intervalId = setInterval(frame, 500); 
		animationTimeout=setTimeout(startCycle, 100);
		callingAnimation.call.image.setAttribute("width", "50");
		callingAnimation.call.image.setAttribute("height", "32");
		callingAnimation.call.image.style.borderColor ="#000";
    }
};
/*
*called when user click on the call icon
*check for the setinterval object of long press call
*notified user to press and hold the button for some time
*/
var click = function(e) {
    if(presstimer !== null) {
        clearTimeout(presstimer);
    }
    if(longpress) {
	callingAnimation.call.image.setAttribute("width", "70");
    callingAnimation.call.image.setAttribute("height", "42");
        return false;
    }
    alert(" Please press  and hold");
};

/*
*called when user long press the call icon
*check if it is click event, return 
*otherwise call function using settimeout after some time 
*show the accept , rejct and send message text
*change the border color to red
*/
var start = function(e) {
    console.log(e);
    if(e.type === "click" && e.button !== 0) {
        return;
    }
    longpress = false;
	
    presstimer = setTimeout(function() {
      //  console.log("inside loop");
	clearInterval(callingAnimation.call.intervalId);
	callingAnimation.call.image.setAttribute("width", "70");
    callingAnimation.call.image.setAttribute("height", "42");
	callingAnimation.call.image.style.borderColor = "red"; 
		
	callingAnimation.call.divAccept = document.createElement("div");
	callingAnimation.call.divAccept.setAttribute("class","options");
	callingAnimation.call.divAccept.id ="accept";
	var txtAccept = document.createTextNode("Accept");
	callingAnimation.call.divAccept.appendChild(txtAccept);	
    div.appendChild(callingAnimation.call.divAccept);		
	document.getElementById("accept").style.margin ="-18% 5% ";

	callingAnimation.call.divReject = document.createElement("div");
	callingAnimation.call.divReject.setAttribute("class","options");
	callingAnimation.call.divReject.id ="reject";
	var txtReject = document.createTextNode("Reject");
	callingAnimation.call.divReject.appendChild(txtReject);
	div.appendChild(callingAnimation.call.divReject);
	document.getElementById("reject").style.margin ="17% 35%";

	callingAnimation.call.divMessage = document.createElement("div");
	callingAnimation.call.divMessage.setAttribute("class","options");
	callingAnimation.call.divMessage.id ="sendmessage";
	var txtMessage = document.createTextNode("Send Message");
	callingAnimation.call.divMessage.appendChild(txtMessage);
	div.appendChild(callingAnimation.call.divMessage);
	document.getElementById("sendmessage").style.margin ="-30% 19%";
	
    longpress = true;
	}, 1000);
    return false;
};
//dot animation with the help of setinterval call
var span = document.createElement("span");
	span.id="dot";
	heading.appendChild(span);

var dots= window.setInterval(function(){
var dot = document.getElementById("dot");
var dotcolor = getRandomColor();
	if(dot.innerHTML.length>3)
	dot.innerHTML="";
	else{
	dot.innerHTML+=".";
	dot.style.color=dotcolor;
	}
},500);

//mouse event handling on call icon

var nodeImg = document.getElementsByTagName("img")[0];
	nodeImg.addEventListener("mousedown", start);
	nodeImg.addEventListener("click", click);
	nodeImg.addEventListener("mouseout", cancel);
	nodeImg.addEventListener("mouseleave", cancel);
	startCycle();
}());

/*
*animating the call icon by incresing its size 
*changing border color with random color get by getRandomColor()
*/
function startCycle(){
	var left = 0;
	if(callingAnimation.call.animationTimeout !== null) {
		clearTimeout(callingAnimation.call.animationTimeout);
		clearInterval(callingAnimation.call.intervalId);
	}
	
	callingAnimation.call.intervalId = setInterval(function(){
	left=parseInt(left)+20;
	var w = 50 ;
	var h = 32;
	w = parseInt(w)+parseInt(left);
	h = parseInt(h)+parseInt(left);
    
	callingAnimation.call.image.setAttribute("width", w);
    callingAnimation.call.image.setAttribute("height", h);
	var colornew = getRandomColor();
	callingAnimation.call.image.style.borderColor=colornew;
    if (left == 80)  // check finish condition
	left=0; 
	}, 500); 
}

//generate random color
function getRandomColor(){
	var letters = "1234567890ABCDEF".split('');
	var color="#";
	for(var i= 0 ; i<6 ; ++i)
		color += letters[Math.floor(Math.random() * 16)];
	return color;
}
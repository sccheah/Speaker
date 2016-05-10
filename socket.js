//var URL = "wss://uspeakr.herokuapp.com/api/conn";
//var URL2 = "img_url";
var callClose = false;
var timerstopped = "false";

var sock = new WebSocket('wss://uspeakr.herokuapp.com/api/conn');
//var sock_pic = new WebSocket('http://);

sock.onopen = function() {
   console.log('sock open');
};
sock.onmessage = function(e) {
  //console.log('message', "sock Received: "+e.data);
	var receive = JSON.parse(e.data);
	if(receive.type == "text") {
		text_callback(e.data);
		makeLastCall(e.data);
	}
	else {
		image_callback(e.data);
	}
};
sock.onclose = function() {
   console.log('sock close');
	 if(!callClose) {
		 sock = new WebSocket('wss://uspeakr.herokuapp.com/api/conn');
	 }
};

function sendSpeech(txt, last) {
	var txtJSON = '{ "type": "text", "message": "' + txt + '" }';
	//txtJSON = JSON.parse(txtJSON);
	timerstopped = last;
  sock.send(txtJSON); //send text to get analyzed
	//console.log(txt);
	
}


function sendPic(pic) {
	var picJSON = '{ "type": "image", "b64": "' + pic + '" }';
	//picJSON = JSON.parse(picJSON);
	sock.send(picJSON);
}

function closeSock() {
	callClose = true;
	sock.close();
	//sock_pic.close();
}
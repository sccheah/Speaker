var SNAP_INTERVAL = 3000; //in ms
var beginPic;

Webcam.attach( '#my_camera' );

function take_snapshot() 
{
    Webcam.snap( function(data_uri) 
    {
		sendPic(data_uri);
	});
}

function auto_snapshot()
{
	if (Webcam.live == true)
	{
		beginPic = setInterval(take_snapshot, SNAP_INTERVAL);
	}
	else
	{
		alert("Error, camera is not live.");
	}
}

function start_auto_snap()
{
	//var sock = new WebSocket('wss://uspeakr.herokuapp.com/api/conn');
	auto_snapshot();
	beginSpeech();
	var recording = document.getElementById("recording");
	recording.style.display = "inline-block";
}

function stop_auto_snap() {
	stopTimer();
	clearInterval(beginPic);
	setTimeout(closeSock,3000);
	var recording = document.getElementById("recording");
	recording.style.display = "none";
}
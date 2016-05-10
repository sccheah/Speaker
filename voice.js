var timer = 0;
var SEND_INTERVAL = 5;
var beginTimer = setInterval(callTimer,1500);
var wholeSpeech = "";
var speechtxt = new Array();
var stopped = "false";

var umCounter=0;
var likeCounter=0;

function beginSpeech() {
if (annyang) {
  // Let's define a command.
  var anything = function(anything) {
    //alert(anything);
		var TypeOut = document.getElementById("listening");
		var detected = document.createTextNode(anything + ". ");
		TypeOut.appendChild(detected);	
  };
  var commands = {
    '*anything': anything
  };

  // Add our commands to annyang
  annyang.addCommands(commands);

  // Start listening. You can call this here, or attach this call to an event, button, etc.
  //annyang.start();

  var recognition = annyang.getSpeechRecognizer();
  var final_transcript = '';
  recognition.interimResults = true;
  annyang.start();

  recognition.onresult = function(event) {
    var interim_transcript = '';
    final_transcript = '';
    for (var i = event.resultIndex; i < event.results.length; ++i) {
			if (event.results[i].isFinal) {
				final_transcript += event.results[i][0].transcript + " ";
				//-->console.log("final: " + final_transcript);
				wholeSpeech += final_transcript;
				sendSpeech(final_transcript); //The final string (when there is pause) = most accurate
        //console.log("final_transcript");
        //console.log(final_transcript);
        //annyang.trigger(final_transcript); //If the sentence is "final" for the Web Speech API, we can try to trigger the sentence
      } else {
        interim_transcript += event.results[i][0].transcript;
        //console.log("interim_transcript");
        //console.log(interim_transcript);
      }
    }
    if(true) {
			//console.log("timer : " + timer + " Interim: " + interim_transcript);
			speechtxt.push(interim_transcript);
		}
    //call trigger every 5 seconds
  };
}

}

function callTimer() {
	if(speechtxt.length > 0 && speechtxt[speechtxt.length-1].length > 6) {
		//console.log(speechtxt[speechtxt.length-1]);
		sendSpeech(speechtxt[speechtxt.length-1], stopped);
	}
	if(timer >= 5) {
		speechtxt = [];
		timer = 0;
	}
	else {
		speechtxt = [];
		timer++;
	}
}

function stopTimer() {
	annyang.abort();
  stopped = "true";
	sendSpeech(wholeSpeech, stopped);
	clearInterval(beginTimer);
	//console.log(stopped);
}

function makeLastCall(data) {
  //console.log(stopped);

  if (data != null)
  {
    if (isStopped())
    {
      lastCall(data);
    }

  }
}

function isStopped()
{
  if (stopped == "true")
  {
    return true;
  }

  if (stopped == "false")
  {
    return false;
  }
}




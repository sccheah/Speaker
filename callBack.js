var prevState; // checks to see if previous emotion was the same
var faceIndex = 0;	// allows the faceIndex number to increment to the next statement if it is the same
var textIndex = 0;

// agreeableness and joy
var happinessGreen = ["Good Job!", "Keep it up!", "Way to go!", "GREAT!", "Awesome!", "Fantastic!"];
var neutralYellow = ["Almost there!", "Try a little harder!", "You're close!", "Keep trying!",
						"Don't give up!", "So close!"];
var zoneRed = ["Remember to smile!", "Don't forget to smile!", "Smile!", "Look happy!",
				"You depress me.", "That's embarassing."];

var textGreen = ["Nice Tone!", "Sounds Great!", "Very Nice!", "Good job!", "You're golden!",
					"Are you trying to seduce me?"];
var textRed = ["Be more uplifting!", "You can do better!", "Change it up!", "Keep trying!",
				"Grandma, is that you?", "I'd lke to stay awake, please."];

function image_callback(data) // may have to deal with the case to change from string to object
{

	if (faceIndex == 5)
		faceIndex = 0;

	var hapScore;
	var neutScore;

	if (data != null) // if there is data in the callback
	{
		data = JSON.parse(data);

		hapScore = data.happiness; // assuming happiness is sent back frist
		neutScore = data.neutral; // assuming neutral is sent back second

		if ((hapScore >= neutScore) && (hapScore >= 0.5)) // if happiness is the highest score
		{
			displayFacialText(happinessGreen[faceIndex]);
			faceIndex++;
		}

		if ((neutScore >= hapScore) && (neutScore >= 0.5)) // if neutral is the highest score
		{	
			displayFacialText(neutralYellow[faceIndex]);
			faceIndex++;
		}

		if ((neutScore < 0.5 && hapScore < 0.5)) // default case if happiness and neutral score are below 0.5
		{
			displayFacialText(zoneRed[faceIndex]);
			faceIndex++;
		}
	}
}

function displayFacialText(str)
{
	//var text = str[index];
	//var textNode = document.createTextNode(text);
	var el = document.getElementById("facialExpression");
	el.textContent = str;
}

function text_callback(data) // Call back function for the text
{
	if (textIndex == 5)
		textIndex = 0;

	var agreeScore;
	var joyScore;

	if (data != null) // data has been received 
	{	
		data = JSON.parse(data);

		agreeScore = data.agreeableness; // assumes that the first thing sent is agreeableness
		joyScore = data.joy; // assumes that the second thing is joy

		if ((agreeScore >= 0.5) || (joyScore >= 0.5))
		{
			displayToneText(textGreen[textIndex]);
			textIndex++;
		}
		if ((agreeScore < 0.5) && (joyScore < 0.5))
		{
			displayToneText(textRed[textIndex]);
			textIndex++;
		}
	}
}

function displayToneText(str)
{
	//console.log("ASEFWAGR");
	//console.log(str);
	//var text = str[index];
	//var textNode = document.createTextNode(text);
	var el = document.getElementById("textTone");
	el.textContent = str;
}

function lastCall(data)
{
	var agreeScore;
	var joyScore;
	var umUhCtr;
	var likeCtr;

	if (data != null)
	{
		console.log(data);
		data = JSON.parse(data);
		agreeScore = data.agreeableness;
		joyScore = data.joy;
		//umUhCtr = data.um;
		umUhCtr = faceIndex + data.um;
		likeCtr = data.like;


		var el = document.getElementById("faceText");
		el.textContent = "";

		var finalHead = document.createElement("h3");
		finalHead.textContent = "Average Rating for Text Tone:";
		el.appendChild(finalHead);

		var agreePar = document.createElement("p");
		agreePar.textContent = "Agreeableness: " + agreeScore;
		el.appendChild(agreePar);

		//var newLine = document.createElement("br");
		//el.appendChild(newLine);

		var joyPar = document.createElement("p");
		joyPar.textContent = "Joy: " + joyScore;
		el.appendChild(joyPar);

		//el.appendChild(newLine);
		//el.appendChild(newLine);

		var uhPar = document.createElement("p");
		uhPar.textContent = "Uhm/Uhh Filler: " + umUhCtr;
		el.appendChild(uhPar);

		//el.appendChild(newLine);

		var likePar = document.createElement("p");
		likePar.textContent = "Like Filler: " + likeCtr;
		el.appendChild(likePar);
	}
}













View = {
	displayForecastOne: function(dayOneForecast)
	{
		var node;
		var svgDisplay;

		var reversed = dayOneForecast.date.split(' ').reverse().join(' ');
		result = reversed.substr(reversed.indexOf(" ") + 1);

		node = document.getElementById("dayOne");
		node.textContent = result;
		node = document.getElementById("dayOneLow");
		node.textContent = dayOneForecast.low;
		node = document.getElementById("dayOneHigh");
		node.textContent = dayOneForecast.high;
		node = document.getElementById("descOne");
		node.textContent = dayOneForecast.text;

		svgDisplay = this.getSvgCode(dayOneForecast.text);
		node = document.getElementById("dayOneSvg");
		node.src = svgDisplay;
	},

	displayForecastTwo: function(dayTwoForecast)
	{
		var node;
		var svgDisplay;

		var reversed = dayTwoForecast.date.split(' ').reverse().join(' ');
		result = reversed.substr(reversed.indexOf(" ") + 1);

		node = document.getElementById("dayTwo");
		node.textContent = result;
		node = document.getElementById("dayTwoLow");
		node.textContent = dayTwoForecast.low;
		node = document.getElementById("dayTwoHigh");
		node.textContent = dayTwoForecast.high;
		node = document.getElementById("descTwo");
		node.textContent = dayTwoForecast.text;

		svgDisplay = this.getSvgCode(dayTwoForecast.text);
		node = document.getElementById("dayTwoSvg");
		node.src = svgDisplay;
	},

	displayForecastThree: function(dayThreeForecast)
	{
		var node;
		var svgDisplay;

		var reversed = dayThreeForecast.date.split(' ').reverse().join(' ');
		result = reversed.substr(reversed.indexOf(" ") + 1);

		node = document.getElementById("dayThree");
		node.textContent = result;
		node = document.getElementById("dayThreeLow");
		node.textContent = dayThreeForecast.low;
		node = document.getElementById("dayThreeHigh");
		node.textContent = dayThreeForecast.high;
		node = document.getElementById("descThree");
		node.textContent = dayThreeForecast.text;

		svgDisplay = this.getSvgCode(dayThreeForecast.text);
		node = document.getElementById("dayThreeSvg");
		node.src = svgDisplay;
	},

	displayForecastFour: function(dayFourForecast)
	{
		var node;
		var svgDisplay;

		var reversed = dayFourForecast.date.split(' ').reverse().join(' ');
		result = reversed.substr(reversed.indexOf(" ") + 1);

		node = document.getElementById("dayFour");
		node.textContent = result;
		node = document.getElementById("dayFourLow");
		node.textContent = dayFourForecast.low;
		node = document.getElementById("dayFourHigh");
		node.textContent = dayFourForecast.high;
		node = document.getElementById("descFour");
		node.textContent = dayFourForecast.text;

		svgDisplay = this.getSvgCode(dayFourForecast.text);
		node = document.getElementById("dayFourSvg");
		node.src = svgDisplay;
	},

	displayForecastFive: function(dayFiveForecast)
	{
		var node;
		var svgDisplay;

		var reversed = dayFiveForecast.date.split(' ').reverse().join(' ');
		result = reversed.substr(reversed.indexOf(" ") + 1);

		node = document.getElementById("dayFive");
		node.textContent = result;
		node = document.getElementById("dayFiveLow");
		node.textContent = dayFiveForecast.low;
		node = document.getElementById("dayFiveHigh");
		node.textContent = dayFiveForecast.high;
		node = document.getElementById("descFive");
		node.textContent = dayFiveForecast.text;

		svgDisplay = this.getSvgCode(dayFiveForecast.text);
		node = document.getElementById("dayFiveSvg");
		node.src = svgDisplay;
	},

	getSvgCode: function(description)
	{
		switch (description)
		{
			case "Breezy":
				return "Forecast_Wind.svg";
			break;

			case "Sunny":
				return "Forecast_Sunny.svg"; 
			break;

			case "Tropical Storm":
				return "Forecast_Stormy.svg";
			break;

			case "Thunderstorms":
				return "Forecast_Stormy.svg";
			break;

			case "Mixed Rain and Snow":
				return "Forecast_Precipitation.svg";
			break;

			case "Mixed Rain and Sleet":
				return "Forecast_Precipitation.svg";
			break;

			case "Freezing Drizzle":
				return "Forecast_Precipitation.svg";
			break;

			case "Drizzle":
				return "Forecast_Precipitation.svg";
			break;

			case "Freezing Rain":
				return "Forecast_Precipitation.svg";
			break;

			case "Showers":
				return "Forecast_Precipitation.svg";
			break;

			case "Hail":
				return "Forecast_Stormy.svg";
			break;

			case "Sleet":
				return "Forecast_Precipitation.svg";
			break;

			case "Windy":
				return "Forecast_Wind.svg";
			break;

			case "Cold":
				return "Forecast_Wind.svg";
			break;

			case "Cloudy":
				return "Forecast_Cloudy.svg";
			break;

			case "Mostly Cloudy":
				return "Forecast_Partly Cloudy.svg";
			break;

			case "Clear":
				return "Forecast_Sunny.svg";
			break;

			case "Mixed Rain and Hail":
				return "Forecast_Precipitation.svg";
			break;

			case "Hot":
				return "Forecast_Sunny.svg";
			break;

			case "Isolated Thunderstorms":
				return "Forecast_Stormy.svg";
			break;

			case "Scattered Thunderstorms":
				return "Forecast_Stormy.svg";
			break;

			case "Scattered Showers":
				return "Forecast_Precipitation.svg";
			break;

			case "Heavy Snow":
				return "Forecast_Precipitation.svg";
			break;

			case "Partly Cloudy":
				return "Forecast_Partly Cloudy.svg";
			break;

			case "Thundershowers":
				return "Forecast_Stormy.svg";
			break;

			case "Snow Showers":
				return "Forecast_Precipitation.svg";
			break;

			case "Not Available":
				return "Not Available";
			break;


			default:
				return "Forecast_Cloudy.svg";
			break;
		}
	}
}

function getNewPlace(place)
{
	var script = document.createElement("script");
	script.src = "https://query.yahooapis.com/v1/public/yql?q=select woeid,name,admin1,country  from   geo.places where text='"+place+"' & format=json & callback=placeCallback";

	document.body.appendChild(script);
}


function placeCallback(data) 
{ 
    // did it find it? 
    if (data.query.results == null) 
    {
		var woeid = "not found";
		var name = "not found";
    } // was it unique? 
    else 
    {
		if (data.query.results.place[0] == undefined) 
		{
		    place = data.query.results.place;
		} // multiple ones - pick the first one
		else 
		{
		    place = data.query.results.place[0];
		}
			var woeid = place.woeid;
			var name = place.name+", "+
			    place.admin1.content+", "+
			    place.country.content;
    } 

   	getWeatherData(woeid); 	
   
}//select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="nome, ak")

function getWeatherData(woeid)
{
	
	var script = document.createElement("script");
	script.src ="https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid='"+woeid+"' & format=json & callback=callbackFunction";
	document.body.appendChild(script);
}

function callbackFunction(data){
	if (data.query.results != null)
	{
		var location;
		var newLocation;
		var node;
		//alert(data.query.results.channel.item.forecast[0].date);
		if (data.query.results.channel.location == null)
		{
			location = "Not Found";
			node = document.getElementById("location");
			node.textContent = "Not Found";
		}
		else if(data.query.results.channel.location != null)
		{
			location = data.query.results.channel.location;
			newLocation = location.city+", "+location.region;
			node = document.getElementById("location");
			node.textContent = newLocation;
		}

		var forecast = data.query.results.channel.item.forecast;
		var dayOneForecast = forecast[0];
		var dayTwoForecast = forecast[1];
		var dayThreeForecast = forecast[2];
		var dayFourForecast = forecast[3];
		var dayFiveForecast = forecast[4];

		node = document.getElementById("curTemp");
		node.textContent = data.query.results.channel.item.condition.temp;

		View.displayForecastOne(dayOneForecast);
		View.displayForecastTwo(dayTwoForecast);
		View.displayForecastThree(dayThreeForecast);
		View.displayForecastFour(dayFourForecast);
		View.displayForecastFive(dayFiveForecast);
	}
}

document.getElementById('city').onkeydown = function(event) {
    if (event.keyCode == 13) {
        findCity();
        document.getElementById("city").value = "";
    }
}

function fillData()
{
	var searchText = "Davis";
	getNewPlace(searchText);
}

function findCity()
{
	var searchText = document.getElementById("city").value;
	getNewPlace(searchText);
}




























//Cory Johnson/Ryan Muhlbauer

var resultArray = [];
var storedScans;
var scans;
var app = {

// Application Constructor
initialize : function() 
{
	this.bindEvents();		
	$("#scanBtn").on("click", scanCode);
	$("#sendBtn").on("click", sendMail);
},
// Bind Event Listeners
// Bind any events that are required on startup. 
bindEvents : function() 
{
	document.addEventListener('deviceready', this.onDeviceReady, false);
	inflateReport();	
},
// deviceready Event Handler
// In order to call the 'receivedEvent'
// function, we must explicitly call 'app.receivedEvent(...);'
onDeviceReady : function() 
{
	app.receivedEvent('deviceready');
	displayTCs(); //display T&Cs on app startup
},
// Update DOM on a Received Event
receivedEvent : function(id) 
{
	var parentElement = document.getElementById(id);
	console.log('Received Event: ' + id);
}};

function displayTCs()
{
	var accepted = JSON.parse(localStorage.getItem("accepted"));
	if(!accepted)
	{
		alert("Use of this application implies that you understand GGC's Academic Integrity and Dishonesty policies. " + 
		"Academic dishonesty carries severe penalties ranging from a grade of “0” on the affected assignment to dismissal " + 
		"from Georgia Gwinnett College. Each faculty member at Georgia Gwinnett College bears the responsibility for assigning " + 
		"penalties for cases of academic dishonesty. Students may appeal a penalty as outlined in the Student Handbook.");
		accepted = true;
	}
	localStorage.setItem("accepted", JSON.stringify(accepted));
}

function isEmpty(str) 
{
    return (!str || 0 === str.length);
}

function addScan(scan)
{
	storedScans = localStorage.getItem("storedScans");
	
	if(!storedScans)
	{
		storedScans = [];
	}
	else
	{
		storedScans = JSON.parse(storedScans);
	}
	
	storedScans.push({scan: scan});
	
	localStorage.setItem("storedScans", JSON.stringify(storedScans));
}

function inflateReport()
{
	var str = " ";
	var records = JSON.parse(localStorage.getItem("storedScans"));
	if(records != null)
	{
		for(var i = 0; i < records.length; i++)
		{
			str += "<li>" + records[i]["scan"] + "</li>";
		}
	}	
	$("#reportList").append(str);
}

function clearList()
{
	window.localStorage.removeItem("storedScans");
}

function scanCode() 
{
 cordova.plugins.barcodeScanner.scan(function(result) 
 {
 	var txt = result.text;
 	var currentTime = timeStamp();
 	if(!isEmpty(txt))
 	{
		if((resultArray.indexOf(txt)) == -1)
		{
			resultArray.push(txt);
			
			var resultString = txt + " : " + currentTime;
			var s = "<li>" + resultString + "</li>";
			
			$("#reportList").append(s);
			addScan(resultString);	
		}
		else
		{
			alert("Entry exists in report");
			return;
		}
	}	
 }, function(error) 
 	{
 		alert("Scanning failed: " + error);
 	});
 }
 
//Source:https://gist.github.com/hurjas/2660489
function timeStamp() 
{
	  var now = new Date(); // Create a date object with the current time
	
	  var date = [now.getMonth() + 1, now.getDate(), now.getFullYear()]; // Create an array with the current month, day and time
	
	  var time = [now.getHours(), now.getMinutes()]; // Create an array with the current hour, minute and second
	
	  var suffix = (time[0] < 12) ? "AM" : "PM"; // Determine AM or PM suffix based on the hour

	  time[0] = (time[0] < 12) ? time[0] : time[0] - 12; // Convert hour from military time
	
	  time[0] = time[0] || 12; // If hour is 0, set it to 12
	
	  for (var i = 1; i < 3; i++) // If seconds and minutes are less than 10, add a zero
	  {
		if (time[i] < 10) 
		{
		  time[i] = "0" + time[i];
		}
	  }
	  return date.join("/") + " " + time.join(":") + " " + suffix; // Return the formatted string
}

function createHash()
{
	var prime, result;
	prime = 31;
	result = ((Math.random() * prime) + (Math.random() * 191)) * 11111;
	result |= 0;
	return result;
}
 
function sendMail() 
{	
 	var to = document.getElementById("toAddress").value;
 	var cc = document.getElementById("cc").value;
 	var lastName = document.getElementById("lName").value;
 	var firstName = document.getElementById("fName").value;
 	var courseName = document.getElementById("course").value;
 	var sectionID = document.getElementById("section").value;
 	var emailBody = "<h1>" + firstName + " " + lastName + ", " + courseName + "-" + sectionID + "</h1>" + "<br/>";
 	emailBody += "My unique report number is: " + createHash() + "<br/>"  + "<br/>";
 	emailBody += "My visited Booths: " + "<br/>";
 	function acceptEmailAddress(someAddress)
 	{
 		var rgx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 		return rgx.test(someAddress);
 	} 	
 	if(acceptEmailAddress(to) == false)
 	{
 		alert("Invalid email address");
 		return;
 	}
 	else if(acceptEmailAddress(cc) == false)
 	{		
 		alert("Invalid email address");
 		return;		
 	}	
 	
 	else if(firstName == "")
 	{
			alert("You must include a first name");
			return;	
	}
	else if(lastName == "")
	{
			alert("You must include a last name");
			return;
	}
	else if(courseName == "")
	{
			alert("You must include a course name");
			return;
	}
	else if(sectionID == "")
	{
			alert("You must include a section id");
			return;
	}
 			
 	$("#reportList li").each(function(){
 	emailBody = emailBody + $(this).text() + "<br/>";
 	});	
 	
 	cordova.plugins.email.open(
 		{ 			
 			to: to,
 			cc: cc,
 			subject:"STaRS ePassport Report",
 			body: emailBody
 		}		
 	); 	
}
app.initialize();


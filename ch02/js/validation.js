window.onload = initPage;

var initPage = function(){
	document.getElementById("username").onblur = checkUsername;
	document.getElementById("register").disabled = true;
}

var checkUsername = function(){
	//get a request object and send it to the server
	//document.getElementById("status").src = "images/inProcess.png";
	document.getElementById("username").className = "thinking";
	request = createRequest();
	if(request === null) {
		alert("unable to create request");
	}
	else{
		var theName = document.getElementById("username").value;
		var username = escape(theName);
		var url = "checkName.php?username="+ username;
		request.onreadystatechange = showUsernameStatus;
		request.open("GET", url, true);
		request.send(null);
	}
}

var showUsernameStatus = function(){
	//update the page to show whether username is okay 
	if(request.readyState === 4){
		if(request.status === 200){
			if(request.responseText === "okay"){
				//document.getElementById("status").src = "images/okay.png";
				  document.getElementById("username").className = "approved";
				  document.getElementById("register").disabled = false;
			}
			else{
				//document.getElementById("status").src = "images/inUse.png";
				  document.getElementById("username").className = "denied";
				  document.getElementById("register").disabled = true;
				//alert("sorry, the username is taken");
			}
		}
	}
}


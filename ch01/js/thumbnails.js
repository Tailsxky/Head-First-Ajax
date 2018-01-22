window.onload = initPage;

function initPage() {
	var thumbs = document.getElementById("thumbnailPane").getElementsByTagName("img"),
		image, detailUrl;
	for (var i = 0; i<thumbs.length; i++) {
		image = thumbs[i];
		image.onclick = function() {
			detailUrl = 'images/' + this.title + '-detail.jpg';
			document.getElementById("itemDetail").src = detailUrl;
			getDetails(this.title);

		}
	}
}

var createRequest = function(){
	try {
		// statements
		request = new XMLHttpRequest();
	} catch(tryMS) {
		// statements
		try {
			// statements
			request = new ActiveXObject("Msxml2.XMLHTTP");
		} catch(otherMS) {
			// statements
			try {
				// statements
				request = new ActiveXObject("Microsoft.XMLHTTP");
			} catch(failed) {
				// statements
				request = null;
			}
		}
	}
	console.log(request);
	return request;
}

var getDetails = function(itemName){
	request = createRequest();
	if(request === null){
		alert("unable to create request");
		return;
	}
	//escape转义
	var url = "getDetails.php?ImageID=" + escape(itemName);
	request.open("GET", url, true);
	request.onreadystatechange = displayDetails;
	request.send(null);
}

var displayDetails = function(){
	if(request.readyState === 4 ){
		if(request.status === 200){
			var detailDiv = document.getElementById("description");
			detailDiv.innerHTML = request.responseText;
		}
	}
}
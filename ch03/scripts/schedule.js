window.onload = initPage;

var welcomePaneShowing = true;

function initPage(){
	var tabs = document.getElementById("tabs").getElementsByTagName("a");
	for(var i=0; i<tabs.length; i++){
		var currentTab = tabs[i];
		currentTab.onmouseover = showHint;
		currentTab.onmouseout = hideHint;
		currentTab.onclick = showTab;

	}	
	var buttons = document.getElementById("navigation").getElementsByTagName("a");
	for(var i=0; i<buttons.length; i++){
		var currentBtn = buttons[i];
		//currentBtn.onmouseover = showHint;
		//currentBtn.onmouseout = hideHint;
		//if(currentBtn.className === "tab"){
			currentBtn.onclick = showTab;
			//currentBtn.onmouseover = buttonOver;
			//currentBtn.onmouseout = buttonOut;
			//currentBtn.addEventListener("mouseover", showHint, false);
			//currentBtn.addEventListener("mouseover", buttonOver, false);
			addEventHandler(currentBtn,"mouseover",showHint);
			addEventHandler(currentBtn,"mouseout", hideHint);

			addEventHandler(currentBtn,"mouseover", buttonOver);
			addEventHandler(currentBtn,"mouseout",buttonOut);
			//currentBtn.addEventListener("mouseout", hideHint, false);
			//currentBtn.addEventListener("mouseout", buttonOut, false);

		//}

	}
}

var showHint = function(e){
	if(!welcomePaneShowing){
		return;
	}
	var me = getActivatedObject(e);

	switch (me.title) {
		case "beginners":
			// statements_1
			var hintText = "beginners,join us";
			break;

		case "intermediate":
			// statements_1
			var hintText = "intermediate,join us";
			break;

		case "advanced":
			// statements_1
			var hintText = "advanced,join us";
			break;

		default:
			// statements_def
			var hintText = "click a tab";
			break;
	}

	var contentPane = document.getElementById("content");
	contentPane.innerHTML = "<h3>" + hintText + "</h3>";
}


var hideHint = function(e){
	if(welcomePaneShowing){
		var contentPane = document.getElementById("content");
		contentPane.innerHTML =  "<h3>This is default and Click a tab</h3>";
	}
}

var showTab = function(e){
	//alert("in showTab");
	//var selectedTab = this.title;

	var me = getActivatedObject(e);
	var selectedTab = me.title;

	if(selectedTab === "welcome"){
		welcomePaneShowing = true;
		document.getElementById("content").innerHTML = "<h3>This is default and Click a tab</h3>";
	}
	else{
		welcomePaneShowing = false;
	}

	var tabs = document.getElementById("tabs").getElementsByTagName("a");
	for(var i=0; i<tabs.length; i++){
		var currentTab = tabs[i];
		if(currentTab.title === selectedTab){
			currentTab.className = "active";
		}else{
			currentTab.className = "inactive";
			}
	}

	var request = createRequest();
	if(request === null){
		alert("unable to create request");
		return;
	}
	request.onreadystatechange = showSchedule;
	request.open("GET", selectedTab + ".html", true);
	request.send(null);

}

var showSchedule = function(){
	if(request.readyState === 4){
		if(request.status === 200){
			document.getElementById("content").innerHTML = request.responseText;
		}
	}
}

var buttonOver = function(e){
	var me = getActivatedObject(e);
	me.className = "active";
}

var buttonOut = function(e){
	var me = getActivatedObject(e);

	me.className = "";
}

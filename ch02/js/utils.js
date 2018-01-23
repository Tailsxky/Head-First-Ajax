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
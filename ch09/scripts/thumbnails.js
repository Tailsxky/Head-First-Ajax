window.onload = initPage;

function initPage() {
  // find the thumbnails on the page
  thumbs = document.getElementById("thumbnailPane").getElementsByTagName("img");

  // set the handler for each image
  for (var i = 0; i < thumbs.length; i++) {
    image = thumbs[i];
    
    // create the onclick function
    image.onclick = function() {
      // find the image name
      detailURL = 'images/' + this.title + '-detail.jpg';
      document.getElementById("itemDetail").src = detailURL;
      getDetails(this.title);
    };
  }
}

function createRequest() {
  try {
    request = new XMLHttpRequest();
  } catch (tryMS) {
    try {
      request = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (otherMS) {
      try {
        request = new ActiveXObject("Microsoft.XMLHTTP");
      } catch (failed) {
        request = null;
      }
    }
  }
  return request;
}

function getDetails(itemName) {
  request = createRequest();
  if (request == null) {
    alert("Unable to create request");
    return;
  }
  var url= "getDetailsXML.php?ImageID=" + escape(itemName);
  request.open("GET", url, true);
  request.onreadystatechange = displayDetails;
  request.send(null);
}

function displayDetails() {
  if (request.readyState === 4) {
    if (request.status === 200) {
      detailDiv = document.getElementById("description");
      //detailDiv.innerHTML = request.responseText;
      
      for(var i=detailDiv.childNodes.length; i>0; i--){
      	detailDiv.removeChild(detail.childNodes[i-1]);
      }

      var responseDoc = request.responseXML;
      console.log(responseDoc);
      var description = responseDoc.getElementsByTagName("description")[0];
      var descriptionText = description.firstChild.nodeValue;

      var descriptionP = document.createElement(p);
      descriptionP.appendChild(document.createTextNode("Description: " + descriptionText));
      detailDiv.appendChild(descriptionP);
      var price = responseDoc.getElementsByTagName("price")[0];
      var priceText = price.firstChild.nodeValue;
      var priceP = document.createElement(p);
      priceP.appendChild(document.createTextNode("Price: $" + priceText));
      detailDiv.appendChild(priceP);
      var list = document.createElement(ul);
      var urlElement = responseDoc.getElementsByTagName("url");
      for(var i=0; i<urlElement.length;i++){
      	var url = urlElement[i].firstChild.nodeValue;
      	var li = document.createElement(li);
      	var a = document.createElement(a);
      	a.setAttribute("href", url);
      	a.appendChild(document.createTextNode(url));
      	li.appendChild(a);
      	list.appendChild(li);
      }
      detailDiv.appendChild(list);

    }
  }
}

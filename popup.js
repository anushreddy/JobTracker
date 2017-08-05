var url;
chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    url = tabs[0].url;
	console.log(url);
});

chrome.tabs.getSelected(null, function (tab) {
  var url = new URL(tab.url)
  var domain = url.hostname
  // `domain` now has a value like 'example.com'
  console.log(domain);
  showContent(domain)
})

function showContent(domain){
	document.getElementById('status').textContent = domain;
}
function setDOMInfo(jobInfo) {
 console.log(jobInfo);
  document.getElementById('jobtitle').textContent   = jobInfo.title;
  document.getElementById('jobcompany').textContent  = jobInfo.company;
  document.getElementById('joblocation').textContent = jobInfo.location;
}
window.addEventListener('DOMContentLoaded', function () {
  // ...query for the active tab...
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function (tabs) {
    // ...and send a request for the DOM info...
    for(var i in tabs){
      chrome.tabs.executeScript(tabs[i].id, {file: "content.js"}, function(){
        chrome.tabs.sendMessage(
          tabs[0].id,
          {from: 'popup', subject: 'DOMInfo'},
          // ...also specifying a callback to be called 
          //    from the receiving end (content script)
          setDOMInfo);
        });
      
    }
  }
)
});
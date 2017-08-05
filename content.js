// Listen for messages from the popup
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  // First, validate the message's structure
  if ((msg.from === 'popup') && (msg.subject === 'DOMInfo')) {
    // Collect the necessary data 
    // (For your specific requirements `document.querySelectorAll(...)`
    //  should be equivalent to jquery's `$(...)`)
    //var jobtitle = document.querySelectorAll('h1');
var jobInfo = {
    title: $('.jobRow.row a.jobTitle').text(),
    company: $('.jobRow.row span.jobCompany').text(),
    location:  $('.jobRow.row span.jobLocation').text()
};
    console.log(jobInfo.title);
    console.log(jobInfo.company);
    console.log(jobInfo.location);
    // Directly respond to the sender (popup), 
    // through the specified callback */
    sendResponse(jobInfo);
  }
});
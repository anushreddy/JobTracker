// Listen for messages from the popup
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  // First, validate the message's structure
  if ((msg.from === 'popup') && (msg.subject === 'DOMInfo')) {
    // Collect the necessary data 
    // (For your specific requirements `document.querySelectorAll(...)`
    //  should be equivalent to jquery's `$(...)`)
    var title = "";
    var company = "";
    var location = "";

    $('.jobRow.row a.jobTitle').each(function(){
      title += $(this).text() + "<br>";
    }) 
    $('.jobRow.row span.jobCompany').each(function(){
        company += $(this).text() + "<br>";
    })  
    $('.jobRow.row span.jobLocation').each(function(){
        location += $(this).text() + "<br>";
    })   

    console.log(title);console.log(company);console.log(location);
/*var jobInfo = {
    title: $('.jobRow.row a.jobTitle').text(),
    company: $('.jobRow.row span.jobCompany').text(),
    location:  $('.jobRow.row span.jobLocation').text()
};*/

var jobInfo = {
    title: title,
    company: company,
    location: location
};
    // Directly respond to the sender (popup), 
    // through the specified callback */
    sendResponse(jobInfo);
  }

jobjson = JSON.stringify(jobInfo);
console.log(jobjson);

$.ajax({
       type: "POST",
       crossdomain: true,
       dataType: 'json',
       url: "https://localhost/chromeext/intro.php",
       data: {job_data : jobjson},
    });
});


/*var xhttp = new XMLHttpRequest();
var url = "http://localhost/chromeext/intro.php";
xhttp.open("GET",url,true);
xhttp.send(jobInfo);
*/

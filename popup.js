
/**
 * Get the current URL.
 *
 * @param {function(string)} callback - called when the URL of the current tab
 *   is found.
 */
function getCurrentTabUrl(callback) {
    // Query filter to be passed to chrome.tabs.query - see
    // https://developer.chrome.com/extensions/tabs#method-query
    var queryInfo = {
        active: true,
        currentWindow: true
    };

    chrome.tabs.query(queryInfo, function (tabs) {
        // chrome.tabs.query invokes the callback with a list of tabs that match the
        // query. When the popup is opened, there is certainly a window and at least
        // one tab, so we can safely assume that |tabs| is a non-empty array.
        // A window can only have one active tab at a time, so the array consists of
        // exactly one tab.
        var tab = tabs[0];

        // A tab is a plain object that provides information about the tab.
        // See https://developer.chrome.com/extensions/tabs#type-Tab
        var url = tab.url;

        // tab.url is only available if the "activeTab" permission is declared.
        // If you want to see the URL of other tabs (e.g. after removing active:true
        // from |queryInfo|), then the "tabs" permission is required to see their
        // "url" properties.
        console.assert(typeof url == 'string', 'tab.url should be a string');

        callback(url);
    });

}

function renderStatus(statusText) {
    document.getElementById('status').textContent = statusText;
}

function update(info)
{
    if(info.state==="OFF")
    {
        $("#switcher").removeClass('active');
        $("#switcher").text('OFF');
        $("#status").text(info.level);
    }
    else{
    $("#switcher").addClass('active');
    $("#switcher").text('ON');
    }
}
document.addEventListener('DOMContentLoaded', function ()
{
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function (tabs) {
        // ...and send a request for the DOM info...
        chrome.tabs.sendMessage(
            tabs[0].id,
            {from: 'popup', subject: 'DOMInfo'},
            // ...also specifying a callback to be called
            //    from the receiving end (content script)
            update);
    });
    $("#difficulties").click(function ()
    {
        var text=$("#status");
        if (text.text()=="Easy"){
            text.text("Hard");
            chrome.tabs.executeScript(null, {file: "delete.js"});
            chrome.tabs.executeScript(null, {file: "test4hard.js"});
        }
        else if(text.text()=="Hard"){
            text.text("Easy");
            chrome.tabs.executeScript(null, {file: "delete.js"});
            chrome.tabs.executeScript(null, {file: "test.js"});
        }
    });
    $("#switcher").click(function(){
        if($("#switcher").hasClass('active')){
            $("#switcher").removeClass('active');
            $("#switcher").text('OFF');
            chrome.tabs.executeScript(null, {file: "delete.js"});
            chrome.tabs.executeScript(null, {file: "test.js"});
        }else{
            $("#switcher").addClass('active');
            $("#switcher").text('ON');
            chrome.tabs.executeScript(null, {file: "delete.js"});
        }
    })
});

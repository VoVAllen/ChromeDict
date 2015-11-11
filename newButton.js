/**
 * Created by Zeng on 2015/11/8.
 */
chrome.runtime.onMessage.addListener(function (msg, sender, response)
{
    // First, validate the message's structure
    if ((msg.from === 'popup') && (msg.subject === 'DOMInfo')) {
        // Collect the necessary data
        // (For your specific requirements `document.querySelectorAll(...)`
        //  should be equivalent to jquery's `$(...)`)

        var domInfo = {
            level: "",
            behave: "",
            switcher: ""
        };
        if ($('.word.easy'.length>0))
        {
            domInfo={
                level: "Easy",
                state:"OFF"
            }
        }
        else if ($('.word.hard'.length>0))  {
            domInfo={
                level: "Hard",
                state:"OFF"
            }
        }
        else
        {
            domInfo={
                level: "Easy",
                switcher:"ON"
            };
        }

        // Directly respond to the sender (popup),
        // through the specified callback */
        response(domInfo);
    }
});
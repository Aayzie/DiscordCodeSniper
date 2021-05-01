//Settings//
const discordMessageElementClassName = "messageContent-2qWWxC";
//Settings//

MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

var documentObserver = new MutationObserver(function(){
  let messageElements = document.getElementsByClassName(discordMessageElementClassName);
  if(messageElements.length > 0)
  {
    let latestMessageElement = messageElements[messageElements.length-1];

    try
    {
      if(latestMessageElement != undefined)
      {
        chrome.runtime.sendMessage({type: "latestMessage", latestMessage: latestMessageElement.innerHTML});
      }
    }
    catch (errorMessage)
    {
      console.log("An error has occured: " + errorMessage);
    }
  }
});

documentObserver.observe(document, {
  subtree: true,
  attributes: true
});
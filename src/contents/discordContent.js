//Settings//
const discordMessageElementClassName = "messageContent-2qWWxC";
//Settings//

var latestMessage;
var getLatestMessageInterval;

chrome.storage.local.get('isActivated', function(saved) {
  let isActivated = saved.isActivated;
  if(isActivated === undefined) {
    deactivate();
  } else {
    if(isActivated) {
      activate();
    } else {
      deactivate();
    }
  }
});

chrome.runtime.onMessage.addListener(
  function(request) {
    switch(request.type) {
        case "discordActivation":
          if(request.isDiscordActivated) {
            activate();
          } else {
            deactivate();
          }
          break;
    }
  }
)

function activate() {
  getLatestMessageInterval = setInterval(() => {
    getLatestMessage();
  }, 10);
}

function deactivate() {
  if(getLatestMessageInterval !== undefined) {
    clearInterval(getLatestMessageInterval);
  }
}

function getLatestMessage() {
  let messageElements = document.getElementsByClassName(discordMessageElementClassName);
  if(messageElements.length > 0) {
    let latestMessageElement = messageElements[messageElements.length-1];
    try {
      if (latestMessageElement != undefined && latestMessage != latestMessageElement.innerHTML) {
        latestMessage = latestMessageElement.innerHTML
        chrome.runtime.sendMessage({type: "latestMessage", latestMessage: latestMessage});
      }
    } catch (errorMessage) {
      console.log("An error has occured: " + errorMessage);
    }
  }
}
//Settings//
const discordMessageElementClassName = "markup-eYLPri messageContent-2t3eCI";
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
  startedAt = Date.now()
  requestAnimationFrame(update)
}

var startedAt, duration = 3000

function update() {
  let elapsedTime = Date.now() - startedAt

  // playback is a value between 0 and 1
  // being 0 the start of the animation and 1 its end
  let playback = elapsedTime / duration

  getLatestMessage()
  
  if (playback > 0 && playback < 1) {
  	// Queue the next frame
  	requestAnimationFrame(update)
  } else {
  	// Wait for a while and restart the animation
  	setTimeout(activate, duration/10)
  }
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
        latestMessage = latestMessageElement.innerHTML;
        console.log("get latest: " + latestMessage);
        var possibleCodes = latestMessage.split(/\n/);
        for(var i = 0; i < possibleCodes.length; i++)
        {
          console.log("possible code: " + possibleCodes[i] + ", LENGTH: " + possibleCodes.length);
          chrome.runtime.sendMessage({type: "latestMessage", latestMessage: possibleCodes[i]});
          sleep(1000);
        }
      }
    } catch (errorMessage) {
    }
  }
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
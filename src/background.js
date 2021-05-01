//Settings//
const JackboxLink = "jackbox";
const WtdLink = "playwtd";

const DefaultGame = "jackbox";
//Settings//

var _activated;
var _selectedGame;

var _latestMessage = "";

chrome.storage.local.get('activated', function(saved) {
    let activated = saved.activated;
    if(activated === undefined)
    {
        setActivation(false);
    }
    else
    {
        setActivation(activated);
    }
});

chrome.storage.local.get('selectedGame', function(saved) {
    let selectedGame = saved.selectedGame;
    if(selectedGame === undefined)
    {
        selectedGame = DefaultGame;
    }
    setSelectedGame(selectedGame);
});

chrome.runtime.onMessage.addListener(
    function(request) {
        switch(request.type)
        {
            case "activation":
                setActivation(request.activation);
                break;
            case "selectedGame":
                setSelectedGame(request.selectedGame);
                break;
            case "latestMessage":
                if(!_activated)
                {
                    return;
                }
                if(request.latestMessage != _latestMessage)
                {
                    _latestMessage = request.latestMessage;
                    sendLatestMessage();
                }
                break;
        }
    }
);

function setActivation(activated)
{
    _activated = activated;
    chrome.storage.local.set({'activated': _activated}, function() {
    });
}

function setSelectedGame(game)
{
    _selectedGame = game;
    chrome.storage.local.set({'selectedGame': _selectedGame}, function() {
    });
}

function sendLatestMessage()
{
    chrome.tabs.getAllInWindow(null, function(tabs){
        for (var i = 0; i < tabs.length; i++)
        {
            let selectedLink = "";
            switch(_selectedGame)
            {
                case "jackbox":
                    selectedLink = JackboxLink;
                    break;
                case "wtd":
                    selectedLink = WtdLink;
                    break;
            }
            if(selectedLink != "" && tabs[i].url.includes(selectedLink))
            {
                try
                {
                    console.log("latest mse: " + _latestMessage + ", " + selectedLink);
                    chrome.tabs.sendMessage(tabs[i].id, {type: "roomCode", roomCode: _latestMessage});
                    break;
                }
                catch (errorMessage)
                {
                    console.log("An error has occured: " + errorMessage);
                }
            }
        }
    });
}
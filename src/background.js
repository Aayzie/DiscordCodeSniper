//Settings//
const JackboxLink = "jackbox";
const WtdLink = "playwtd";
const DiscordLink = "discord";

const DefaultGame = "jackbox";
//Settings//

var _isActivated;
var _selectedGame;
var _latestMessage = "";

chrome.storage.local.get('isActivated', function(saved) {
    let isActivated = saved.isActivated;
    if(isActivated === undefined) {
        setActivation(false);
    } else {
        setActivation(isActivated);
    }
});

chrome.storage.local.get('selectedGame', function(saved) {
    let selectedGame = saved.selectedGame;
    if(selectedGame === undefined) {
        selectedGame = DefaultGame;
    }
    setSelectedGame(selectedGame);
});

chrome.runtime.onMessage.addListener(
    function(request) {
        switch(request.type) {
            case "activation":
                setActivation(request.isActivated);
                break;
            case "selectedGame":
                setSelectedGame(request.selectedGame);
                break;
            case "latestMessage":
                if(!_isActivated) {
                    return;
                }
                if(request.latestMessage != _latestMessage) {
                    _latestMessage = request.latestMessage;
                    sendLatestMessage();
                }
                break;
        }
    }
);

function setActivation(isActivated)
{
    _isActivated = isActivated;
    chrome.storage.local.set({'isActivated': _isActivated}, function() {
    });
    chrome.tabs.getAllInWindow(null, function(tabs) {
        for (var i = 0; i < tabs.length; i++) {
            if(tabs[i].url.includes(DiscordLink)) {
                chrome.tabs.sendMessage(tabs[i].id, {type: "discordActivation", isDiscordActivated: _isActivated});
            }
        }
    });
}

function setSelectedGame(game) {
    _selectedGame = game;
    chrome.storage.local.set({'selectedGame': _selectedGame}, function() {
    });
}

function sendLatestMessage() {
    chrome.windows.getAll({populate:true},function(windows){
        windows.forEach(function(window){
            window.tabs.forEach(function(tab){
                //collect all of the urls here, I will just log them instead
                console.log(tab.url);
                let selectedLink = "";
                switch(_selectedGame) {
                    case "jackbox":
                        selectedLink = JackboxLink;
                        break;
                    case "wtd":
                        selectedLink = WtdLink;
                        break;
                }
                if(selectedLink != "" && tab.url.includes(selectedLink)) {
                    try {
                        chrome.tabs.sendMessage(tab.id, {type: "roomCode", roomCode: _latestMessage});
                    } catch (errorMessage) {
                        console.log("An error has occured: " + errorMessage);
                    }
                }
            });
        });
    });

    /*
    chrome.tabs.query(null, function(tabs) {
        for (var i = 0; i < tabs.length; i++) {
            let selectedLink = "";
            switch(_selectedGame) {
                case "jackbox":
                    selectedLink = JackboxLink;
                    break;
                case "wtd":
                    selectedLink = WtdLink;
                    break;
            }
            if(selectedLink != "" && tabs[i].url.includes(selectedLink)) {
                try {
                    chrome.tabs.sendMessage(tabs[i].id, {type: "roomCode", roomCode: _latestMessage});
                } catch (errorMessage) {
                    console.log("An error has occured: " + errorMessage);
                }
            }
        }
    });
    */
}
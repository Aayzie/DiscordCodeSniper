var selectedGame;

chrome.storage.local.get('selectedGame', function(saved) {
    selectedGame = saved.selectedGame;
    if(selectedGame === undefined) {
        selectedGame = document.getElementById("gameSelect").value;
    }
    displaySelectedGame();
});

chrome.storage.local.get('isActivated', function(saved) {
    let isActivated = saved.isActivated;
    if(isActivated === undefined) {
        displayDeactivatedStatus();
    } else {
        if(isActivated) {
            displayActivatedStatus();
        } else {
            displayDeactivatedStatus();
        }
    }
});

function setSelectedGame(game) {
    chrome.runtime.sendMessage({type: "selectedGame", selectedGame: game});
}

function activate() {
    chrome.runtime.sendMessage({type: "activation", isActivated: true});
    displayActivatedStatus();
}

function displayActivatedStatus() {
    document.getElementById("status").innerHTML = "Active";
    document.getElementById("status").className = "activeStatus";
    document.getElementById("activateButton").className = "hiddenStatus";
    document.getElementById("deactivateButton").className = "visibleStatus";
}

function deactivate() {
    chrome.runtime.sendMessage({type: "activation", isActivated: false});
    displayDeactivatedStatus();
}

function displayDeactivatedStatus() {
    document.getElementById("status").innerHTML = "Inactive";
    document.getElementById("status").className = "inactiveStatus";
    document.getElementById("deactivateButton").className = "hiddenStatus";
    document.getElementById("activateButton").className = "visibleStatus";
}

function displaySelectedGame() {
    document.getElementById("gameSelect").value = selectedGame;
}

document.getElementById("gameSelect").addEventListener("change", function() {
    setSelectedGame(this.value);
});

document.getElementById("activateButton").addEventListener("click", function() {
    activate();
});

document.getElementById("deactivateButton").addEventListener("click", function() {
    deactivate();
});
//Settings//
const roomCodeElementID = "room";
//Settings//

const rightArrowDefinition = "{rightarrow}";
const backspaceDefinition = "{backspace}";

function getRightArrows(count) {
    var rightarrows = "";
    for(var i = 0; i < count; i++) {
        rightarrows += rightArrowDefinition;
    }
    return rightarrows;
}

function getBackspaces(count) {
    var backspaces = "";
    for(var i = 0; i < count; i++) {
        backspaces += backspaceDefinition;
    }
    return backspaces;
}

chrome.runtime.onMessage.addListener(
    async function(request) {
        switch(request.type) {
            case "roomCode":
                if(request.roomCode.length == 4) {
                    $("#" + roomCodeElementID).sendkeys(getRightArrows(20) + getBackspaces(20) + request.roomCode);
                    await new Promise(r => setTimeout(r, 1));
                    document.getElementsByClassName("btn")[0].click();
                }
                break;
        }
    }
);
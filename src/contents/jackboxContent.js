//Settings//
const roomCodeElementID = "roomcode";
const joinButtonElementID = "button-join";
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

chrome.runtime.onMessage.addListener (
    async function(request) {
        switch(request.type) {
            case "roomCode":
                var codes = request.roomCode.split(/[ ,]+/);
                console.log("JOINING a " + roomCodeElementID);
                for(var i = 0; i < codes.length; i++)
                {
                    if(codes[i].length == 4) {
                        console.log("JOINING b " + roomCodeElementID);
                        $("#" + roomCodeElementID).sendkeys(getRightArrows(20) + getBackspaces(20) + request.roomCode);
                        
                        for(var j = 0; j < 1000; j++)
                        {
                            console.log("JOINING c " + roomCodeElementID + "_" + request.roomCode);
                            let sleep = ms => new Promise(resolve => setTimeout(resolve, 100));
                            document.getElementById(joinButtonElementID).click();
                            console.log("j: " + j);
                            await sleep(1);
                        }
                        let sleep3 = ms => new Promise(resolve => setTimeout(resolve, 100));
                    }
                }
                break;
        }
    }
);
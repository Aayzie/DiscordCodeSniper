//Settings//
const roomCodeElementID = "roomcode";
const joinButtonElementID = "button-join";
//Settings//

const rightArrowDefinition = "{rightarrow}";
const backspaceDefinition = "{backspace}";

function getRightArrows(count)
{
    var rightarrows = "";
    for(var i = 0; i < count; i++)
    {
        rightarrows += rightArrowDefinition;
    }
    return rightarrows;
}

function getBackspaces(count)
{
    var backspaces = "";
    for(var i = 0; i < count; i++)
    {
        backspaces += backspaceDefinition;
    }
    return backspaces;
}

chrome.runtime.onMessage.addListener(
    function(request) {
        switch(request.type)
        {
            case "roomCode":
                $("#" + roomCodeElementID).sendkeys(getRightArrows(20) + getBackspaces(20) + request.roomCode);
                document.getElementById(joinButtonElementID).click();
                break;
        }
    }
);
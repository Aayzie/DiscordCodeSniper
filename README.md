## THIS WORKS AGAIN. I was able to snipe forsen with this yesterday and I even almost won EZY . o O ( PepeHands )
## Try using 2 different windows, one for the web Discord tab, the other for the jackbox.tv tab, so you can see both at the same time

# Discord Code Sniper
 Automatically join a Jackbox/WTD room with a code from Discord immediately after it's posted.
 
 *thanks to mozeralla for the new name suggestion XD*
 
![FibbageGetterDemo](https://user-images.githubusercontent.com/16715946/116795803-1bd68b80-ab0a-11eb-8817-d78b193e912f.gif)

## Installation (Chrome)

1. Clone the repo or download the zip file.

2. Extract the folder somewhere on your PC.

3. Go to Chrome's extension page: **chrome://extensions/**

4. Click **Load unpacked**.

5. Select the folder you just extracted.

6. Pin the extension in your **Extensions Toolbar** then click its icon to open up the menu.

![image](https://user-images.githubusercontent.com/16715946/116795936-19c0fc80-ab0b-11eb-922c-4cdbe8c309c7.png)

## Usage

- Use the **Game dropdown** to pick the game that forsen is playing, then click **Activate**.

- Go to [jackbox.lol](jackbox.lol) or [playwtd.com](playwtd.com), then open the **web-version of Discord** *(this doesn't work for the standalone app)*.

- If you already opened those pages (both the game site and Discord) before installing the extension, make sure to refresh them first (otherwise the extension won't detect them).

- Go to the Discord text channel where you're gonna get the code from. (**#forsen** under **EVENTS**)

- The next message to be posted in that text channel will be automatically put into the game site's roomcode input field, and then the Join/Play button will be automatically "pressed" immediately after.
In other words, **you don't have to do anything**. *(Just make sure to test it first before forsen starts the game, just to make sure it works.)*

- Remember to press **Deactivate** when you're not using it anymore (otherwise the extension will keep checking for new messages).

## Libraries Used

[featurist/jquery-sendkeys](https://github.com/featurist/jquery-sendkeys) (the roomcode input field for Jackbox/WTD is weird where you can't just modify the element's value to put the code in, which is why I had to use this.)

[dwachss/bililiteRange](https://github.com/dwachss/bililiteRange) (required by jquery-sendkeys)

## More Demos

![JackboxGetterDemo](https://user-images.githubusercontent.com/16715946/116795805-1d07b880-ab0a-11eb-9060-5a1f46737385.gif)
![WTDGetterDemo](https://user-images.githubusercontent.com/16715946/116795807-1e38e580-ab0a-11eb-93f8-145940302bed.gif)

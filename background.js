chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.tabs.executeScript(
        { 
            code: "document.getElementsByTagName('html')[0].outerHTML;",
        },
        function(code) {
            let match = tab.url.startsWith("https://www.reddit.com/r/");
            if (match) {
                let regex = /https:\/\/v\.redd\.it\/[A-Za-z0-9]+\/HLSPlaylist\.m3u8/i;
                let matches = code[0].match(regex);
                if (matches) {
                    let replacedUrls = matches.map(function(url) {
                        return url.replace("HLSPlaylist.m3u8", "DASH_480.mp4");
                    });
                    chrome.tabs.create({ url: replacedUrls[0] });
                } else {
                    chrome.browserAction.setPopup({ tabId: tab.id, popup: "no_video.html" });
                }
            } else {
                chrome.browserAction.setPopup({ tabId: tab.id, popup: "popup.html" });
            }
        })
});
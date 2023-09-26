chrome.browserAction.onClicked.addListener(function (tab) {
    let currentURL = tab.url;
    let pattern = /https:\/\/github\.com\/[A-Za-z]+.*\.html/;
    let match = currentURL.match(pattern);

    if (match) {
        let newURL = `http://htmlpreview.github.io/?${currentURL}`;
        chrome.tabs.create({ url: newURL });
    } else {
        chrome.browserAction.setPopup({ tabId: tab.id, popup: "popup.html" });
    }
});
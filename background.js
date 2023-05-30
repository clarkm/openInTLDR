chrome.contextMenus.create({
  id: "open-link-with-tldr",
  title: "Open link with TLDR",
  contexts: ["link"]
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId === "open-link-with-tldr") {
    var url = info.linkUrl;
    var promptMessage = "TLDR " + url;
    chrome.scripting.executeScript({
      target: {tabId: tab.id},
      files: ["content_script.js"]
    }, function() {
      chrome.tabs.sendMessage(tab.id, {action: "copyPromptMessage", message: promptMessage}, function(response) {
        console.log(response.message);
      });
    });
    var encodedPromptMessage = encodeURIComponent(promptMessage);
    chrome.tabs.create({url: "https://chat.openai.com/?q=" + encodedPromptMessage});
  }
});

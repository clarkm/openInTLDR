chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "copyPromptMessage") {
    var input = document.createElement("input");
    input.style.position = "fixed";
    input.style.opacity = 0;
    input.value = request.message;
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    document.body.removeChild(input);
    sendResponse({message: "Prompt message copied to clipboard"});
  }
});

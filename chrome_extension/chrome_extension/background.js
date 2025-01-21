const portalUrl = "https://amitmt.doubleoctopus.io";

// Launch a new tab with the specified URL
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "launchApp") {
    chrome.tabs.create({ url: message.url });
    sendResponse({ success: true });
  }
});

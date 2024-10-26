// chrome.webRequest.onBeforeSendHeaders.addListener(
//     (details) => {
//     //     const headers = details.requestHeaders;
//     //     headers.forEach((header) => {
//     //         if (header.name === "po_token") {
//     //         console.log("Found po_token:", header.value);
//     //         }
//     //     });
//     //     return { requestHeaders: headers };
//     console.log(details);
//     },
//     { urls: ["*://*.youtube.com/*"] },
//     ["requestHeaders"]
// );

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url && tab.url.includes("youtube.com/watch")) {
        const queryParameters = tab.url.split("?")[1];
        const urlParameters = new URLSearchParams(queryParameters);

        // chrome.scripting.executeScript({
        //     target: { tabId: tabId },
        //     files: ["contentScript.js"]
        // });

        chrome.tabs.sendMessage(tabId, {
            type : "NEW_V",
            videoId: urlParameters.get("v"),
        });
    }
});

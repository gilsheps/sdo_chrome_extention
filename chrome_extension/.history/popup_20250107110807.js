const portalUrl = "https://amitmt.doubleoctopus.io";
const eventEmitter = new EventTarget();
const sdo = {
  name: "SDO Portal",
  icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAAEgBckRAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3xpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpjY2IyYzVjZC00NmZkLWM4NGMtOTljMC03NTY2NTY3NjkyMjIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTREQTMwODAyRTZGMTFFN0JDQ0VEOUEwMTMzMzBBQzMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QTREQTMwN0YyRTZGMTFFN0JDQ0VEOUEwMTMzMzBBQzMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBQjJCQ0Q3RjYyMkVFNzExQjgwNEY1MUUxM0QyQzg3QyIgc3RSZWY6ZG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjM2Zjc3NDQxLWZkNjYtMTFlNC05MDZjLWFmYjljYjE5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",
};

function launchApp(url) {
  // const url_input = document.getElementById("url_input");
  // console.log("url_input", url_input.value);
  // chrome.runtime.sendMessage({ type: "launchApp", url: url }, (response) => {
  //   if (chrome.runtime.lastError) {
  //     console.error(chrome.runtime.lastError.message);
  //   }
  // });
}

async function getServices() {
  try {
    const response = await fetch(`${portalUrl}/portal/api/services`, {
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching services:", error);
    launchApp(portalUrl); // Fallback to opening the portal
    return [];
  }
}

function addApp(appsDiv, app) {
  const div = document.createElement("div");
  div.className = "app";

  div.onclick = () => {
    const url = app === sdo ? portalUrl : `${portalUrl}${app.loginUrl}`;
    launchApp(url);
  };

  const img = document.createElement("img");
  img.src = app.icon;
  div.appendChild(img);

  const title = document.createElement("span");
  title.className = "app_title";
  title.innerText = app.name;
  div.appendChild(title);

  appsDiv.appendChild(div);
}

// Initialize the popup window
document.addEventListener("DOMContentLoaded", async () => {
  const appsDiv = document.getElementById("apps");
  const services = await getServices();

  try {
    addApp(appsDiv, sdo);
    services.forEach((service) => addApp(appsDiv, service));
  } catch (err) {
    console.error("Error initializing apps:", err);
  }
});

document.getElementById('button').addEventListener('click',function(){
  console.log('btnComment worked')
})
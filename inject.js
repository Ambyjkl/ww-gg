function injectScript(filePath) {
  var script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.setAttribute('src', filePath);
  document.documentElement.appendChild(script);
}
injectScript(chrome.extension.getURL('content.js'));

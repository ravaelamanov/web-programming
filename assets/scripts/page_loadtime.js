window.onload = function() {
    setTimeout(function() {
        var loadtime = performance.getEntriesByType("navigation")[0].duration;
        var tag = document.createElement("p");
        var text = document.createTextNode("Page load time is " + (loadtime / 1000).toFixed(3) + " seconds");
        tag.appendChild(text);
        document.getElementsByClassName("footer")[0].appendChild(tag)
    }, 0)
}
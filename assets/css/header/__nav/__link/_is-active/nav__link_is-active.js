window.addEventListener("DOMContentLoaded", function(event) {
    var url = document.location.pathname.split("/");
    var navLinks = document.getElementsByClassName("nav__link");
    var currentPage = url[url.length - 1];
    for (var i = 0; i < navLinks.length; i++) {
      var navLinkUrl = navLinks[i].href.split("/");
      console.log(navLinkUrl[navLinkUrl.length - 1])
      if (navLinkUrl[navLinkUrl.length - 1] == currentPage) {
        navLinks[i].classList.add("nav__link_is-active");
      }
    }
  });
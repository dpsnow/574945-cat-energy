function initComparisons() {
  var x, i;
  x = document.getElementsByClassName("slider__item--before");
  for (i = 0; i < x.length; i++) {
    compareImages(x[i]);
  }
  function compareImages(img) {
    var sliderIndicator, img, clicked = 0, w;
    scale = document.querySelector(".switch__scale");
    sliderIndicator = document.querySelector(".switch__indicator");
    w = img.offsetWidth;
    wScale = scale.offsetWidth - sliderIndicator.offsetWidth;
    console.log("window.innerWidth=" + window.innerWidth);
    if (window.innerWidth >= 1300) {
      img.style.width = "365.5px"
    } else {
      img.style.width = "338px";
    }
    sliderIndicator.style.left = (scale.offsetWidth / 2) - (sliderIndicator.offsetWidth / 2) + "px";
    sliderIndicator.addEventListener("mousedown", slideReady);
    window.addEventListener("mouseup", slideFinish);
    sliderIndicator.addEventListener("touchstart", slideReady);
    window.addEventListener("touchstop", slideFinish);
    function slideReady(e) {
      e.preventDefault();
      clicked = 1;
      window.addEventListener("mousemove", slideMove);
      window.addEventListener("touchmove", slideMove);
    }
    function slideFinish() {
      clicked = 0;
    }
    function slideMove(e) {
      var pos;
      if (clicked == 0) return false;
      pos = getCursorPos(e)
      if (pos < 0) pos = 0;
      if (pos > scale.offsetWidth) pos = scale.offsetWidth;
      slide(pos);
      console.log("slide(pos)=" + pos);
    }
    function getCursorPos(e) {
      var a, x = 0;
      e = e || window.event;
      a = scale.getBoundingClientRect();
      x = e.pageX - a.left;
      x = x - window.pageXOffset;
      return x;
    }
    function slide(x) {
      sliderIndicator.style.left = x - (sliderIndicator.offsetWidth / 2) + "px";
      img.style.width = x/(scale.offsetWidth-sliderIndicator.offsetWidth)*100 + "%";
    }
  }
}

function initComparisons() {
  var x, i;
  /*find all elements with an "overlay" class:*/
  x = document.getElementsByClassName("slider__item--before");
  for (i = 0; i < x.length; i++) {
    /*once for each "overlay" element:
    pass the "overlay" element as a parameter when executing the compareImages function:*/
    compareImages(x[i]);
  }
  console.log("hi");
  function compareImages(img) {
    var slider, img, clicked = 0, w;
    scale = document.querySelector(".switch__scale");
    slider = document.querySelector(".switch__indicator");
    w = img.offsetWidth;
    wScale = scale.offsetWidth - slider.offsetWidth;
    /*set the width of the img element to 50%:*/
    // img.style.width = (w / 2) + "px";
    img.style.width = "50%";
    /*position the slider in the middle:*/
    slider.style.left = (scale.offsetWidth / 2) - (slider.offsetWidth / 2) + "px";
    /*execute a function when the mouse button is pressed:*/
    slider.addEventListener("mousedown", slideReady);
    /*and another function when the mouse button is released:*/
    window.addEventListener("mouseup", slideFinish);
    /*or touched (for touch screens:*/
    slider.addEventListener("touchstart", slideReady);
     /*and released (for touch screens:*/
    window.addEventListener("touchstop", slideFinish);
    function slideReady(e) {
      /*prevent any other actions that may occur when moving over the image:*/
      e.preventDefault();
      /*the slider is now clicked and ready to move:*/
      clicked = 1;
      /*execute a function when the slider is moved:*/
      window.addEventListener("mousemove", slideMove);
      window.addEventListener("touchmove", slideMove);
    }
    function slideFinish() {
      /*the slider is no longer clicked:*/
      clicked = 0;
    }
    function slideMove(e) {
      var pos;
      /*if the slider is no longer clicked, exit this function:*/
      if (clicked == 0) return false;
      /*get the cursor's x position:*/
      pos = getCursorPos(e)
      /*prevent the slider from being positioned outside the image:*/
      if (pos < 0) pos = 0;
      if (pos > wScale) pos = wScale;
      /*execute a function that will resize the overlay image according to the cursor:*/
      slide(pos);
      console.log("slide(pos)=" + pos);
    }
    function getCursorPos(e) {
      var a, x = 0;
      e = e || window.event;
      /*get the x positions of the image:*/
      // a = img.getBoundingClientRect();
      a = scale.getBoundingClientRect();
      /*calculate the cursor's x coordinate, relative to the image:*/
      x = e.pageX - a.left;
      /*consider any page scrolling:*/
      x = x - window.pageXOffset;
      return x;
    }
    function slide(x) {
      /*position the slider:*/
      // slider.style.left = img.offsetWidth - (slider.offsetWidth / 2) + "px";
      // slider.style.left = img.offsetWidth/w*wScale -(slider.offsetWidth / 2) + "px";
      slider.style.left = x + "px";
      /*resize the image:*/
      img.style.width = x/(scale.offsetWidth-slider.offsetWidth)*100 + "%";
    }
  }
}

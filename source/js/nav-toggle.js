var header = document.querySelector('.page-header');
var navMain = document.querySelector('.site-nav');
var navToggle = document.querySelector('.nav-toggle');

header.classList.remove('page-header--nojs');
navMain.classList.remove('site-nav--opened');
navMain.classList.add('site-nav--closed');

navToggle.addEventListener('click', function() {
  if (navMain.classList.contains('site-nav--closed')) {
    navMain.classList.remove('site-nav--closed');
    navMain.classList.add('site-nav--opened');
    navToggle.classList.remove('nav-toggle--burger');
    navToggle.classList.add('nav-toggle--close');
  } else {
    navMain.classList.remove('site-nav--opened');
    navMain.classList.add('site-nav--closed');
    navToggle.classList.remove('nav-toggle--close');
    navToggle.classList.add('nav-toggle--burger');
  }
});

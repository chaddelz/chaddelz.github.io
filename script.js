'use strict';

// ///////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////

// Dark Theme

// grabbing the button

const themeIcon = document.querySelector('.toggle_icon');

// event listener on Icon
themeIcon.addEventListener('click', () => {
  // grabbing the body element
  let darkThemeToggle = document.querySelector('body');
  let navDarkThemeToggle = document.querySelector('nav');
  let contactFormToggle = document.querySelector('.form');
  let footerToggle = document.querySelector('.sec6');

  // toggling the dark class
  darkThemeToggle.classList.toggle('dark');
  navDarkThemeToggle.classList.toggle('dark');
  contactFormToggle.classList.toggle('dark');
  footerToggle.classList.toggle('dark');
});

// ///////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////

// Nav Bar

window.addEventListener('scroll', function () {
  const nav = document.querySelector('nav');
  nav.classList.toggle('sticky', window.scrollY > 0);
});

// ///////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////

// Section 1 - Header Zoom Scroll

const img = document.querySelector('header img');

window.addEventListener('scroll', () => {
  // variables
  let value = window.scrollY / 600 + 1;

  // commands
  img.style.transform = `scale(${value})`;
});

// ///////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////

// Section 2 - Carousel

// grabbing DOM elements

const slides = document.querySelectorAll('.slide');
const next = document.querySelector('#next');
const prev = document.querySelector('#prev');

// autoslide
const auto = true;
const intervalTime = 2000;
let slideInterval;

// if auto = false then autoslide is off, if true then autoslide is on

// ////////////////////////////////////////

// going to the next slide

const nextSlide = () => {
  // get current class
  const current = document.querySelector('.current');

  // remove the current class
  current.classList.remove('current');

  // checking for next slide
  if (current.nextElementSibling) {
    // add current to next sibling
    current.nextElementSibling.classList.add('current');
  } else {
    // add current to starting slide
    slides[0].classList.add('current');
  }

  setTimeout(() => current.classList.remove('current'));
};

// //////////////////////////////////////

// going to the previous slide

const prevSlide = () => {
  // get current class
  const current = document.querySelector('.current');

  // remove the current class
  current.classList.remove('current');

  // checking for previous slide
  if (current.previousElementSibling) {
    // add current to previous sibling
    current.previousElementSibling.classList.add('current');
  } else {
    // add current to last slide
    slides[slides.length - 1].classList.add('current');
  }

  setTimeout(() => current.classList.remove('current'));
};

// ////////////////////////////////////

// button events

next.addEventListener('click', (e) => {
  nextSlide();

  // resetting slideInterval after button is clicked
  if (auto) {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, intervalTime);
  }
});

prev.addEventListener('click', (e) => {
  prevSlide();
});

// /////////////////////////////////

// Automating the next slide on an interval count

if (auto) {
  // run the next slide at interval time
  slideInterval = setInterval(nextSlide, intervalTime);

  // resetting slideInterval after button is clicked
  if (auto) {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, intervalTime);
  }
}

// /////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////

// Section 4 - About Me - Text Animation

// defining variables

const typedTextSpan = document.querySelector('.typed_text');
const cursorSpan = document.querySelector('.cursor');

const textArray = [
  'Programming, Of Course',
  'Learning As Much As I Can',
  'Hiking & Exploring Nature',
  'Going Fishing',
  'Doing Yoga',
];

const typingDelay = 200;
const erasingDelay = 100;

const newTextDelay = 2000;

let textArrayIndex = 0;
let characterIndex = 0;

/* 

-- What this function should do?

 - basically want it to type out each letter in a word and then pause

 - then erase itself and then pause again, 
 
 - then call itself to repeat the process with the next word in the array

 - and continue this in an infinite loop
 
*/

function type() {
  if (characterIndex < textArray[textArrayIndex].length) {
    // adding typing class to cursor
    if (!cursorSpan.classList.contains('typing'))
      cursorSpan.classList.add('typing');

    // add next character to the current textContent of the typedTextSpan
    typedTextSpan.textContent +=
      textArray[textArrayIndex].charAt(characterIndex);

    // increasing character index
    characterIndex++;

    // typing the next character
    setTimeout(type, typingDelay);
  } else {
    // removing the typing class from cursor
    cursorSpan.classList.remove('typing');

    // calling the erase function
    setTimeout(erase, newTextDelay);
  }
}

// implementing erase function

function erase() {
  if (characterIndex > 0) {
    // adding typing class to cursor
    if (!cursorSpan.classList.contains('typing'))
      cursorSpan.classList.add('typing');

    // removing the last letter
    typedTextSpan.textContent = textArray[textArrayIndex].substring(
      0,
      characterIndex - 1
    );

    // decreasing the characterIndex
    characterIndex--;

    // removing the next letter
    setTimeout(erase, erasingDelay);
  } else {
    // removing the typing class from cursor
    cursorSpan.classList.remove('typing');

    // moving on to the next string in the array
    textArrayIndex++;

    // creating an infinite loop to repeat the array
    if (textArrayIndex >= textArray.length) textArrayIndex = 0;

    // typing the first string in the array
    setTimeout(type, typingDelay + 1100);
  }
}

// specifying point of execution for animation to begin on pageload
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(type, newTextDelay + 250);
});

// /////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////

// Section 5 - Contact Form

// selecting elements

const inputs = document.querySelectorAll('.input');

// functions

function focusFunc() {
  let parent = this.parentNode;
  parent.classList.add('focus');
}

function blurFunc() {
  let parent = this.parentNode;
  if (this.value === '') {
    parent.classList.remove('focus');
  }
}

inputs.forEach((input) => {
  input.addEventListener('focus', focusFunc);
  input.addEventListener('blur', blurFunc);
});

// /////////////////////////////

// form spree

window.addEventListener('DOMContentLoaded', function () {
  // get the form elements defined in your html above

  var form = document.getElementById('my-form');
  var status = document.getElementById('status');

  // success and error functions for after the form is submitted

  function success() {
    form.reset();
    status.innerHTML = 'Thanks!';
    status.classList.add('success');
    setTimeout(clearStatus, 4000);
  }

  function error() {
    status.innerHTML = 'Oops! There was a problem.';

    status.classList.add('error');
    setTimeout(clearStatus, 4000);
  }

  const clearStatus = function () {
    status.classList.remove('success');
    status.classList.remove('error');
  };

  // handle the form submission event

  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    var data = new FormData(form);
    ajax(form.method, form.action, data, success, error);
  });
});

// helper function for sending AJAX request

function ajax(method, url, data, success, error) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.setRequestHeader('Accept', 'application/json');
  xhr.onreadystatechange = function () {
    if (xhr.readyState !== XMLHttpRequest.DONE) return;
    if (xhr.status === 200) {
      success(xhr.response, xhr.responseType);
    } else {
      error(xhr.status, xhr.response, xhr.responseType);
    }
  };
  xhr.send(data);
}

// /////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////

// Section 6 - Footer - Copyright Year Automation

const yearSpan = document.querySelector('.current_year');

const currentYear = new Date();

yearSpan.innerText = currentYear.getFullYear();

// section observer for animations

const sliderElements = document.querySelectorAll('.sliding_heading');

const observer = new IntersectionObserver(
  // call back function
  (entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle('show', entry.isIntersecting);
    });
  },
  // configuration options
  {
    threshold: 0.93,
  }
);

sliderElements.forEach((el) => {
  observer.observe(el);
});

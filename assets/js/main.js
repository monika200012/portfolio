gsap.registerPlugin(ScrollTrigger);
const select = (e) => document.querySelector(e);
const selectAll = (e) => document.querySelectorAll(e);

function initLoader() {
  const tlLoaderIn = gsap.timeline({
    id: "tlLoaderIn",
    defaults: {
      duration: 1.2,
      ease: "power2.out",
    },
    onComplete: () => select("body").classList.remove("is-loading"),
  });
  const loader = select(".loader");
  const loaderInner = select(".loader .inner");
  const progressBar = select(".loader .progress");
  const loaderMask = select(".loader__mask");
  const image = select(".loader__image img");
  const mask = select(".loader__image--mask");
  const line1 = select(".loader__title--mask:nth-child(1) span");
  const line2 = select(".loader__title--mask:nth-child(2) span");
  const lines = selectAll(".loader__title--mask");
  const loaderContent = select(".loader__content");
  tlLoaderIn
    .from(
      loaderInner, {
        scaleY: 0,
        transformOrigin: "bottom",
      },
      0.3
    )
    .addLabel("revealImage")
    .from(mask, {
      yPercent: 100
    }, "revealImage-=0.6")
    .from(image, {
      yPercent: -80
    }, "revealImage-=0.6")
    .from([line1, line2], {
      yPercent: 100,
      stagger: 0.1
    }, "revealImage-=0.4");

  const tlLoaderOut = gsap.timeline({
    id: "tlLoaderOut",
    defaults: {
      duration: 1.3,
      ease: "power2.inOut",
    },
    delay: 1,
  });

  tlLoaderOut
    .to(lines, {
      yPercent: -500,
      stagger: 0.2
    }, 0)
    .to([loader, loaderContent], {
      yPercent: -100
    }, 0.2)
    .from("#main", {
      y: 150
    }, 0.2);
  const tlLoader = gsap.timeline();
  tlLoader.add(tlLoaderIn).add(tlLoaderOut);
}


const allLinks = gsap.utils.toArray('.quality__categories a');
const pageBackground = select('.fill-background');
const largeImage = select('.quality__image--l');
const smallImage = select('.quality__image--s');
const lInside = select('.quality__image--l .image_inside');
const sInside = select('.quality__image--s .image_inside');

// Portfolio Hover
function initPortfolioHover() {
  allLinks.forEach(link => {
    link.addEventListener('mouseenter', createPortfolioHover);
    link.addEventListener('mouseleave', createPortfolioHover);
    link.addEventListener('mousemove', createPortfolioMove);
  });
}

function createPortfolioHover(e) {

  if (e.type === 'mouseenter') {

    // change images to the right urls
    // fade in images
    // all siblings to white and fade out
    // active link to white
    // update page background color

    const {
      color,
      imagelarge,
      imagesmall
    } = e.target.dataset;
    const allSiblings = allLinks.filter(item => item !== e.target);
    const tl = gsap.timeline();
    tl
      .set(lInside, {
        backgroundImage: `url(${imagelarge})`
      })
      .set(sInside, {
        backgroundImage: `url(${imagesmall})`
      })
      .to([largeImage, smallImage], {
        autoAlpha: 1
      })
      .to(allSiblings, {
        color: '#fff',
        autoAlpha: 0.2
      }, 0)
      .to(e.target, {
        color: '#fff',
        autoAlpha: 1
      }, 0);

  } else if (e.type === 'mouseleave') {

    // fade out images
    // all links back to black
    // change background color back to default 

    const tl = gsap.timeline();
    tl
      .to([largeImage, smallImage], {
        autoAlpha: 0
      })
      .to(allLinks, {
        color: 'var(--first-color)',
        autoAlpha: 1
      }, 0);

  }

}

function createPortfolioMove(e) {

  const {
    clientY
  } = e;

  // move large image
  gsap.to(largeImage, {
    duration: 1.2,
    y: getPortfolioOffset(clientY) / 6,
    ease: 'power3.out'
  });

  // move small image
  gsap.to(smallImage, {
    duration: 1.5,
    y: getPortfolioOffset(clientY) / 3,
    ease: 'power3.out'
  });

}

function getPortfolioOffset(clientY) {
  return -(select('.quality__categories').clientHeight - clientY);
}

setTimeout(function () {
  var vara = new Vara(
    ".home__title",
    "https://raw.githubusercontent.com/akzhy/Vara/master/fonts/Satisfy/SatisfySL.json",
    [{
      text: "Bijay Paudel .",
      y: 6,
      fromCurrentPosition: {
        y: true
      },
      duration: 5000,
    }, ], {
      strokeWidth: 1.5,
      color: "var(--first-color)",
      fontSize: 28,
      textAlign: "left",
    }
  );
}, 3500);

/*==================== QUALIFICATION TABS ====================*/
let tabs = document.querySelectorAll("[data-target]");
let tabContents = document.querySelectorAll("[data-content]");
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    let target = document.querySelector(tab.dataset.target);
    tabContents.forEach((tabContent) => {
      tabContent.classList.remove("qualification__active");
    });
    target.classList.add("qualification__active");
    tabs.forEach((tab) => {
      tab.classList.remove("qualification__active");
    });
    tab.classList.add("qualification__active");
  });
});


var animation = bodymovin.loadAnimation({
  container: document.querySelector("#animContainer"),
  renderer: "svg",
  loop: true,
  autoplay: true,
  path: "/assets/json/1.json", // lottie file path
});

// /*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader() {
  const nav = document.getElementById("header");
  // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
  if (this.scrollY >= 80) nav.classList.add("scroll-header");
  else nav.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);


/*==================== DARK LIGHT THEME ====================*/
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "far";

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "fas" : "far";

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[selectedIcon === "fas" ? "add" : "remove"](iconTheme);
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener("click", () => {
  // Add or remove the dark / icon theme
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  // We save the theme and the current icon that the user chose
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});
const anim = anime.timeline({
  loop: true,
  direction: "alternate",
});

anim.add({
  targets: "#hexagon path",
  strokeDashoffset: [anime.setDashoffset, 0],
  easing: "easeInOutQuart",
  duration: 4000,
  delay: function (el, i) {
    return i * 250;
  },
});

var swiper__blog = new Swiper(".blog-slider", {
  spaceBetween: 30,
  effect: "fade",
  loop: false,
  mousewheel: {
    invert: false,
  },
  // autoHeight: true,
  pagination: {
    el: ".blog-slider__pagination",
    clickable: true,
  },
});

var swiper__testimonial = new Swiper(".swiper-container", {
  slidesPerView: 1,
  spaceBetween: 10,
  speed: 2500,
  autoplay: {
    delay: 1000,
    pauseOnMouseEnter: true,
    resumeOnMouseLeave: true,
  },
  breakpoints: {
    // when window width is <= 768px
    768: {
      slidesPerView: 2,
      spaceBetweenSlides: 30
    }
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});


$(document).ready(function () {
  var progressPath = document.querySelector(".progress-wrap path");
  var pathLength = progressPath.getTotalLength();

  progressPath.style.transition = progressPath.style.WebkitTransition = "none";
  progressPath.style.strokeDasharray = pathLength + " " + pathLength;
  progressPath.style.strokeDashoffset = pathLength;
  progressPath.getBoundingClientRect();
  progressPath.style.transition = progressPath.style.WebkitTransition =
    "stroke-dashoffset 10ms linear";

  var updateProgress = function () {
    var scroll = $(window).scrollTop();
    var height = $(document).height() - $(window).height();
    var progress = pathLength - (scroll * pathLength) / height;
    progressPath.style.strokeDashoffset = progress;
  };

  updateProgress();
  $(window).scroll(updateProgress);

  var offset = 50;
  var duration = 550;

  jQuery(window).on("scroll", function () {
    if (jQuery(this).scrollTop() > offset) {
      jQuery(".progress-wrap").addClass("active-progress");
    } else {
      jQuery(".progress-wrap").removeClass("active-progress");
    }
  });

  jQuery(".progress-wrap").on("click", function (event) {
    event.preventDefault();
    jQuery("html, body").animate({
      scrollTop: 0
    }, duration);
    return false;
  });
});




const socialMedia = document.querySelector('.c-social-media');
const socialMediaBtn = document.querySelector('.js-share-btn');
const socialMediaBtnIcon = document.querySelector('.c-social-media__icon');
const socialMediaItems = [...document.querySelectorAll('.c-social-media__item')];

const socialMediaCounts = socialMediaItems.length;
const midCounts = socialMediaCounts / 2;
const socialMediaSpacing = 60;

const activateSocialMedia = () => {
  TweenMax.to(socialMediaBtn, 0.1, {
    scaleX: 1.2,
    scaleY: 0.6,
    ease: Quad.easeOut,
    onComplete: () => {
      TweenMax.to(socialMediaBtn, 0.8, {
        scale: 1,
        ease: Elastic.easeOut.config(1.1, 0.6),
      });

      TweenMax.to(socialMediaBtnIcon, 0.8, {
        scale: 1,
        ease: Elastic.easeOut.config(1.1, 0.6),
      })
    },
  });

  socialMediaItems.map((item, i) => {
    let pos = i - midCounts;
    if (pos >= 0) pos += 1;
    const dist = Math.abs(pos);

    TweenMax.to(item, 1.1 * dist, {
      x: pos * socialMediaSpacing,
      ease: Elastic.easeOut.config(1.01, 0.5),
    });

    TweenMax.to(item, 0.8, {
      delay: 0.1 * dist,
      ease: Elastic.easeOut.config(1.1, 0.6),
    });
  });
};


socialMediaBtn.addEventListener("click", activateSocialMedia);

let switcher = document.querySelectorAll('.fa-brush');
switcher.forEach(color => {
  color.addEventListener('click', () => {
    let datacode = color.getAttribute('data-color');
    document.querySelector(':root').style.setProperty('--hue-color', datacode);
  });
});

function initCursor() {
  const mouseCircle = document.querySelector(".mouse-circle");
  const mouseDot = document.querySelector(".mouse-dot");

  let mouseCircleBool = true;

  const mouseCircleFn = (x, y) => {
    mouseCircleBool &&
      (mouseCircle.style.cssText = `top: ${y}px; left: ${x}px; opacity: 1`);

    mouseDot.style.cssText = `top: ${y}px; left: ${x}px; opacity: 1`;
  };
  document.body.addEventListener("mousemove", (e) => {
    let x = e.clientX;
    let y = e.clientY;

    mouseCircleFn(x, y);
    animateCircles(e, x, y);

  });
  // Animated Circles
  const circles = document.querySelectorAll(".circle");

  let mX = 0;
  let mY = 0;
  const z = 100;

  const animateCircles = (e, x, y) => {
    if (x < mX) {
      circles.forEach((circle) => {
        circle.style.left = `${z}px`;
      });
    } else if (x > mX) {
      circles.forEach((circle) => {
        circle.style.left = `-${z}px`;
      });
    }

    if (y < mY) {
      circles.forEach((circle) => {
        circle.style.top = `${z}px`;
      });
    } else if (y > mY) {
      circles.forEach((circle) => {
        circle.style.top = `-${z}px`;
      });
    }

    mX = e.clientX;
    mY = e.clientY;
  };
  // End of Animated Circles

}
const allForm = document.querySelectorAll(".form input,.form textarea");
for (let form of allForm) {
  form.addEventListener('input', function () {
    if (this.checkValidity()) {
      this.classList.add('valid');
      this.classList.remove('invalid');
    } else {
      this.classList.add('invalid');
      this.classList.remove('valid');
    }
    if (this.valid == "") {
      this.classList.remove('valid');
      this.classList.remove('invalid');
    }
  });
}



var contact__form = document.querySelector('.contact__form');
var contact__button = document.querySelector('.contactme__button');
var contact__close = document.querySelector('.contact__close');

contact__button.addEventListener('click', () => {
  contact__form.classList.add('active__modal');
})
contact__close.addEventListener('click', () => {
  contact__form.classList.remove('active__modal')
})

function initHeaderTilt() {
  select('.home').addEventListener('mousemove', moveImages);
}

function moveImages(e) {

  const {
    offsetX,
    offsetY,
    target
  } = e;
  const {
    clientWidth,
    clientHeight
  } = target;

  const xPos = (offsetX / clientWidth) - 0.5;
  const yPos = (offsetY / clientHeight) - 0.5;

  const image = select('.home__img');
  gsap.to(image, {
    duration: 1.2,
    x: xPos * 10,
    y: yPos * 15,
    rotationY: xPos * 60,
    rotationX: yPos * 20,
    ease: 'power3.out'
  });
}


function init() {
  initLoader();
  initPortfolioHover();
}

window.addEventListener("load", function () {
  init();
});

function initTilt() {
  VanillaTilt.init(document.querySelectorAll('.project__content .item'), {
    max: 25,
    perspective: 700,
    speed: 400
  });
}
var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
if (width >= 768) {
  initTilt();
  initHeaderTilt();
  initCursor();
};
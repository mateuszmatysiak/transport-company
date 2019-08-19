//Variables

let isThrottledMenu = false;
let isThrottledScroll = false;

const color = {
  black: "#171717",
  brown: "#442b2b",
  blue: "#0F3BCF",
  aqua: "#2fa79d",
  orange: "#caa708"
};

const moveToHeader = document.querySelectorAll(".moveToHeader");
const moveToAbout = document.querySelector(".moveToAbout");
const moveToEquipment = document.querySelectorAll(".moveToEquipment");
const moveToRealizations = document.querySelectorAll(".moveToRealizations");
const moveToContact = document.querySelectorAll(".moveToContact");
const menuMobile = document.querySelector(".menu-mobile");
const scrollBar = document.querySelector(".scroll__bar");
const sections = document.querySelectorAll("section");
let currentIndexSection = 0;

const mediaQueriesMin768px = window.matchMedia("(min-width: 768px)");
const mediaQueriesMax768px = window.matchMedia("(max-width: 768px)");

// Typing in hero section

const typeAnimations = {
  strings: [
    "z ponad 25 letnim doświadczeniem.",
    "^1000zatrudniającą najlepszych pracowników na rynku.",
    "^1000dysponującą dużym placem transportowo-maszynowym."
  ],
  typeSpeed: 40,
  backSpeed: 40,
  startDelay: 1000,
  backDelay: 1000,
  loop: true
};

const typed = new Typed(".content__span", typeAnimations);

// Transformating bars in hamburger menu

const transformBars = () => {
  if (
    !document
    .querySelectorAll(".menu-burger__bar")
    .forEach(bar => bar.classList.contains("menu-burger__bar--active"))
  ) {
    document
      .querySelectorAll(".menu-burger__bar")
      .forEach(bar => bar.classList.toggle("menu-burger__bar--active"));
  }
};

// Open/close menu

const activeMenu = () => {
  document.body.classList.add("body-hidden");
  document
    .querySelector(".menu-mobile")
    .classList.add("menu-mobile--active-display");
  setTimeout(() => {
    document
      .querySelector(".menu-mobile")
      .classList.add("menu-mobile--active-opacity");
  }, 100);
};

const inActiveMenu = () => {
  document.body.classList.remove("body-hidden");
  document
    .querySelector(".menu-mobile")
    .classList.remove("menu-mobile--active-opacity");
  setTimeout(() => {
    document
      .querySelector(".menu-mobile")
      .classList.remove("menu-mobile--active-display");
  }, 200);
};

const openMenu = () => {
  if (isThrottledMenu) return;
  isThrottledMenu = true;
  setTimeout(() => (isThrottledMenu = false), 500);

  transformBars();
  if (!document.body.classList.contains("body-hidden")) {
    activeMenu();
  } else {
    inActiveMenu();
  }
};

// Scroll to selected section

const scrollTo = element => {
  window.scroll({
    behavior: "smooth",
    left: 0,
    top: element.offsetTop
  });
};

// Scroll move

const scrollMove = (index, top, color) => {
  currentIndexSection = index;
  scrollBar.style.top = top;
  scrollBar.style.backgroundColor = color;
  setTimeout(() => (menuMobile.style.backgroundColor = color), 500);
};

// Inactive arrow in hero section

document.addEventListener("scroll", () => {
  if (window.scrollY > document.querySelector(".hero").offsetHeight / 2)
    document.querySelector(".arrow").classList.add("arrow-inactive");
});

// Move to section, scroll move, inactive menu, transformating bars

moveToHeader.forEach(item =>
  item.addEventListener("click", () => {
    scrollTo(document.querySelector(".hero"));
    scrollMove(0, "20px", color.black);
    inActiveMenu();
    document.querySelector(".menu-desktop").classList.remove("menu-desktop--active");
    if (document.querySelector(".menu-burger__bar").classList.contains("menu-burger__bar--active")) {
      transformBars();
    }
  })
);

moveToAbout.addEventListener("click", () => {
  scrollTo(document.querySelector(".about"));
  scrollMove(1, "20%", color.brown);
  inActiveMenu();
  transformBars();
});

moveToEquipment.forEach(item => item.addEventListener("click", () => {
  scrollTo(document.querySelector(".equipment"));
  scrollMove(2, "40%", color.blue);
  inActiveMenu();
  if (document.querySelector(".menu-burger__bar").classList.contains("menu-burger__bar--active")) {
    transformBars();
  }
}));

moveToRealizations.forEach(item => item.addEventListener("click", () => {
  scrollTo(document.querySelector(".realizations"));
  scrollMove(3, "60%", color.aqua);
  inActiveMenu();
  if (document.querySelector(".menu-burger__bar").classList.contains("menu-burger__bar--active")) {
    transformBars();
  }
}));

moveToContact.forEach(item => item.addEventListener("click", () => {
  scrollTo(document.querySelector(".contact"));
  scrollMove(4, "calc(100% - 140px)", color.orange);
  inActiveMenu();
  if (document.querySelector(".menu-burger__bar").classList.contains("menu-burger__bar--active")) {
    transformBars();
  }
}));

// Open menu

document.querySelector(".menu-burger").addEventListener("click", openMenu);

// Scrolling from section to section

if (mediaQueriesMin768px.matches) {
  document.addEventListener("wheel", e => {
    if (isThrottledScroll) return;
    isThrottledScroll = true;
    setTimeout(() => (isThrottledScroll = false), 1000);

    const direction = e.deltaY > 0 ? 1 : -1;

    if (direction === 1) {
      const isLastSection = currentIndexSection === sections.length - 1;

      if (isLastSection) return;
    } else if (direction === -1) {
      const isFirstSection = currentIndexSection === 0;
      if (isFirstSection) return;
    }
    currentIndexSection = currentIndexSection + direction;

    sections[currentIndexSection].scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

    document.addEventListener("scroll", (e) => {
      const listDesktopItems = e.target.scrollingElement.lastElementChild.firstElementChild.firstElementChild.firstElementChild.lastElementChild.children;
      const activeDesktopMenu = (number) => {
        document.querySelector('.menu-desktop').classList.add('menu-desktop--active')
        document.querySelectorAll('.menu-desktop__item').forEach(item => item.classList.remove('menu-desktop__item-text'));
        listDesktopItems[number].classList.add('menu-desktop__item-text');
      }

      if (currentIndexSection === 0) {
        scrollMove(0, "20px", color.black);
        document.querySelectorAll('.menu-desktop__item').forEach(item => item.classList.remove('menu-desktop__item-text'));
        document.querySelector('.menu-desktop').classList.remove('menu-desktop--active')
      } else if (currentIndexSection === 1) {
        scrollMove(1, "20%", color.brown);
        activeDesktopMenu(0)
      } else if (currentIndexSection === 2) {
        scrollMove(2, "40%", color.blue);
        activeDesktopMenu(1)
      } else if (currentIndexSection === 3) {
        scrollMove(3, "60%", color.aqua);
        activeDesktopMenu(2)
      } else if (currentIndexSection === 4) {
        scrollMove(4, "calc(100% - 140px)", color.orange);
        activeDesktopMenu(3)
      }
    });
  }); // Set background color in open menu
} else if (mediaQueriesMax768px.matches) {
  document.addEventListener("scroll", () => {
    if (window.scrollY < document.querySelector(".about").offsetTop / 1.2) {
      menuMobile.style.backgroundColor = color.black;
    }
    if (window.scrollY > document.querySelector(".about").offsetTop / 1.2) {
      menuMobile.style.backgroundColor = color.brown;
    }
    if (window.scrollY > document.querySelector(".equipment").offsetTop / 1.1) {
      menuMobile.style.backgroundColor = color.blue;
    }
    if (
      window.scrollY >
      Math.floor(document.querySelector(".realizations").offsetTop / 1.05)
    ) {
      menuMobile.style.backgroundColor = color.aqua;
    }
    if (
      window.scrollY >
      Math.floor(document.querySelector(".contact").offsetTop / 1.03)
    ) {
      menuMobile.style.backgroundColor = color.orange;
    }
  });
}

// Change background color menu depending on the selected section

document.querySelectorAll('.menu-mobile__item').forEach(item => item.addEventListener('mousemove', (e) => {
  e.target.parentNode.parentNode.style.backgroundColor = e.target.dataset.color
}));

// Change background color menu depending on default color of section

document.querySelector('.menu-mobile').addEventListener('mousemove', (e) => {
  const section = e.target.parentElement.parentElement.parentElement.children;
  try {
    e.target.style.backgroundColor = section[currentIndexSection].dataset.color;
  } catch (e) {}
})

// Set wrapper-loader to position unset

setTimeout(() => {
  document.querySelector('.wrapper-loader').classList.add('wrapper-loader--inactive');
  document.body.classList.remove("body-hidden");
}, 4000);
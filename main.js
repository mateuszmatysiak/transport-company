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

let isThrottled = false;

const openMenu = () => {
  if (isThrottled) return;
  isThrottled = true;
  setTimeout(() => (isThrottled = false), 500);

  transformBars();
  if (!document.body.classList.contains("body-hidden")) {
    activeMenu();
  } else {
    inActiveMenu();
  }
};

const scrollTo = element => {
  window.scroll({
    behavior: "smooth",
    left: 0,
    top: element.offsetTop,
  });
};

document.querySelectorAll(".moveToHeader").forEach(item =>
  item.addEventListener("click", () => {
    scrollTo(document.querySelector(".hero"));
    inActiveMenu();
    if (
      document
        .querySelector(".menu-burger__bar")
        .classList.contains("menu-burger__bar--active")
    ) {
      transformBars();
    }
  })
);

document.querySelector(".moveToAbout").addEventListener("click", () => {
  scrollTo(document.querySelector(".about"));
  inActiveMenu();
  transformBars();
});

document.querySelector(".moveToEquipment").addEventListener("click", () => {
  scrollTo(document.querySelector(".equipment"));
  inActiveMenu();
  transformBars();
});

document.querySelector(".moveToRealizations").addEventListener("click", () => {
  scrollTo(document.querySelector(".realizations"));
  inActiveMenu();
  transformBars();
});

document.querySelector(".moveToContact").addEventListener("click", () => {
  scrollTo(document.querySelector(".contact"));
  inActiveMenu();
  transformBars();
});

document.querySelector(".menu-burger").addEventListener("click", openMenu);

window.addEventListener("scroll", () => {
  if (
    window.scrollY >
    Math.floor(document.querySelector(".hero").offsetHeight / 1.3)
  ) {
    document.querySelector(".arrow").classList.add("arrow-inactive");
  }
});

window.addEventListener("scroll", () => {
  if (
    window.scrollY <
    Math.floor(document.querySelector(".hero").offsetHeight / 1.2)
  ) {
    document.querySelector(".menu-mobile").style.backgroundColor = "#171717";
  }
  if (
    window.scrollY >
    Math.floor(document.querySelector(".about").offsetTop / 1.3)
  ) {
    document.querySelector(".menu-mobile").style.backgroundColor = "#442b2b";
  }
  if (
    window.scrollY >
    Math.floor(document.querySelector(".equipment").offsetTop / 1.2)
  ) {
    document.querySelector(".menu-mobile").style.backgroundColor = "#0F3BCF";
  }
  if (
    window.scrollY >
    Math.floor(document.querySelector(".realizations").offsetTop / 1.1)
  ) {
    document.querySelector(".menu-mobile").style.backgroundColor = "#2fa79d";
  }
  if (
    window.scrollY >
    Math.floor(document.querySelector(".contact").offsetTop / 1.1)
  ) {
    document.querySelector(".menu-mobile").style.backgroundColor = "#caa708";
  }
});

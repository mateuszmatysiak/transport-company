let isThrottled = false;

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

document.querySelector(".menu-burger").addEventListener("click", openMenu);

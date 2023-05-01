const sliders = [
  {
    // ferienfreizeiten > slider
    slider: document.querySelector(".ff #ff-slider"),
    leftArrow: document.querySelector(".ff .img-btn:first-of-type"),
    rightArrow: document.querySelector(".ff .img-btn:last-of-type"),
  },
  {
    // ferienfreizeiten > segeln und biken > carrousel slider
    slider: document.querySelector(".ff-sub #ff-sub-carrousel-wrapper"),
    leftArrow: document.querySelector(".ff-sub .img-btn:first-of-type"),
    rightArrow: document.querySelector(".ff-sub .img-btn:last-of-type"),
  },
];

sliders.forEach((sliderObj) => {
  const [slider, leftArrow, rightArrow] = Object.values(sliderObj);
  if (slider != null) {
    rightArrow.addEventListener("click", () => {
      sliderSliding = true;
      slider.classList.add("right");
      const first = slider.firstElementChild;
      setTimeout(() => {
        slider.appendChild(first);
        slider.classList.remove("right");
        sliderSliding = false;
      }, 500);
    });

    leftArrow.addEventListener("click", () => {
      slider.classList.add("left");
      const first = slider.firstElementChild;
      const last = slider.lastElementChild;
      setTimeout(() => {
        slider.insertBefore(last, first);
        slider.classList.remove("left");
        sliderSliding = false;
      }, 500);
    });
  }
});

// ferienfreizeiten > tabs

const tabBtnContainer = document.querySelector(".ff .tabs");
const tabContentContainer = document.querySelectorAll(
  ".ff main > section:nth-of-type(3) > section"
);

if (tabBtnContainer != null) {
  const tabBtns = [...tabBtnContainer.children];
  tabBtns.forEach((tabBtn) => {
    tabBtn.addEventListener("click", () => {
      tabBtns.forEach((tabBtn) => {
        tabBtn.classList.remove("active");
      });
      tabBtn.classList.add("active");

      const old = [...tabContentContainer].find((tab) =>
        tab.classList.contains("active")
      );

      old.classList.remove("active");
      old.classList.add("fade-out");
      console.log(old);

      setTimeout(() => {
        tabContentContainer[
          [...tabBtnContainer.children].indexOf(tabBtn)
        ].classList.add("active");
        old.classList.remove("fade-out");
      }, 200);
    });
  });
}

// index boder radius

const images = document.querySelectorAll(
  '.ix section:nth-child(1) [role="img"]'
);

const setRadius = (image) => {
  const width = image.getBoundingClientRect().width;
  const height = image.getBoundingClientRect().height;
  const radius = Math.min(width, height) / 2;
  image.style.borderRadius = `${radius}px`;
};

console.log(images);
if (images != null) {
  // set the data-radius attribute to half the with of the smallest side of the box
  images.forEach((image) => {
    setRadius(image);
  });

  // if window is resized, set the radius again
  window.addEventListener("resize", () => {
    images.forEach((image) => {
      setRadius(image);
    });
  });
}

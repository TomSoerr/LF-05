setTimeout(function () {
  document.body.classList.remove("preload");
}, 1000);

// index boder radius

const images = document.querySelectorAll(
  '.ix section:nth-of-type(1) [role="img"]'
);

const setRadius = (image) => {
  const width = image.getBoundingClientRect().width;
  const height = image.getBoundingClientRect().height;
  const radius = Math.min(width, height) / 2;
  image.style.borderRadius = `${radius}px`;
};

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

      setTimeout(() => {
        tabContentContainer[
          [...tabBtnContainer.children].indexOf(tabBtn)
        ].classList.add("active");
        old.classList.remove("fade-out");
      }, 200);
    });
  });
}

// australien > slider

if (document.querySelector("body.aus") != null) {
  const getUIElements = (
    menuSelector,
    buttonSelector,
    contentSelector,
    imageSelector
  ) => {
    const menuContainer = document.querySelectorAll(menuSelector);
    const buttonsLeft = document.querySelector(
      buttonSelector + ":first-of-type"
    );
    const buttonsRight = document.querySelector(
      buttonSelector + ":last-of-type"
    );
    const contentContainer = document.querySelectorAll(contentSelector);
    const images = document.querySelectorAll(imageSelector);

    const sliderObject = [];

    for (const i in [...contentContainer]) {
      const obj = {
        id: i,
        menu: menuContainer[i],
        image: images[i],
        content: contentContainer[i],
        activate: function () {
          const oldMenu = [...menuContainer].find((item) =>
            item.classList.contains("active")
          );

          oldMenu.classList.remove("active");

          const oldContent = [...contentContainer].find((item) =>
            item.classList.contains("active")
          );

          oldContent.classList.remove("active");
          oldContent.classList.add("fade-out");

          const oldImage = [...images].find((item) =>
            item.classList.contains("active")
          );

          oldImage.classList.remove("active");
          oldImage.classList.add("fade-out");

          setTimeout(() => {
            oldContent.classList.remove("fade-out");
            oldImage.classList.remove("fade-out");

            this.image.classList.add("active");
            this.content.classList.add("active");
          }, 200);
          this.menu.classList.add("active");
        },
      };
      menuContainer[i].addEventListener("click", obj.activate.bind(obj));

      sliderObject.push(obj);
    }

    const left = () => {
      const active = sliderObject.find((item) =>
        item.content.classList.contains("active")
      );
      const index = sliderObject.indexOf(active);
      if (index > 0) {
        sliderObject[index - 1].activate();
      } else {
        sliderObject[sliderObject.length - 1].activate();
      }
    };
    buttonsLeft.addEventListener("click", left);

    const right = () => {
      const active = sliderObject.find((item) =>
        item.content.classList.contains("active")
      );

      const index = sliderObject.indexOf(active);
      if (index < sliderObject.length - 1) {
        sliderObject[index + 1].activate();
      } else {
        sliderObject[0].activate();
      }
    };
    buttonsRight.addEventListener("click", right);

    return [sliderObject, left, right];
  };

  const ausSlider1 = getUIElements(
    ".aus main > section:nth-of-type(2) nav ul li button",
    ".aus main > section:nth-of-type(2) > button",
    ".aus main > section:nth-of-type(2) > .text-wrapper section",
    ".aus main > section:nth-of-type(2) > .img-wrapper > div"
  );

  const ausSlider2 = getUIElements(
    ".aus main > section:nth-of-type(3) nav ul li button",
    ".aus main > section:nth-of-type(3) > button",
    ".aus main > section:nth-of-type(3) > .text-wrapper section",
    ".aus main > section:nth-of-type(3) > .img-wrapper > div"
  );
}

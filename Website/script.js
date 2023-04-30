// ferienfreizeiten > segeln und biken > carrousel slider

const slider = document.querySelector(".ff-sub #ff-sub-carrousel-wrapper");
const leftArrow = document.querySelector(".ff-sub .img-btn:first-of-type");
const rightArrow = document.querySelector(".ff-sub .img-btn:last-of-type");
let sliderSliding = false;

if (slider != null) {
  rightArrow.addEventListener("click", () => {
    sliderSliding = true;
    slider.classList.add("right");
    const first = slider.firstElementChild;
    setTimeout(() => {
      slider.appendChild(first);
      slider.classList.remove("right");
      sliderSliding = false;
    }, 505);
  });

  leftArrow.addEventListener("click", () => {
    slider.classList.add("left");
    const first = slider.firstElementChild;
    const last = slider.lastElementChild;
    setTimeout(() => {
      slider.insertBefore(last, first);
      slider.classList.remove("left");
      sliderSliding = false;
    }, 505);
  });
}

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

      // const activeTab = tabContentContainer.querySelector(".active");
      // activeTab.classList.remove("active");
      // activeTab.classList.add("fade-out");

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

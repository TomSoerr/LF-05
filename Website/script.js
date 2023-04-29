// ferienfreizeiten > segeln und biken > carrousel slider

const slider = document.querySelector(".ff-sub #ff-sub-carrousel-wrapper");
const leftArrow = document.querySelector(".ff-sub .img-btn:first-of-type");
const rightArrow = document.querySelector(".ff-sub .img-btn:last-of-type");
let sliderSliding = false;

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

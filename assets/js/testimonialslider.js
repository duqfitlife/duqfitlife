const t_wrapper = document.querySelector(".testimonial-wrapper");
const t_carousel = t_wrapper.querySelector(".carousel");
const t_firstCardWidth = t_carousel.querySelector(".card").offsetWidth;
const t_arrowBtns = document.querySelectorAll(".testimonial-wrapper i");
const t_carouselChildrens = [...t_carousel.children];

let t_isDragging = false, t_isAutoPlay = true, t_startX, t_startScrollLeft, t_timeoutId;
// Get the number of cards that can fit in the carousel at once
let t_cardPerView = Math.round(t_carousel.offsetWidth / t_firstCardWidth);
// Insert copies of the last few cards to beginning of carousel for infinite scrolling
t_carouselChildrens.slice(-t_cardPerView).reverse().forEach(card => {
    t_carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});
// Insert copies of the first few cards to end of carousel for infinite scrolling
t_carouselChildrens.slice(0, t_cardPerView).forEach(card => {
    t_carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});
// Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
t_carousel.classList.add("no-transition");
t_carousel.scrollLeft = t_carousel.offsetWidth;
t_carousel.classList.remove("no-transition");
// Add event listeners for the arrow buttons to scroll the carousel left and right
t_arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        t_carousel.scrollLeft += btn.id == "left2" ? -t_firstCardWidth : t_firstCardWidth;
    });
});

const t_dragStart = (e) => {
    t_isDragging = true;
    t_carousel.classList.add("t_dragging");
    // Records the initial cursor and scroll position of the carousel
    t_startX = e.pageX;
    t_startScrollLeft = t_carousel.scrollLeft;
}
const t_dragging = (e) => {
    if(!t_isDragging) return; // if isDragging is false return from here
    // Updates the scroll position of the carousel based on the cursor movement
    t_carousel.scrollLeft = t_startScrollLeft - (e.pageX - t_startX);
}
const t_dragStop = () => {
    t_isDragging = false;
    t_carousel.classList.remove("t_dragging");
}
const t_infiniteScroll = () => {
    // If the carousel is at the beginning, scroll to the end
    if(t_carousel.scrollLeft === 0) {
        t_carousel.classList.add("no-transition");
        t_carousel.scrollLeft = t_carousel.scrollWidth - (2 * t_carousel.offsetWidth);
        t_carousel.classList.remove("no-transition");
    }
    // If the carousel is at the end, scroll to the beginning
    else if(Math.ceil(t_carousel.scrollLeft) === t_carousel.scrollWidth - t_carousel.offsetWidth) {
        t_carousel.classList.add("no-transition");
        t_carousel.scrollLeft = t_carousel.offsetWidth;
        t_carousel.classList.remove("no-transition");
    }
    // Clear existing timeout & start autoplay if mouse is not hovering over carousel
    clearTimeout(t_timeoutId);
    if(!t_wrapper.matches(":hover")) autoPlay();
}
const t_autoPlay = () => {
    if(window.innerWidth < 1 || !t_isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
    // Autoplay the carousel after every 2500 ms
    t_timeoutId = setTimeout(() => t_carousel.scrollLeft += t_firstCardWidth, 3000);
}
autoPlay();
t_carousel.addEventListener("mousedown", t_dragStart);
t_carousel.addEventListener("mousemove", t_dragging);
document.addEventListener("mouseup", t_dragStop);
t_carousel.addEventListener("scroll", t_infiniteScroll);
t_wrapper.addEventListener("mouseenter", () => clearTimeout(t_timeoutId));
t_wrapper.addEventListener("mouseleave", t_autoPlay);
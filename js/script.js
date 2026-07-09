const imageBox = document.querySelector(".image-box");

/* =========================
   IMAGE EFFECT
========================= */

imageBox.addEventListener("mousemove", (e) => {

  const rect = imageBox.getBoundingClientRect();

  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const rotateY = ((x / rect.width) - 0.5) * 12;
  const rotateX = ((y / rect.height) - 0.5) * -12;

  imageBox.style.transform =
  `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

});

imageBox.addEventListener("mouseleave", () => {

  imageBox.style.transform =
  "rotateX(0deg) rotateY(0deg)";

});


/* =========================
   CERTIFICATES FILTER
========================= */

const filterButtons =
document.querySelectorAll(".filter-btn");

const certificateCards =
document.querySelectorAll(".certificate-card");

filterButtons.forEach((button) => {

  button.addEventListener("click", () => {

    filterButtons.forEach((btn) => {

      btn.classList.remove("active");

    });

    button.classList.add("active");

    const filter =
    button.getAttribute("data-filter");

    certificateCards.forEach((card) => {

      if (
        filter === "all" ||
        card.classList.contains(filter)
      ) {

        card.style.display = "block";

      } else {

        card.style.display = "none";

      }

    });

  });

});
/* =========================
   SCROLL TO TOP
========================= */

const scrollTopBtn =
document.getElementById("scrollTopBtn");

window.addEventListener("scroll",()=>{

  if(window.scrollY > 300){

    scrollTopBtn.classList.add("show");

  }

  else{

    scrollTopBtn.classList.remove("show");

  }

});

scrollTopBtn.addEventListener("click",()=>{

  window.scrollTo({

    top:0,

    behavior:"smooth"

  });

});
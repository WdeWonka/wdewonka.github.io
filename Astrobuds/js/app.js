// --------- LiL FiXES -----------------

window.addEventListener("beforeunload", function () {
  //Iniciar en el top cada que se refresca la pagina
  window.scrollTo(0, 0);
});

// --------- NAVBAR TOGGLE-----------------
const iconToggle = document.getElementById("nav-toggle");
const menu = document.querySelector(".menu");
const navbar = document.querySelector(".nav-links");
const header = document.querySelector("header");

menu.onclick = () => {
  iconToggle.classList.toggle("active");
  navbar.classList.toggle("on");
};

window.addEventListener("scroll", function () {
  header.classList.toggle("sticky", window.scrollY > 0);
});

document.addEventListener("click", (e) => {
  if (!menu.contains(e.target) && !navbar.contains(e.target)) {
    navbar.classList.remove("on");
  }
});

// -----------PARALLAX EFFECT -----------------
const parallax_mul = document.querySelectorAll(".parallax");
const hero = document.querySelector("#hero");
let xValue = 0,
  yValue = 0;

function update() {
  parallax_mul.forEach((el) => {
    let speedx = el.dataset.speedx;
    let speedy = el.dataset.speedy;

    el.style.transform = ` translateX(calc(-50% + ${xValue * speedx}px)) 
      translateY(calc(-50% + ${yValue * speedy}px)) `;
  });
}

update(0);

window.addEventListener("mousemove", (e) => {
  if (timeline.isActive()) return;

  xValue = e.clientX - window.innerWidth / 2;
  yValue = e.clientY - window.innerHeight / 2;

  update();
});

if (window.innerWidth <= 450) {
  hero.style.maxHeight = ` ${window.innerWidth * 1.74}px`;
}

// -------------------GSAP------------------------

window.addEventListener("load", () => {
  timeline.to(header, { opacity: 1, duration: 1 });
});

document.querySelector("*").style.overflow = "hidden";
const timeline = gsap.timeline({
  onComplete: () => {
    document.querySelector("*").style.overflow = "auto";
  },
});

gsap.to(".big-planet", {
  y: -75,
  duration: 2,
  yoyo: true,
  repeat: -2,
  ease: "power1.inOut",
});

gsap.to(".lil-planet", {
  y: -75,
  duration: 3,
  yoyo: true,
  repeat: -2,
  ease: "power1.inOut",
});

timeline
  .from(".text-title", {
    opacity: 0,
    duration: 2,
    ease: "easeInOut",
  })
  .from(".hide", {
    opacity: 0,
    duration: 2,
    ease: "easeInOut",
  });

Array.from(parallax_mul)
  .filter((el) => !el.classList.contains(".text-title"))
  .forEach((el) => {
    timeline.from(
      el,
      {
        top: `${el.offsetHeight / 2 + -el.dataset.distance}px`,
        duration: 2.5,
        ease: "power3.out",
      },
      "2"
    );
  });

// -------------------- FLiP CARDS --------------------

const cards = document.querySelectorAll(".flip-card");

cards.forEach((card) => {
  card.addEventListener("click", () => {
    card.classList.toggle("flip-front");
    card.classList.toggle("flip-back");
  });
});

// -------------------- TESTiMONiAL --------------------

var li = document
  .getElementsByClassName("testimonial-indis")[0]
  .getElementsByTagName("li");

var preview = document.getElementsByClassName("preview");
var index = 0;

function right() {
  if (index !== li.length) {
    index++;

    if (index !== li.length) {
      li[index - 1].classList.remove("active");
      li[index].classList.add("active");
      preview[index - 1].classList.remove("active-preview");
      preview[index].classList.add("active-preview");
    } else if (index == li.length) {
      li[li.length - 1].classList.remove("active");
      li[0].classList.add("active");
      preview[preview.length - 1].classList.remove("active-preview");
      preview[0].classList.add("active-preview");
    }
  }

  if (index == li.length) {
    index = 0;
  }
}

function left() {
  if (index !== -1) {
    index--;
    if (index !== -1) {
      li[index + 1].classList.remove("active");
      li[index].classList.add("active");
      preview[index + 1].classList.remove("active-preview");
      preview[index].classList.add("active-preview");
    } else if (index == -1) {
      li[0].classList.remove("active");
      li[li.length - 1].classList.add("active");
      preview[0].classList.remove("active-preview");
      preview[preview.length - 1].classList.add("active-preview");
    }
  }
  if (index == -1) {
    index = li.length - 1;
  }
}

//-------------- LOGOUT -----------------
const logout = document.querySelector(".btn-login");

let isLoggedIn = localStorage.getItem("isLoggedIn");

console.log(isLoggedIn);

logout.addEventListener("click", () => {
  if (isLoggedIn === "true") {
    localStorage.setItem("isLoggedIn", "false");
    window.location.replace("index.html");
  } else {
    console.log("user is not logged in)");
  }
});

//--------If not register, go back to index -------------
document.addEventListener("DOMContentLoaded", function () {
  let isLoggedIn = localStorage.getItem("isLoggedIn");

  if (!isLoggedIn || isLoggedIn !== "true") {
    window.location.replace("index.html");
  }
});

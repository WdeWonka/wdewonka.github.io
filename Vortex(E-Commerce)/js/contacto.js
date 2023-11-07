const inputs = document.querySelectorAll(".contact-input");

inputs.forEach((centrum) => {
  centrum.addEventListener("focus", () => {
    centrum.parentNode.classList.add("focus");
    centrum.parentNode.classList.add("not-empty");
  });
  centrum.addEventListener("blur", () => {
    centrum.parentNode.classList.remove("focus");
    if (centrum.value === "") {
      centrum.parentNode.classList.remove("not-empty");
    }
  });
});

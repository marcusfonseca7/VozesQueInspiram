popupBackground = document.getElementById("popupBackground");
buttonPopup = document.getElementById("buttonPopup");
popupContent = document.getElementById("popupContent");
body = document.body;
x = document.getElementById("x");
divStars = document.querySelector(".stars")

star1 = document.getElementById("starOne");
star2 = document.getElementById("starTwo");
star3 = document.getElementById("starThree");
star4 = document.getElementById("starFour");
star5 = document.getElementById("starFive");

function closePopup() {
  popupBackground.classList.remove("opened");
  popupContent.classList.remove("opened");
  body.classList.remove("opened");
}

function cleanStars() {
  starOne.src = "img/estrelaCinza.png";
  starTwo.src = "img/estrelaCinza.png";
  starThree.src = "img/estrelaCinza.png";
  starFour.src = "img/estrelaCinza.png";
  starFive.src = "img/estrelaCinza.png";
}

divStars.addEventListener("mouseout", () => {
  cleanStars()
})

// Selecionar Estrelas ------ REFATORAR
starOne.addEventListener("mouseover", () => {
  starOne.src = "img/estrelaAmarela.png";

  starTwo.src = "img/estrelaCinza.png";
  starThree.src = "img/estrelaCinza.png";
  starFour.src = "img/estrelaCinza.png";
  starFive.src = "img/estrelaCinza.png";
});

starTwo.addEventListener("mouseover", () => {
  starOne.src = "img/estrelaAmarela.png";
  starTwo.src = "img/estrelaAmarela.png";

  starThree.src = "img/estrelaCinza.png";
  starFour.src = "img/estrelaCinza.png";
  starFive.src = "img/estrelaCinza.png";
});

starThree.addEventListener("mouseover", () => {
  starOne.src = "img/estrelaAmarela.png";
  starTwo.src = "img/estrelaAmarela.png";
  starThree.src = "img/estrelaAmarela.png";

  starFour.src = "img/estrelaCinza.png";
  starFive.src = "img/estrelaCinza.png";
});

starFour.addEventListener("mouseover", () => {
  starOne.src = "img/estrelaAmarela.png";
  starTwo.src = "img/estrelaAmarela.png";
  starThree.src = "img/estrelaAmarela.png";
  starFour.src = "img/estrelaAmarela.png";

  starFive.src = "img/estrelaCinza.png";
});

starFive.addEventListener("mouseover", () => {
  starOne.src = "img/estrelaAmarela.png";
  starTwo.src = "img/estrelaAmarela.png";
  starThree.src = "img/estrelaAmarela.png";
  starFour.src = "img/estrelaAmarela.png";
  starFive.src = "img/estrelaAmarela.png";
});

const quill = new Quill("#editor", {
  theme: "snow",
  placeholder: "Digite seu texto aqui...",
});

buttonPopup.addEventListener("click", () => {
  popupBackground.classList.add("opened");
  popupContent.classList.add("opened");
  body.classList.add("opened");
});

//pegar texto formatado em html na hora de salvar o formulario
// const htmlDoTexto = quill.getSemanticHTML();

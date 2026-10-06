const popupBackground = document.getElementById("popupBackground");
const popupContent = document.getElementById("popupContent");
const buttonPopup = document.getElementById("buttonPopup");
const x = document.getElementById("x");
const body = document.body;

function abrirPopup() {
  popupBackground.classList.add("opened");
  popupContent.classList.add("opened");
  body.classList.add("opened");
}

function fecharPopup() {
  popupBackground.classList.remove("opened");
  popupContent.classList.remove("opened");
  body.classList.remove("opened");
}

export function configurarPopup() {
  buttonPopup.addEventListener("click", abrirPopup);
  x.addEventListener("click", fecharPopup);
}

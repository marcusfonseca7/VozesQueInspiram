popupBackground = document.getElementById("popupBackground");
buttonPopup = document.getElementById("buttonPopup");
popupContent = document.getElementById("popupContent");
body = document.body;
x = document.getElementById("x");

function closePopup() {
  popupBackground.classList.remove("opened");
  popupContent.classList.remove("opened");
  body.classList.remove("opened");
}

const divStars = document.querySelector(".stars");

const radios = divStars.querySelectorAll('input[type="radio"]');
const labels = divStars.querySelectorAll("label");
const stars = divStars.querySelectorAll("img");

const emptyStar = "img/estrelaVazia.png";
const fullStar = "img/estrelaAmarela.png";

let selectedRating = 0;

// Pinta as estrelas de acordo com a nota
function paintStars(rating) {
  stars.forEach((star, index) => {
    star.src = index < rating ? fullStar : emptyStar;
  });
}

// Hover das estrelas
labels.forEach((label, index) => {
  label.addEventListener("mouseenter", () => {
    paintStars(index + 1);
  });
});

// Seleção da avaliação
radios.forEach((radio) =>  {
  radio.addEventListener("change", () => {
    selectedRating = Number(radio.value);
    

    console.log("Avaliação selecionada:", selectedRating);
  });
});


// Quando o mouse sair da área das estrelas
divStars.addEventListener("mouseleave", () => {
  paintStars(selectedRating);
});

buttonPopup.addEventListener("click", () => {
  popupBackground.classList.add("opened");
  popupContent.classList.add("opened");
  body.classList.add("opened");
});



listaDocencia = ["Tércio Ribeiro", "Ricardo Orrico", "Lucas Felfoldi"]
listaSecretaria = ["Elida", "Denise", "Felipe"]
listaLimpeza = ["Tia 1", "Tia 2", "Tia 3"]

addEventListener
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
radios.forEach((radio) => {
  radio.addEventListener("change", () => {
    selectedRating = Number(radio.value);
  });
});

// Quando o mouse sair das estrelas
divStars.addEventListener("mouseleave", () => {
  paintStars(selectedRating);
});

function getSelectedRating() {
  return selectedRating;
}

function resetStars() {
  selectedRating = 0;
  paintStars(0);
}

export { getSelectedRating, resetStars };

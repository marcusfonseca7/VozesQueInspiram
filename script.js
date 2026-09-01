const popupBackground = document.getElementById("popupBackground");
const buttonPopup = document.getElementById("buttonPopup");
const popupContent = document.getElementById("popupContent");
const body = document.body;
const x = document.getElementById("x");

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


// Quando o mouse sair das estrelas
divStars.addEventListener("mouseleave", () => {
  paintStars(selectedRating);
});

buttonPopup.addEventListener("click", () => {
  popupBackground.classList.add("opened");
  popupContent.classList.add("opened");
  body.classList.add("opened");
});


// - - - - - - - - - - - - - FIREBASE - - - - - - - - - - - - -

import { db } from "./firebase.js";

import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";


// Formulário
const complimentForm = document.getElementById("complimentForm");

complimentForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const nome = document.getElementById("name").value.trim();
  const setor = document.getElementById("department").value;
  const pessoa = document.getElementById("person").value;
  const valor = document.getElementById("value").value;
  const elogio = document.getElementById("compliment").value.trim();

  if (selectedRating === 0) {
    alert("Selecione uma avaliação de 1 a 5 estrelas.");
    return;
  }

  // Validações básicas
  if (nome === "") {
    alert("Digite seu nome.");
    return;
  }

  if (setor === "") {
    alert("Selecione um setor.");
    return;
  }

  if (valor === "") {
    alert("Selecione um valor.");
    return;
  }

  if (elogio === "") {
    alert("Escreva seu elogio.");
    return;
  }

  try {
    // Envio do elogio para o Firebase
    await addDoc(collection(db, "elogios"), {
      nome: nome,
      setor: setor,
      pessoa: pessoa,
      valor: valor,
      estrelas: selectedRating,
      elogio: elogio,
      data: serverTimestamp()
    });

    console.log("Elogio enviado com sucesso!");

    alert("Elogio enviado com sucesso! ❤️");

    // Limpa o formulário
    complimentForm.reset();
    selectedRating = 0;
    paintStars(0);

  } catch (error) {
    console.error("Erro ao enviar elogio:", error);

    alert("Não foi possível enviar o elogio. Tente novamente.");
  }
});
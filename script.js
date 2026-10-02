const popupBackground = document.getElementById("popupBackground");
const buttonPopup = document.getElementById("buttonPopup");
const popupContent = document.getElementById("popupContent");
const body = document.body;
const x = document.getElementById("x");

x.addEventListener("click", () => {
  popupBackground.classList.remove("opened");
  popupContent.classList.remove("opened");
  body.classList.remove("opened");
});

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
  serverTimestamp,
  getDocs,
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
      data: serverTimestamp(),
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

// - - - - - - - - - - Carregar Selects Dinamicamente - - - - - -

async function carregarSetores() {
  const departmentSelect = document.getElementById("department");

  try {
    const pessoasRef = collection(db, "pessoas");
    const snapshot = await getDocs(pessoasRef);

    const setores = new Set();

    snapshot.forEach((doc) => {
      const pessoa = doc.data();

      if (pessoa.setor) {
        setores.add(pessoa.setor);
      }
    });

    // Setores que não possuem pessoas
    setores.add("Cantina");
    setores.add("Segurança");
    setores.add("Limpeza e Serviços Gerais");

    // Cria as opções
    setores.forEach((setor) => {
      const option = document.createElement("option");

      option.value = setor;
      option.textContent = setor;

      departmentSelect.appendChild(option);
    });
  } catch (error) {
    console.error("Erro ao carregar setores:", error);
  }
}

carregarSetores();

// carrega pessoas

async function carregarPessoas(setorSelecionado) {
  const personSelect = document.getElementById("person");

  personSelect.innerHTML = '<option value="">Selecione uma pessoa</option>';

  if (!setorSelecionado) {
    return;
  }

  // Setores que não possuem pessoas individuais
  const setoresEspeciais = {
    Cantina: "Equipe da Cantina",
    Segurança: "Equipe de Segurança",
    "Limpeza e Serviços Gerais": "Equipe de Limpeza e Serviços Gerais",
  };

  if (setoresEspeciais[setorSelecionado]) {
    const option = document.createElement("option");

    option.value = setoresEspeciais[setorSelecionado];
    option.textContent = setoresEspeciais[setorSelecionado];

    personSelect.appendChild(option);

    return;
  }

  try {
    const pessoasRef = collection(db, "pessoas");
    const snapshot = await getDocs(pessoasRef);

    snapshot.forEach((doc) => {
      const pessoa = doc.data();

      if (pessoa.setor === setorSelecionado) {
        const option = document.createElement("option");

        option.value = pessoa.nome;
        option.textContent = pessoa.nome;

        personSelect.appendChild(option);
      }
    });
  } catch (error) {
    console.error("Erro ao carregar pessoas:", error);
  }
}

// Quando o setor for alterado
document.getElementById("department").addEventListener("change", (event) => {
  carregarPessoas(event.target.value);
});

// - - - - - - - - - - Colocar Valores no Select - - - - - -

const selectValues = document.getElementById("values");
const listValues = [
  "01 - Adaptabilidade a normas e regras e ética",
  "02 - Alfabetização digital",
  "03 - Análise e solução de problemas",
  "04 - Comunicação Interpessoal/não violenta",
  "05 - Empatia/escuta ativa",
  "06 - Engajamento",
  "07 - Flexibilidade",
  "08 - Foco no resultado",
  "09 - Gestão de recursos",
  "10 - Gestão de relacionamento",
  "11 - Inovação/intraempreendedorismo",
  "12 - Inteligência emocional",
  "13 - Liderança",
  "14 - Negociação",
  "15 - Pensamento estratégico",
  "16 - Pensamento lean",
  "17 - Planejamento/Organização",
  "18 - Bem estar, saúde e segurança.",
  "19 - Compliance e ética.",
  "20 - Execução de aulas.",
  "21 - Execução de eventos.",
  "22 - Execução de serviços.",
  "23 - Execução nos processos.",
  "24 - Feedbacks de clientes internos / externos.",
  "25 - Liderança de pessoas.",
  "26 - Liderança de projetos e ou processos.",
  "27 - Melhorias de processo.",
  "28 - Novos produtos.",
  "29 - Planejamento e execução de projetos.",
  "30 - Representação institucional.",
  "31 - Reuniões / apresentações.",
  "32 - Venda de serviços e novos negócios.",
  "33 - Feedback Líder",
];

listValues.forEach((value) => {
  const option = document.createElement("option");

  option.value = `${value}`;
  option.textContent = `${value}`
  selectValues.appendChild(option);
});

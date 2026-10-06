import { configurarPopup } from "../components/popup.js";

import { getSelectedRating, resetStars } from "../components/estrelas.js";

import { carregarSetores, configurarSetores } from "../components/setores.js";

import { carregarValores } from "../components/valores.js";

import { cadastrarElogio } from "../services/elogiosService.js";

import { carregarPessoas } from "../services/pessoaService.js";

// --------------------------------------------------
// INICIALIZAÇÃO
// --------------------------------------------------

configurarPopup();
await carregarPessoas();
carregarSetores();
configurarSetores();
carregarValores();

// --------------------------------------------------
// FORMULÁRIO
// --------------------------------------------------

const complimentForm = document.getElementById("complimentForm");

complimentForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const nome = document.getElementById("name").value.trim();
  const setor = document.getElementById("department").value;
  const pessoa = document.getElementById("person").value;
  const valor = document.getElementById("values").value;
  const elogio = document.getElementById("compliment").value.trim();

  const estrelas = getSelectedRating();

  // VALIDAÇÕES

  if (estrelas === 0) {
    alert("Selecione uma avaliação de 1 a 5 estrelas.");
    return;
  }

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

  // ENVIO

  try {
    await cadastrarElogio({
      nome,
      setor,
      pessoa,
      valor,
      estrelas,
      elogio,
    });

    console.log("Elogio enviado com sucesso!");

    alert("Elogio enviado com sucesso! ❤️");

    // LIMPAR FORMULÁRIO

    complimentForm.reset();
    resetStars();
  } catch (error) {
    console.error("Erro ao enviar elogio:", error);

    alert("Não foi possível enviar o elogio. Tente novamente.");
  }
});

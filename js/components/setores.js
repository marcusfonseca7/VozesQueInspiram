import { db } from "../firebase/firebase.js";

import {
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";

import { obterPessoas } from "../services/pessoaService.js";

// CARREGAR SETORES

async function carregarSetores() {
  const departmentSelect = document.getElementById("department");

  try {
    const pessoas = obterPessoas();
    const setores = new Set();

    pessoas.forEach((pessoa) => {
      if (pessoa.setor) {
        setores.add(pessoa.setor);
      }
    });

    const setoresOrdenados = [...setores].sort((a, b) =>
      a.localeCompare(b),
    );

    setoresOrdenados.forEach((setor) => {
      const option = document.createElement("option");

      option.value = setor;
      option.textContent = setor;

      departmentSelect.appendChild(option);
    });
  } catch (error) {
    console.error("Erro ao carregar setores:", error);
  }
}

// CARREGAR PESSOAS

async function carregarPessoas(setorSelecionado) {
  const personSelect = document.getElementById("person");

  personSelect.innerHTML = '<option value="">Selecione uma pessoa</option>';

  if (!setorSelecionado) {
    return;
  }

  try {
    const pessoas = obterPessoas();

    const pessoasDoSetor = pessoas.filter(
      (pessoa) => pessoa.setor === setorSelecionado,
    );

    pessoasDoSetor.sort((a, b) => a.nome.localeCompare(b.nome));

    pessoasDoSetor.forEach((pessoa) => {
      const option = document.createElement("option");

      option.value = pessoa.nome;
      option.textContent = pessoa.nome;

      personSelect.appendChild(option);
    });
  } catch (error) {
    console.error("Erro ao carregar pessoas:", error);
  }
}

// EVENTO DO SELECT DE SETOR

function configurarSetores() {
  const departmentSelect = document.getElementById("department");

  departmentSelect.addEventListener("change", (event) => {
    carregarPessoas(event.target.value);
  });
}

export { carregarSetores, carregarPessoas, configurarSetores };

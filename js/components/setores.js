import { db } from "../firebase/firebase.js";

import {
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";

// --------------------------------------------------
// CARREGAR SETORES
// --------------------------------------------------

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

    // Setores que não possuem pessoas individuais
    setores.add("Cantina");
    setores.add("Segurança");
    setores.add("Limpeza e Serviços Gerais");

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

// --------------------------------------------------
// CARREGAR PESSOAS
// --------------------------------------------------

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

// --------------------------------------------------
// EVENTO DO SELECT DE SETOR
// --------------------------------------------------

function configurarSetores() {
  const departmentSelect = document.getElementById("department");

  departmentSelect.addEventListener("change", (event) => {
    carregarPessoas(event.target.value);
  });
}

export { carregarSetores, carregarPessoas, configurarSetores };

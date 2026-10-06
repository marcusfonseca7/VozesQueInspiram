import { db } from "../firebase/firebase.js";

import {
  collection,
  addDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";

async function cadastrarElogio(dados) {
  const elogiosRef = collection(db, "elogios");

  await addDoc(elogiosRef, {
    nome: dados.nome,
    setor: dados.setor,
    pessoa: dados.pessoa,
    valor: dados.valor,
    estrelas: dados.estrelas,
    elogio: dados.elogio,
    data: serverTimestamp(),
  });
}

export { cadastrarElogio };

import { db } from "../firebase/firebase.js";

import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";

export async function cadastrarElogio(dados) {
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

let elogios = [];

export async function carregarElogios() {
  const elogiosRef = collection(db, "elogios");
  const snapshot = await getDocs(elogiosRef);

  elogios = snapshot.docs.map((doc) => ({
    ...doc.data(),
  }));

  return elogios;
}

export function obterElogios() {
  return elogios;
}

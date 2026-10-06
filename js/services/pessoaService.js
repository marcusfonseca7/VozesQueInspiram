import { db } from "../firebase/firebase.js";

import {
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";

let pessoas = [];

export async function carregarPessoas() {
  const pessoasRef = collection(db, "pessoas");
  const snapshot = await getDocs(pessoasRef);

  pessoas = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return pessoas;
}

export function obterPessoas() {
  return pessoas;
}

import { carregarSetores } from "../components/setores.js";
import { carregarElogios, obterElogios } from "../services/elogioService.js";
import { carregarPessoas, obterPessoas } from "../services/pessoaService.js";

// INICIALIZAÇÃO
await carregarElogios();
await carregarPessoas();

const elogios = obterElogios();
const pessoas = obterPessoas();
const setores = new Set();

pessoas.forEach((pessoa) => {
  if (pessoa.setor) {
    setores.add(pessoa.setor);
  }
});

console.log(pessoas);
const setoresOrdenados = [...setores].sort((a, b) => a.localeCompare(b));
const pessoasOrdenadas = pessoas.sort((a, b) => a.nome.localeCompare(b.nome));
const elogiosList = document.getElementById("elogiosList");

setoresOrdenados.forEach((setor) => {
  elogiosList.innerHTML += `

    <h2 class="setor-title">${setor}</h2> 
    <div class="pessoas-container" id="setor-${setor}">
    </div>
    `;

  pessoasOrdenadas.forEach((pessoa) => {
    const elogiosDaPessoa = elogios.filter(
      (elogio) => elogio.pessoa === pessoa.nome && elogio.setor === setor,
    );

    if (pessoa.setor === setor) {
      const pessoasContainer = document.getElementById(`setor-${setor}`);
      pessoasContainer.innerHTML += `
        <div class="card-pessoa">
            <h3>${pessoa.nome}</h3>
            <p><strong>Cargo:</strong> ${pessoa.cargo || "Não informado"}</p>
            <p><strong>Elogios:</strong> ${elogiosDaPessoa.length > 0 ? elogiosDaPessoa.length : "Não possui elogios"}</p>

            <button class="btn-ver-elogios" data-pessoa="${pessoa.nome}" data-setor="${setor}">VER ELOGIOS</button>
        </div>
    `;
    }
  });
});

const dialogElogios = document.getElementById("dialogElogios");
const dialogTitulo = document.getElementById("dialogTitulo");
const dialogConteudo = document.getElementById("dialogConteudo");
const fecharDialog = document.getElementById("fecharDialog");

document.addEventListener("click", (event) => {
  if (!event.target.classList.contains("btn-ver-elogios")) {
    return;
  }

  const nomePessoa = event.target.dataset.pessoa;

  const elogiosDaPessoa = elogios.filter(
    (elogio) => elogio.pessoa === nomePessoa,
  );

  dialogTitulo.textContent = `Elogios de ${nomePessoa}`;

  dialogConteudo.innerHTML = "";

  if (elogiosDaPessoa.length === 0) {
    dialogConteudo.innerHTML = `
            <p>Essa pessoa ainda não possui elogios.</p>
        `;
  } else {
    elogiosDaPessoa.forEach((elogio) => {
      dialogConteudo.innerHTML += `
                <div class="elogio-container">

                <div class="elogio">  
                  <strong>Elogio:</strong>
                  <p class="elogio-dado">${elogio.elogio}</p>
                </div>

                <div class="elogio-estrelas">  
                  <strong>Estrelas:</strong>
                  <p class="elogio-dado">${elogio.estrelas}</p>
                </div>

                  <div class="elogio-enviado">
                    <strong>Enviado por: </strong>
                    <p class="elogio-dado">${elogio.nome} </p>
                  </div>

                  <div class="elogio-valor">
                    <strong>Valor: </strong>
                    <p class="elogio-dado">${elogio.valor} </p>
                  </div>

                </div>
            `;
    });
  }

  dialogElogios.showModal();
});

fecharDialog.addEventListener("click", () => {
  dialogElogios.close();
});

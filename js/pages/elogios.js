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

    const mediaEstrelas =
      elogiosDaPessoa.length > 0
        ? (
            elogiosDaPessoa.reduce(
              (total, elogio) => total + Number(elogio.estrelas),
              0,
            ) / elogiosDaPessoa.length
          ).toFixed(1)
        : "—";

    if (pessoa.setor === setor) {
      const pessoasContainer = document.getElementById(`setor-${setor}`);

      pessoasContainer.innerHTML += `
          <div class="card-pessoa">

            <div class="card-pessoa__cabecalho">

                <div class="card-pessoa__identificacao">

                    <div class="card-pessoa__foto">
                        <span>
                            ${pessoa.nome
                              .split(" ")
                              .slice(0, 2)
                              .map((nome) => nome[0])
                              .join("")
                              .toUpperCase()}
                        </span>
                    </div>

                    <h3>${pessoa.nome}</h3>

                </div>

                <p class="card-pessoa__cargo">
                    ${pessoa.cargo || "Cargo não informado"}
                </p>

            </div>

            <div class="card-pessoa__linha"></div>

            <div class="card-pessoa__estatisticas">

                <div class="card-pessoa__estatistica">
                    <strong>${elogiosDaPessoa.length}</strong>
                    <span>
                        ${elogiosDaPessoa.length === 1 ? "Elogio" : "Elogios"}
                    </span>
                </div>

                <div class="card-pessoa__estatistica">
                    <strong>⭐ ${mediaEstrelas}</strong>
                    <span>Média</span>
                </div>

            </div>

            <button
                class="btn-ver-elogios"
                data-pessoa="${pessoa.nome}"
                data-setor="${setor}"
            >
                VER ELOGIOS
            </button>

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
        <p class="sem-elogios">
            Essa pessoa ainda não possui elogios.
        </p>
    `;
  } else {
    elogiosDaPessoa.forEach((elogio) => {
      dialogConteudo.innerHTML += `
            <article class="elogio-card">

                <div class="elogio-card__conteudo">

                    <span class="elogio-card__label">
                        Elogio
                    </span>

                    <p class="elogio-card__texto">
                        ${elogio.elogio}
                    </p>

                </div>

                <div class="elogio-card__informacoes">

                    <div class="elogio-card__informacao">
                        <span>Estrelas</span>
                        <strong>⭐ ${elogio.estrelas}</strong>
                    </div>

                    <div class="elogio-card__informacao">
                        <span>Valor</span>
                        <strong>${elogio.valor}</strong>
                    </div>

                    <div class="elogio-card__informacao elogio-card__informacao--remetente">
                        <span>Enviado por</span>
                        <strong>${elogio.nome}</strong>
                    </div>

                </div>

            </article>
        `;
    });
  }

  dialogElogios.showModal();
});

fecharDialog.addEventListener("click", () => {
  dialogElogios.close();
});

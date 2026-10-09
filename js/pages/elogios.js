import { carregarElogios, obterElogios } from "../services/elogioService.js";

// ELEMENTOS DO HTML

const elementoMesAtual = document.getElementById("mesAtual");
const elementoTotalElogios = document.getElementById("totalElogios");
const elementoLista = document.getElementById("elogiosHistorico");

const botaoMesAnterior = document.getElementById("mesAnterior");
const botaoProximoMes = document.getElementById("proximoMes");

// ESTADO DA PÁGINA

let elogios = [];
let mesAtual;
let anoAtual;

// FUNÇÕES AUXILIARES

function converterData(data) {
  if (!data) return null;

  // Timestamp do Firestore
  if (typeof data.toDate === "function") {
    return data.toDate();
  }

  // Date já convertido
  if (data instanceof Date) {
    return Number.isNaN(data.getTime()) ? null : data;
  }

  // Aceita timestamp numérico, se existir no projeto
  if (typeof data === "number") {
    const dataConvertida = new Date(data);

    return Number.isNaN(dataConvertida.getTime()) ? null : dataConvertida;
  }

  return null;
}

function escaparHTML(valor) {
  return String(valor ?? "").replace(/[&<>"']/g, (caractere) => {
    const caracteres = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return caracteres[caractere];
  });
}

function formatarData(data) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(data);
}

function formatarHorario(data) {
  return new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(data);
}

function formatarMes(ano, mes) {
  // O mês no JavaScript começa em zero.
  const data = new Date(ano, mes, 1);

  const nomeMes = new Intl.DateTimeFormat("pt-BR", {
    month: "long",
    year: "numeric",
  }).format(data);

  return nomeMes.charAt(0).toUpperCase() + nomeMes.slice(1);
}

// NAVEGAÇÃO ENTRE MESES

function alterarMes(diferenca) {
  const novaData = new Date(anoAtual, mesAtual + diferenca, 1);

  mesAtual = novaData.getMonth();
  anoAtual = novaData.getFullYear();

  renderizarElogios();
}

// RENDERIZAÇÃO

function renderizarElogios() {
  elementoMesAtual.textContent = formatarMes(anoAtual, mesAtual);

  // Filtra os elogios do mês e ano selecionados.
  const elogiosDoMes = elogios
    .map((elogio) => ({
      ...elogio,
      dataConvertida: converterData(elogio.data),
    }))
    .filter((elogio) => {
      if (!elogio.dataConvertida) return false;

      return (
        elogio.dataConvertida.getMonth() === mesAtual &&
        elogio.dataConvertida.getFullYear() === anoAtual
      );
    })
    // Mais recentes primeiro.
    .sort((a, b) => b.dataConvertida.getTime() - a.dataConvertida.getTime());

  elementoTotalElogios.textContent = `${elogiosDoMes.length} ${
    elogiosDoMes.length === 1 ? "elogio" : "elogios"
  }`;

  if (elogiosDoMes.length === 0) {
    elementoLista.innerHTML = `
      <div class="historico-elogios__vazio">
        <h3>Nenhum elogio neste mês</h3>
        <p>
          Não encontramos elogios registrados em
          ${escaparHTML(formatarMes(anoAtual, mesAtual))}.
        </p>
      </div>
    `;

    return;
  }

  elementoLista.innerHTML = elogiosDoMes
    .map((elogio) => {
      const data = elogio.dataConvertida;

      return `
        <article class="historico-elogio">
          <header class="historico-elogio__cabecalho">
            <div class="historico-elogio__data">
              <span>${formatarData(data)}</span>
              <span>${formatarHorario(data)}</span>
            </div>

            <div class="historico-elogio__estrelas">
              ⭐ ${escaparHTML(elogio.estrelas)} / 5
            </div>
          </header>

          <div class="historico-elogio__conteudo">
            <span class="historico-elogio__rotulo">
              Elogio
            </span>

            <p class="historico-elogio__texto">
              ${escaparHTML(elogio.elogio || "Nenhum texto informado.")}
            </p>
          </div>

          <div class="historico-elogio__informacoes">
            <div class="historico-elogio__informacao">
              <span>Enviado por</span>
              <strong style="color: #d16900; font-size: 1.05rem;">${escaparHTML(elogio.nome || "Não informado")}</strong>
            </div>

            <div class="historico-elogio__informacao">
              <span>Para</span>
              <strong style="color: #d16900; font-size: 1.05rem;">${escaparHTML(elogio.pessoa || "Não informado")}</strong>
            </div>

            <div class="historico-elogio__informacao">
              <span>Setor</span>
              <strong>${escaparHTML(elogio.setor || "Não informado")}</strong>
            </div>

            <div class="historico-elogio__informacao">
              <span>Valor</span>
              <strong>${escaparHTML(elogio.valor || "Não informado")}</strong>
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

// EVENTOS

botaoMesAnterior.addEventListener("click", () => {
  alterarMes(-1);
});

botaoProximoMes.addEventListener("click", () => {
  alterarMes(1);
});

// INICIALIZAÇÃO

async function inicializarPagina() {
  try {
    await carregarElogios();

    elogios = obterElogios();

    // Começa pelo mês do elogio mais recente.
    const datasValidas = elogios
      .map((elogio) => converterData(elogio.data))
      .filter(Boolean)
      .sort((a, b) => b.getTime() - a.getTime());

    const dataInicial = datasValidas[0] || new Date();

    mesAtual = dataInicial.getMonth();
    anoAtual = dataInicial.getFullYear();

    renderizarElogios();
  } catch (erro) {
    console.error("Erro ao carregar o histórico de elogios:", erro);

    elementoMesAtual.textContent = "Histórico de elogios";
    elementoTotalElogios.textContent = "";

    elementoLista.innerHTML = `
      <div class="historico-elogios__vazio">
        <h3>Não foi possível carregar os elogios</h3>
        <p>Tente atualizar a página.</p>
      </div>
    `;
  }
}

inicializarPagina();

const dialog = document.querySelector("#menuDialog");
const abrirMenu = document.querySelector("#abrirMenu");
const fecharMenu = document.querySelector("#fecharMenu");

abrirMenu.addEventListener("click", () => {
  dialog.showModal();
});

fecharMenu.addEventListener("click", () => {
  dialog.close();
});

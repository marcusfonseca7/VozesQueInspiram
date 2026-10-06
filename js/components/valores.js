const listValues = [
  "Adaptabilidade a normas e regras e ética",
  "Alfabetização digital",
  "Análise e solução de problemas",
  "Comunicação Interpessoal/não violenta",
  "Empatia/escuta ativa",
  "Engajamento",
  "Flexibilidade",
  "Foco no resultado",
  "Gestão de recursos",
  "Gestão de relacionamento",
  "Inovação/intraempreendedorismo",
  "Inteligência emocional",
  "Liderança",
  "Negociação",
  "Pensamento estratégico",
  "Pensamento lean",
  "Planejamento/Organização",
  "Bem estar, saúde e segurança",
  "Compliance e ética",
  "Execução de aulas",
  "Execução de eventos",
  "Execução de serviços",
  "Execução nos processos",
  "Feedbacks de clientes internos / externos",
  "Liderança de pessoas",
  "Liderança de projetos e ou processos",
  "Melhorias de processo",
  "Novos produtos",
  "Planejamento e execução de projetos",
  "Representação institucional",
  "Reuniões / apresentações",
  "Venda de serviços e novos negócios",
  "Feedback Líder",
];

function carregarValores() {
  const selectValues = document.getElementById("values");

  listValues.forEach((value) => {
    const option = document.createElement("option");

    option.value = value;
    option.textContent = value;

    selectValues.appendChild(option);
  });
}

export { carregarValores };

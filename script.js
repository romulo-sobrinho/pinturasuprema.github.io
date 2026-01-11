const imagens = [
  "imagens/galeria/img1.jpg",
  "imagens/galeria/img2.jpg",
  "imagens/galeria/img3.jpg",
  "imagens/galeria/img4.jpg",
  "imagens/galeria/img5.jpg",
  "imagens/galeria/img6.jpg",
];

let index = 0;

const esq = document.getElementById("foto-esq");
const centro = document.getElementById("foto-centro");
const dir = document.getElementById("foto-dir");

function render() {
  [esq, centro, dir].forEach(img => {
    img.classList.remove("ativa");
    img.classList.add("trocando");
  });

  setTimeout(() => {
    esq.src = imagens[(index - 1 + imagens.length) % imagens.length];
    centro.src = imagens[index % imagens.length];
    dir.src = imagens[(index + 1) % imagens.length];

    [esq, centro, dir].forEach(img => {
      img.classList.remove("trocando");
      img.classList.add("ativa");
    });
  }, 300);
}

document.querySelector(".next").onclick = () => {
  index++;
  render();
};

document.querySelector(".prev").onclick = () => {
  index--;
  render();
};

render();
setInterval(() => {
  index++;
  render();
}, 4000);


// Simulador de orçamento
function simular() {
  const metros = parseInt(document.getElementById("metros").value);
  const quartos = parseInt(document.getElementById("quartos").value);

  if (!metros || metros > 150) {
    alert("Informe uma metragem válida até 150 m²");
    return;
  }

  /* 1️⃣ Valor base por metragem */
  let base;
  if (metros <= 35) base = 800;
  else if (metros <= 50) base = 1200;
  else if (metros <= 75) base = 1600;
  else if (metros <= 100) base = 2000;
  else base = 2600;

  /* 2️⃣ Ajuste por quantidade de quartos */
  let fatorQuartos = 1;
  if (quartos === 1) fatorQuartos = 0.9;
  if (quartos === 3) fatorQuartos = 1.1;
  if (quartos >= 4) fatorQuartos = 1.2;

  let maoSemTeto = Math.round(base * fatorQuartos);
  let maoComTeto = maoSemTeto + 600;

  const materiais = [
    "🎨 Tinta Suvinil Toque de Seda 18 L",
    "🧱 Fundo preparador Suvinil",
    "🪵 Selador acrílico (Coralit ou similar)",
    "🖌️ Rolos Atlas (grandes e pequenos)",
    "🖌️ Pincéis profissionais",
    "📏 Fitas para recorte e detalhamento",
    "🪚 Lixas para preparação e acabamento"
  ];

  const materiaisComTeto = [
    "🎨 Tinta Suvinil Rende & Cobre Muito (teto)",
    ...materiais
  ];

  document.getElementById("resultado").innerHTML = `
    <div class="bloco">
      <h3>💰 Mão de obra estimada</h3>
      <p>
        <strong>Sem pintura de teto:</strong><br>
        R$ ${maoSemTeto.toLocaleString("pt-BR")}
      </p>
      <p style="margin-top: 10px;">
        <strong>Com pintura de teto:</strong><br>
        R$ ${maoComTeto.toLocaleString("pt-BR")}
      </p>
    </div>

    <div class="bloco">
      <h3>🧰 Materiais previstos (sem teto)</h3>
      <ul>
        ${materiais.map(item => `<li>${item}</li>`).join("")}
      </ul>
    </div>

    <div class="bloco">
      <h3>🧰 Materiais previstos (com teto)</h3>
      <ul>
        ${materiaisComTeto.map(item => `<li>${item}</li>`).join("")}
      </ul>
    </div>
  `;
}
